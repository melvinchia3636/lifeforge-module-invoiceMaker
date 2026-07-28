import { useCallback } from 'react'

import { useForgeMutation } from '@lifeforge/api'
import type { InferOutput } from '@lifeforge/api'
import {
  Box,
  Card,
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Icon,
  Text,
  colorWithOpacity,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import ClientModal from '../../ModifyClientModal'

type Client = InferOutput<typeof forgeAPI.clients.list>[number]

function ClientItem({ client }: { client: Client }) {
  const { open } = useModalStore()

  const handleEditClient = useCallback(() => {
    open(ClientModal, {
      type: 'update',
      initialData: client
    })
  }, [client, open])

  const deleteMutation = useForgeMutation(
    forgeAPI.clients.remove.input({ id: client.id }),
    { action: 'delete', queryKey: forgeAPI.key }
  )

  const handleDeleteClient = useCallback(() => {
    open(ConfirmationModal, {
      title: 'Delete Client',
      description: 'Are you sure you want to delete this client?',
      confirmationButton: 'delete',
      onConfirm: async () => {
        await deleteMutation.mutateAsync(undefined)
      }
    })
  }, [deleteMutation, open])

  return (
    <Card as="li" direction="row" gap="md" justify="between" p="md">
      <Flex align="center" gap="md" minWidth="0" width="100%">
        <Flex
          align="center"
          bg={colorWithOpacity('bg-500', '20%')}
          flexShrink="0"
          justify="center"
          p="sm"
          r="md"
        >
          <Icon color="muted" icon="tabler:user" size="1.75em" />
        </Flex>
        <Box minWidth="0" width="100%">
          <Text truncate weight="medium">
            {client.name}
          </Text>
          {(client.email || client.phone) && (
            <Text color="muted">{client.email || client.phone}</Text>
          )}
        </Box>
      </Flex>
      <ContextMenu>
        <ContextMenuItem
          icon="tabler:pencil"
          label="Edit"
          onClick={handleEditClient}
        />
        <ContextMenuItem
          dangerous
          icon="tabler:trash"
          label="Delete"
          onClick={handleDeleteClient}
        />
      </ContextMenu>
    </Card>
  )
}

export default ClientItem
