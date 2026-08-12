import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'

import { useModuleTranslation } from '@lifeforge/localization'
import { toast } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

export interface LineItem {
  id?: string
  description: string
  quantity: number
  rate: number
  order: number
}

export interface ReceiptFormData {
  bill_to: string
  date: Date
  payment_method: string
  payment_terms: string
  reference_number: string
  status: 'draft' | 'issued' | 'cancelled'
  shipping_address: string
  tax_type: 'rate' | 'fixed' | ''
  tax_amount: number
  discount_type: 'rate' | 'fixed' | ''
  discount_amount: number
  shipping_amount: number
  amount_paid: number
  items: LineItem[]
}

const INITIAL_FORM_DATA: ReceiptFormData = {
  bill_to: '',
  date: new Date(),
  payment_method: 'Cash',
  payment_terms: '',
  reference_number: '',
  status: 'draft',
  shipping_address: '',
  tax_type: '',
  tax_amount: 0,
  discount_type: '',
  discount_amount: 0,
  shipping_amount: 0,
  amount_paid: 0,
  items: [{ description: '', quantity: 1, rate: 0, order: 0 }]
}

interface ReceiptEditorContext {
  formData: ReceiptFormData
  updateField: <K extends keyof ReceiptFormData>(
    field: K,
    value: ReceiptFormData[K]
  ) => void
  addLineItem: () => void
  removeLineItem: (index: number) => void
  updateLineItem: (index: number, field: keyof LineItem, value: any) => void
  currencySymbol: string
  showDiscount: boolean
  setShowDiscount: (val: boolean) => void
  showTax: boolean
  setShowTax: (val: boolean) => void
  showShipping: boolean
  setShowShipping: (val: boolean) => void
  finalNumbers: {
    subtotal: number
    discountAmount: number
    taxAmount: number
    shippingAmount: number
    total: number
    balanceDue: number
  }
  handleSubmit: () => Promise<void>
  isLoading: boolean
  isEditMode: boolean
}

const Context = createContext<ReceiptEditorContext | null>(null)

export function useReceiptEditor() {
  const ctx = useContext(Context)
  if (!ctx) {
    throw new Error(
      'useReceiptEditor must be used within a ReceiptEditorProvider'
    )
  }
  return ctx
}

export default function ReceiptEditorProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { t } = useModuleTranslation()

  const isEditMode = !!id

  const [formData, setFormData] = useState<ReceiptFormData>(INITIAL_FORM_DATA)
  const [showDiscount, setShowDiscount] = useState(false)
  const [showTax, setShowTax] = useState(false)
  const [showShipping, setShowShipping] = useState(false)

  const [searchParams] = useSearchParams()
  const fromInvoiceId = searchParams.get('fromInvoice')

  const receiptQuery = useQuery(
    forgeAPI.receipts.getById
      .input({ id: id || '' })
      .queryOptions({ enabled: isEditMode })
  )

  const fromInvoiceQuery = useQuery(
    forgeAPI.invoices.getById
      .input({ id: fromInvoiceId || '' })
      .queryOptions({ enabled: !isEditMode && !!fromInvoiceId })
  )

  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())

  const createMutation = useMutation(
    forgeAPI.receipts.create.mutationOptions({
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: forgeAPI.key })
        toast.success(t('toast.receiptCreated', 'Receipt created successfully'))
        navigate('/melvinchia3636--invoice-maker/receipt')
      }
    })
  )

  const updateMutation = useMutation(
    forgeAPI.receipts.update
      .input({
        id: id || ''
      })
      .mutationOptions({
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: forgeAPI.key })
          toast.success(t('toast.receiptUpdated', 'Receipt updated successfully'))
          navigate('/melvinchia3636--invoice-maker/receipt')
        }
      })
  )

  const isLoading = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (receiptQuery.data) {
      setFormData({
        bill_to: receiptQuery.data.bill_to || '',
        date: new Date(receiptQuery.data.date),
        payment_method: receiptQuery.data.payment_method || 'Cash',
        payment_terms: receiptQuery.data.payment_terms || '',
        reference_number: receiptQuery.data.reference_number || '',
        status: (receiptQuery.data.status as any) || 'draft',
        shipping_address: receiptQuery.data.shipping_address || '',
        tax_type: (receiptQuery.data.tax_type as any) || '',
        tax_amount: receiptQuery.data.tax_amount || 0,
        discount_type: (receiptQuery.data.discount_type as any) || '',
        discount_amount: receiptQuery.data.discount_amount || 0,
        shipping_amount: receiptQuery.data.shipping_amount || 0,
        amount_paid: receiptQuery.data.amount_paid || 0,
        items:
          receiptQuery.data.items && receiptQuery.data.items.length > 0
            ? receiptQuery.data.items.map(item => ({
                id: item.id,
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
                order: item.order
              }))
            : [{ description: '', quantity: 1, rate: 0, order: 0 }]
      })

      if (
        receiptQuery.data.discount_type &&
        receiptQuery.data.discount_amount > 0
      ) {
        setShowDiscount(true)
      }

      if (receiptQuery.data.tax_type && receiptQuery.data.tax_amount > 0) {
        setShowTax(true)
      }

      if (receiptQuery.data.shipping_amount > 0) {
        setShowShipping(true)
      }
    }
  }, [receiptQuery.data])

  useEffect(() => {
    if (!isEditMode && fromInvoiceQuery.data) {
      const inv = fromInvoiceQuery.data
      const items =
        inv.items && inv.items.length > 0
          ? inv.items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
              order: item.order
            }))
          : [{ description: '', quantity: 1, rate: 0, order: 0 }]

      const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
      )

      let taxAmount = 0
      if (inv.tax_type === 'rate') {
        taxAmount = (subtotal * (inv.tax_amount || 0)) / 100
      } else if (inv.tax_type === 'fixed') {
        taxAmount = inv.tax_amount || 0
      }

      let discountAmount = 0
      if (inv.discount_type === 'rate') {
        discountAmount = (subtotal * (inv.discount_amount || 0)) / 100
      } else if (inv.discount_type === 'fixed') {
        discountAmount = inv.discount_amount || 0
      }

      const shippingAmount = inv.shipping_amount || 0
      const calculatedTotal =
        subtotal + taxAmount - discountAmount + shippingAmount

      setFormData({
        bill_to: inv.bill_to || '',
        date: new Date(),
        payment_method: 'Cash',
        payment_terms: inv.payment_terms || '',
        reference_number: inv.invoice_number || '',
        status: 'draft',
        shipping_address: inv.shipping_address || '',
        tax_type: (inv.tax_type as any) || '',
        tax_amount: inv.tax_amount || 0,
        discount_type: (inv.discount_type as any) || '',
        discount_amount: inv.discount_amount || 0,
        shipping_amount: inv.shipping_amount || 0,
        amount_paid: calculatedTotal,
        items
      })

      if (inv.discount_type && inv.discount_amount > 0) {
        setShowDiscount(true)
      }

      if (inv.tax_type && inv.tax_amount > 0) {
        setShowTax(true)
      }

      if (inv.shipping_amount > 0) {
        setShowShipping(true)
      }
    }
  }, [isEditMode, fromInvoiceQuery.data])

  useEffect(() => {
    if (!isEditMode && !fromInvoiceId && settingsQuery.data) {
      setFormData(prev => ({
        ...prev,
        tax_type: settingsQuery.data.default_tax_rate ? 'rate' : '',
        tax_amount: settingsQuery.data.default_tax_rate || 0
      }))
    }
  }, [isEditMode, fromInvoiceId, settingsQuery.data])

  const updateField = useCallback(
    <K extends keyof ReceiptFormData>(field: K, value: ReceiptFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    },
    []
  )

  const addLineItem = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { description: '', quantity: 1, rate: 0, order: prev.items.length }
      ]
    }))
  }, [])

  const removeLineItem = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, order: i }))
    }))
  }, [])

  const updateLineItem = useCallback(
    (index: number, field: keyof LineItem, value: any) => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }))
    },
    []
  )

  const currencySymbol = settingsQuery.data?.currency_symbol || 'RM'

  const handleSubmit = async () => {
    const payload = {
      bill_to: formData.bill_to || undefined,
      date: formData.date.toISOString(),
      payment_method: formData.payment_method,
      payment_terms: formData.payment_terms,
      reference_number: formData.reference_number,
      status: formData.status,
      shipping_address: formData.shipping_address,
      tax_type: formData.tax_type || undefined,
      tax_amount: formData.tax_amount,
      discount_type: formData.discount_type || undefined,
      discount_amount: formData.discount_amount,
      shipping_amount: formData.shipping_amount,
      amount_paid: formData.amount_paid,
      items: formData.items.filter(item => item.description.trim() !== '')
    }

    if (isEditMode) {
      await updateMutation.mutateAsync(payload)
    } else {
      await createMutation.mutateAsync(payload)
    }
  }

  const finalNumbers = useMemo(() => {
    const subtotal = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    )

    let discountAmount = 0
    if (formData.discount_type === 'rate') {
      discountAmount = (subtotal * formData.discount_amount) / 100
    } else if (formData.discount_type === 'fixed') {
      discountAmount = formData.discount_amount
    }

    let taxAmount = 0
    if (formData.tax_type === 'rate') {
      taxAmount = (subtotal * formData.tax_amount) / 100
    } else if (formData.tax_type === 'fixed') {
      taxAmount = formData.tax_amount
    }

    const shippingAmount = formData.shipping_amount || 0
    const total = subtotal - discountAmount + taxAmount + shippingAmount
    const balanceDue = total - formData.amount_paid

    return {
      subtotal,
      discountAmount,
      taxAmount,
      shippingAmount,
      total,
      balanceDue
    }
  }, [formData])

  return (
    <Context
      value={{
        formData,
        updateField,
        addLineItem,
        removeLineItem,
        updateLineItem,
        currencySymbol,
        showDiscount,
        setShowDiscount,
        showTax,
        setShowTax,
        showShipping,
        setShowShipping,
        finalNumbers,
        handleSubmit,
        isLoading,
        isEditMode
      }}
    >
      {children}
    </Context>
  )
}
