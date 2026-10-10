import { useQuery } from '@tanstack/react-query'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Button,
  EmptyStateScreen,
  FAB,
  Flex,
  ModuleHeader,
  Stack,
  WithQuery,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import ClientModal from '@/modals/ModifyClientModal'

import ClientItem from './components/ClientItem'

function Clients() {
  const { open } = useModalStore()
  const { t } = useModuleTranslation()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  const handleCreate = () => {
    open(ClientModal, {
      type: 'create'
    })
  }

  return (
    <>
      <ModuleHeader
        icon="tabler:users"
        title="clients"
        trailing={
          <Button
            display={{ base: 'none', sm: 'flex' }}
            icon="tabler:plus"
            tProps={{
              item: t('items.client')
            }}
            onClick={handleCreate}
          >
            new
          </Button>
        }
      />
      <WithQuery query={clientsQuery}>
        {clients =>
          clients.length > 0 ? (
            <Stack gap="sm" pb="lg">
              {clients.map(client => (
                <ClientItem key={client.id} client={client} />
              ))}
            </Stack>
          ) : (
            <Flex centered flex="1" minHeight="40vh">
              <EmptyStateScreen
                CTAButtonProps={{
                  children: 'new',
                  icon: 'tabler:plus',
                  onClick: handleCreate,
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
      <FAB icon="tabler:plus" onClick={handleCreate} />
    </>
  )
}

export default Clients
