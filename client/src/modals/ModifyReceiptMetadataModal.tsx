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

import { RECEIPT_STATUS_CONFIG, type ReceiptEntry } from '@/pages/Receipts/components/ReceiptCard'
import { forgeAPI } from '@/manifest'

const schema = z.object({
  receipt_number: z.string().min(1, 'Required'),
  status: z.enum(['draft', 'issued', 'cancelled'])
})

interface ReceiptMetadataModalProps {
  data: {
    receipt: ReceiptEntry
  }
  onClose: () => void
}

export default function ModifyReceiptMetadataModal({
  data: { receipt },
  onClose
}: ReceiptMetadataModalProps) {
  const { t } = useModuleTranslation()

  const updateMutation = useForgeMutation(
    forgeAPI.receipts.update.input({ id: receipt.id }),
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
      receipt_number: receipt.receipt_number,
      status: receipt.status || 'draft'
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
        icon: 'tabler:receipt',
        title: 'Edit Receipt Metadata',
        namespace: 'apps.melvinchia3636$invoiceMaker',
        onClose
      }}
    >
      <TextField
        required
        control={form.control}
        icon="tabler:hash"
        label="Receipt Number"
        name="receipt_number"
        placeholder="REC-001"
      />
      <ListboxField
        required
        control={form.control}
        icon="tabler:info-circle"
        label="Status"
        name="status"
        options={Object.entries(RECEIPT_STATUS_CONFIG).map(([key, status]) => ({
          icon: status.icon,
          text: t(`statuses.${key}`),
          color: status.color,
          value: key as 'draft' | 'issued' | 'cancelled'
        }))}
      />
    </FormModal>
  )
}
