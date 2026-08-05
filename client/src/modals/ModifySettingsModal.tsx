import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import {
  FileField,
  FormModal,
  NumberField,
  TextAreaField,
  TextField,
  convertFormFileFieldData,
  createDefaultValues,
  fileValueSchema,
  getFormFileFieldInitialData
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

const schema = z.object({
  company_name: z.string().min(1, 'Required'),
  company_address: z.string(),
  company_reg_no: z.string(),
  company_email: z.string(),
  company_tel_no: z.string(),
  default_logo: fileValueSchema,
  default_payment_terms: z.string().min(1, 'Required'),
  default_notes: z.string(),
  default_tax_rate: z.number().nonnegative(),
  bank_name: z.string().min(1, 'Required'),
  bank_account: z.string().min(1, 'Required'),
  bank_account_name: z.string().min(1, 'Required'),
  currency: z.string().min(1, 'Required'),
  currency_symbol: z.string().min(1, 'Required'),
  invoice_prefix: z.string().min(1, 'Required'),
  next_invoice_number: z.number().nonnegative(),
  receipt_prefix: z.string().min(1, 'Required'),
  next_receipt_number: z.number().nonnegative()
})

export default function ModifySettingsModal({
  onClose
}: {
  onClose: () => void
}) {
  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())

  const mutation = useForgeMutation(forgeAPI.settings.update, {
    action: 'update',
    queryKey: forgeAPI.key,
    onSuccess: () => {
      onClose()
    }
  })

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(schema),
      ...settingsQuery.data,
      default_logo: settingsQuery.data
        ? getFormFileFieldInitialData(
            forgeAPI,
            settingsQuery.data,
            settingsQuery.data.default_logo
          )
        : undefined
    },
    resolver: zodResolver(schema)
  })

  if (!settingsQuery.data) {
    return null
  }

  return (
    <FormModal
      form={form}
      submissionConfig={{
        label: 'Save',
        icon: 'tabler:device-floppy',
        handler: async data => {
          await mutation.mutateAsync({
            ...data,
            default_logo: convertFormFileFieldData(data.default_logo)
          })
        }
      }}
      uiConfig={{
        icon: 'tabler:settings',
        title: 'Settings',
        namespace: 'apps.melvinchia3636$invoiceMaker',
        onClose,
        loading: !settingsQuery.data
      }}
    >
      <TextField
        required
        control={form.control}
        icon="tabler:building"
        label="Company Name"
        name="company_name"
        placeholder="Your Company Name"
      />
      <TextAreaField
        control={form.control}
        icon="tabler:map-pin"
        label="Company Address"
        name="company_address"
        placeholder="e.g. No 231A, Jalan Pasir Puteh, 31650 ipoh Perak"
      />
      <TextField
        control={form.control}
        icon="tabler:hash"
        label="Company Reg No"
        name="company_reg_no"
        placeholder="e.g. 201601010552 (1181482-M)"
      />
      <TextField
        control={form.control}
        icon="tabler:phone"
        label="Company Tel No"
        name="company_tel_no"
        placeholder="e.g. 014-9572631/017-8115118/018-9472631"
      />
      <TextField
        control={form.control}
        icon="tabler:mail"
        label="Company Email"
        name="company_email"
        placeholder="e.g. autocountsystem@gmail.com"
      />
      <FileField
        control={form.control}
        icon="tabler:photo"
        label="Default Logo"
        name="default_logo"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:calendar-due"
        label="Default Payment Terms"
        name="default_payment_terms"
        placeholder="e.g. Net 30"
      />
      <TextAreaField
        control={form.control}
        icon="tabler:notes"
        label="Default Notes"
        name="default_notes"
        placeholder="Payment instructions, late fees, etc."
      />
      <NumberField
        control={form.control}
        icon="tabler:receipt-tax"
        label="Default Tax Rate (%)"
        name="default_tax_rate"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:building-bank"
        label="Bank Name"
        name="bank_name"
        placeholder="e.g. Maybank Islamic"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:credit-card"
        label="Bank Account"
        name="bank_account"
        placeholder="e.g. 1234 5678 9012"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:user"
        label="Bank Account Name"
        name="bank_account_name"
        placeholder="e.g. SL SOFTWARE SOLUTIONS SDN. BHD."
      />
      <TextField
        required
        control={form.control}
        icon="tabler:currency-dollar"
        label="Currency"
        name="currency"
        placeholder="e.g. MYR"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:currency"
        label="Currency Symbol"
        name="currency_symbol"
        placeholder="e.g. RM"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:hash"
        label="Invoice Prefix"
        name="invoice_prefix"
        placeholder="e.g. INV-"
      />
      <NumberField
        control={form.control}
        icon="tabler:123"
        label="Next Invoice Number"
        name="next_invoice_number"
      />
      <TextField
        required
        control={form.control}
        icon="tabler:hash"
        label="Receipt Prefix"
        name="receipt_prefix"
        placeholder="e.g. REC-"
      />
      <NumberField
        control={form.control}
        icon="tabler:123"
        label="Next Receipt Number"
        name="next_receipt_number"
      />
    </FormModal>
  )
}
