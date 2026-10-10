import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import { FormModal, ListboxField, createDefaultValues } from '@lifeforge/ui'

import { INVOICE_STATUS_CONFIG } from '@/constants/statusConfig'
import { forgeAPI } from '@/manifest'

const schema = z.object({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled'])
})

interface InvoiceStatusModalProps {
  data: {
    id: string
    status?: string
  }
  onClose: () => void
}

export default function ModifyInvoiceStatusModal({
  data: { id, status },
  onClose
}: InvoiceStatusModalProps) {
  const { t } = useModuleTranslation()

  const updateMutation = useForgeMutation(
    forgeAPI.invoices.update.input({ id }),
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
      status: (status || 'draft') as
        | 'draft'
        | 'sent'
        | 'paid'
        | 'overdue'
        | 'cancelled'
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
        icon: 'tabler:info-circle',
        title: 'changeInvoiceStatus',
        namespace: 'apps.melvinchia3636$invoiceMaker',
        onClose
      }}
    >
      <ListboxField
        required
        control={form.control}
        icon="tabler:info-circle"
        label="Status"
        name="status"
        options={Object.entries(INVOICE_STATUS_CONFIG).map(([key, config]) => ({
          icon: config.icon,
          text: t(`statuses.${key}`),
          color: config.color,
          value: key as 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
        }))}
      />
    </FormModal>
  )
}
