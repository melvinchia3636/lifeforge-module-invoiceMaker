import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useMemo } from 'react'

import type { InferOutput } from '@lifeforge/api'
import { WithQuery } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

type Receipt = InferOutput<typeof forgeAPI.receipts.getById>
type Settings = InferOutput<typeof forgeAPI.settings.get>

interface ReceiptViewerContext {
  receipt: Receipt
  settings: Settings
  currencySymbol: string
  calculations: {
    subtotal: number
    taxAmount: number
    discountAmount: number
    total: number
    balanceDue: number
  }
}

const ReceiptViewerContext = createContext<ReceiptViewerContext | null>(null)

interface ReceiptViewerProviderProps {
  receiptId: string
  children: React.ReactNode
}

function ReceiptViewerProvider({
  receiptId,
  children
}: ReceiptViewerProviderProps) {
  const receiptQuery = useQuery(
    forgeAPI.receipts.getById.input({ id: receiptId }).queryOptions()
  )

  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())

  const calculations = useMemo(() => {
    if (!receiptQuery.data) {
      return {
        subtotal: 0,
        taxAmount: 0,
        discountAmount: 0,
        total: 0,
        balanceDue: 0
      }
    }

    const receipt = receiptQuery.data

    const subtotal =
      receipt.items?.reduce(
        (sum: number, item: any) => sum + item.quantity * item.rate,
        0
      ) || 0

    const taxAmount =
      receipt.tax_type === 'rate'
        ? subtotal * (receipt.tax_amount / 100)
        : receipt.tax_type === 'fixed'
          ? receipt.tax_amount
          : 0

    const discountAmount =
      receipt.discount_type === 'rate'
        ? subtotal * (receipt.discount_amount / 100)
        : receipt.discount_type === 'fixed'
          ? receipt.discount_amount
          : 0

    const total =
      subtotal + taxAmount - discountAmount + (receipt.shipping_amount || 0)

    const balanceDue = total - (receipt.amount_paid || 0)

    return {
      subtotal,
      taxAmount,
      discountAmount,
      total,
      balanceDue
    }
  }, [receiptQuery.data])

  const currencySymbol = settingsQuery.data?.currency_symbol || 'RM'

  return (
    <WithQuery query={receiptQuery}>
      {receipt => (
        <WithQuery query={settingsQuery}>
          {settings => (
            <ReceiptViewerContext
              value={{ receipt, settings, currencySymbol, calculations }}
            >
              {children}
            </ReceiptViewerContext>
          )}
        </WithQuery>
      )}
    </WithQuery>
  )
}

export default ReceiptViewerProvider

export function useReceiptViewer() {
  const context = useContext(ReceiptViewerContext)

  if (!context) {
    throw new Error(
      'useReceiptViewer must be used within a ReceiptViewerProvider'
    )
  }

  return context
}
