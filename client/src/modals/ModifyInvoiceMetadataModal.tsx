import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  FormModal,
  ListboxField,
  TextField,
  createDefaultValues
} from '@lifeforge/ui'

import { INVOICE_STATUS_CONFIG } from '@/constants/statusConfig'
import { forgeAPI } from '@/manifest'
import type { InvoiceEntry } from '@/pages/Invoices'

const schema = z.object({
  invoice_number: z.string().min(1, 'Required'),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled'])
})

interface InvoiceMetadataModalProps {
  data: {
    invoice: InvoiceEntry
  }
  onClose: () => void
}

export default function ModifyInvoiceMetadataModal({
  data: { invoice },
  onClose
}: InvoiceMetadataModalProps) {
  const { t } = useModuleTranslation()

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
      invoice_number: invoice.invoice_number,
      status: invoice.status || 'draft'
    },
    resolver: zodResolver(schema)
  })

  return (
    <FormModal
      form={form}
      submissionConfig={{
        label: 'Save',
        icon: 'tabler:device-floppy',
        handler: async data => {
          await updateMutation.mutateAsync(data)
        }
      }}
      uiConfig={{
        icon: 'tabler:file-invoice',
        title: 'Edit Invoice Metadata',
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
      <ListboxField
        required
        control={form.control}
        icon="tabler:info-circle"
        label="Status"
        name="status"
        options={Object.entries(INVOICE_STATUS_CONFIG).map(([key, status]) => ({
          icon: status.icon,
          text: t(`statuses.${key}`),
          color: status.color,
          value: key as 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
        }))}
      />
    </FormModal>
  )
}
