import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useForgeMutation } from '@lifeforge/api'
import type { InferOutput } from '@lifeforge/api'
import {
  FormModal,
  TextAreaField,
  TextField,
  createDefaultValues
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  address: z.string(),
  email: z.string(),
  phone: z.string()
})

type Client = InferOutput<typeof forgeAPI.clients.list>[number]

interface ClientModalProps {
  data: {
    type: 'create' | 'update'
    initialData?: Partial<Client>
  }
  onClose: () => void
}

export default function ModifyClientModal({
  data: { type, initialData },
  onClose
}: ClientModalProps) {
  const createMutation = useForgeMutation(forgeAPI.clients.create, {
    action: 'create',
    queryKey: forgeAPI.key,
    onSuccess: () => {
      onClose()
    }
  })

  const updateMutation = useForgeMutation(
    forgeAPI.clients.update.input({ id: initialData?.id || '' }),
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
      ...initialData
    },
    resolver: zodResolver(schema)
  })

  return (
    <FormModal
      form={form}
      submissionConfig={{
        template: type,
        handler: async data => {
          await (
            type === 'update' ? updateMutation : createMutation
          ).mutateAsync(data)
        }
      }}
      uiConfig={{
        icon: type === 'update' ? 'tabler:pencil' : 'tabler:plus',
        title:
          type === 'update' ? 'modals.clients.update' : 'modals.clients.create',
        namespace: 'apps.melvinchia3636$invoiceMaker',
        onClose
      }}
    >
      <TextField
        required
        control={form.control}
        icon="tabler:building"
        label="inputs.name"
        name="name"
        placeholder="Company or individual name"
      />
      <TextAreaField
        control={form.control}
        icon="tabler:map-pin"
        label="inputs.address"
        name="address"
        placeholder="Full billing address"
      />
      <TextField
        control={form.control}
        icon="tabler:mail"
        label="inputs.email"
        name="email"
        placeholder="client@example.com"
      />
      <TextField
        control={form.control}
        icon="tabler:phone"
        label="inputs.phone"
        name="phone"
        placeholder="+60 12-345 6789"
      />
    </FormModal>
  )
}
