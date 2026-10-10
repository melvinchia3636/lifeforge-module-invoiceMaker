import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import { FormModal, TextField, createDefaultValues } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import type { ReceiptEntry } from '@/pages/Receipts'

const schema = z.object({
  receipt_number: z.string().min(1, 'Required')
})

interface RenameReceiptModalProps {
  data: {
    receipt: ReceiptEntry
  }
  onClose: () => void
}

export default function RenameReceiptModal({
  data: { receipt },
  onClose
}: RenameReceiptModalProps) {
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
      receipt_number: receipt.receipt_number
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
        icon: 'tabler:receipt',
        title: 'renameReceipt',
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
    </FormModal>
  )
}
