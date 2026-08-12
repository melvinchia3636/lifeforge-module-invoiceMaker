import { useQuery } from '@tanstack/react-query'
import { AutoSizer } from 'react-virtualized'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  EmptyStateScreen,
  Flex,
  ModalHeader,
  Scrollbar,
  Stack,
  WithQuery,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import ClientModal from '../ModifyClientModal'
import ClientItem from './components/ClientItem'

function ManageClientsModal({ onClose }: { onClose: () => void }) {
  const { open } = useModalStore()
  const { t } = useModuleTranslation()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  return (
    <Flex direction="column" minHeight="80vh" minWidth="40vw">
      <ModalHeader
        icon="tabler:users"
        title="clients.manage"
        trailing={
          <Button
            icon="tabler:plus"
            variant="plain"
            onClick={() => {
              open(ClientModal, {
                type: 'create'
              })
            }}
          />
        }
        onClose={onClose}
      />
      <WithQuery query={clientsQuery}>
        {clients =>
          clients.length > 0 ? (
            <Box flex="1" mt="md">
              <AutoSizer>
                {({ width, height }) => (
                  <Scrollbar
                    style={{
                      width,
                      height
                    }}
                  >
                    <Stack gap="sm">
                      {clients.map(client => (
                        <ClientItem key={client.id} client={client} />
                      ))}
                    </Stack>
                  </Scrollbar>
                )}
              </AutoSizer>
            </Box>
          ) : (
            <Flex centered flex="1">
              <EmptyStateScreen
                CTAButtonProps={{
                  children: 'new',
                  icon: 'tabler:plus',
                  onClick: () => {
                    open(ClientModal, {
                      type: 'create'
                    })
                  },
                  tProps: { item: t('items.client') }
                }}
                icon="tabler:users-off"
                message={{
                  id: 'clients'
                }}
              />
            </Flex>
          )
        }
      </WithQuery>
    </Flex>
  )
}

export default ManageClientsModal
