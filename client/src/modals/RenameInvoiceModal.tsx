import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import { FormModal, TextField, createDefaultValues } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import type { InvoiceEntry } from '@/pages/Invoices'

const schema = z.object({
  invoice_number: z.string().min(1, 'Required')
})

interface RenameInvoiceModalProps {
  data: {
    invoice: InvoiceEntry
  }
  onClose: () => void
}

export default function RenameInvoiceModal({
  data: { invoice },
  onClose
}: RenameInvoiceModalProps) {
  const updateMutation = useForgeMutation(
    forgeAPI.invoices.update.input({ id: invoice.id }),
    {
      action: 'update',
      queryKey: forgeAPI.key,
      onSuccess: () => {
        onClose()
      }
    }
  )

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(schema),
      invoice_number: invoice.invoice_number
    },
    resolver: zodResolver(schema)
  })

  return (
    <FormModal
      form={form}
      submissionConfig={{
        label: 'Save',
        icon: 'tabler:device-floppy',
        handler: updateMutation.mutateAsync
      }}
      uiConfig={{
        icon: 'tabler:file-invoice',
        title: 'renameInvoice',
        namespace: 'apps.melvinchia3636$invoiceMaker',
        onClose
      }}
    >
      <TextField
        required
        control={form.control}
        icon="tabler:hash"
        label="Invoice Number"
        name="invoice_number"
        placeholder="001"
      />
    </FormModal>
  )
}
