import { useQuery } from '@tanstack/react-query'

import {
  EmptyStateScreen,
  SidebarDivider,
  SidebarItem,
  SidebarTitle,
  SidebarWrapper,
  WithQuery,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import ManageClientsModal from '@/modals/ManageClientsModal'

export default function DocSidebar({
  statusFilter,
  onStatusFilterChange,
  clientFilter,
  onClientFilterChange,
  statusConfig,
  allItemIcon,
  allItemLabel
}: {
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  clientFilter: string
  onClientFilterChange: (clientId: string) => void
  statusConfig: Record<string, { color: string; icon: string }>
  allItemIcon: string
  allItemLabel: string
}) {
  const { open } = useModalStore()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  return (
    <SidebarWrapper>
      <SidebarItem
        active={statusFilter === '' && clientFilter === ''}
        icon={allItemIcon}
        label={allItemLabel}
        onClick={() => {
          onStatusFilterChange('')
          onClientFilterChange('')
        }}
      />
      <SidebarDivider />
      <SidebarTitle label="status" />
      {Object.entries(statusConfig).map(([key, value]) => (
        <SidebarItem
          key={key}
          active={statusFilter === key}
          icon={value.icon}
          label={`statuses.${key}`}
          sideStripColor={value.color}
          onCancelButtonClick={() => onStatusFilterChange('')}
          onClick={() => onStatusFilterChange(key)}
        />
      ))}
      <SidebarDivider />
      <SidebarTitle
        actionButton={{
          icon: 'tabler:settings',
          onClick: () => {
            open(ManageClientsModal, {})
          }
        }}
        label="clients"
      />
      <WithQuery query={clientsQuery}>
        {clients => (
          <>
            {clients.length > 0 ? (
              <>
                <SidebarItem
                  active={clientFilter === ''}
                  icon="tabler:users"
                  label="allClients"
                  onClick={() => onClientFilterChange('')}
                />
                {clients.map(client => (
                  <SidebarItem
                    key={client.id}
                    active={clientFilter === client.id}
                    icon="tabler:user"
                    label={client.name}
                    namespace={false}
                    onCancelButtonClick={() => onClientFilterChange('')}
                    onClick={() => onClientFilterChange(client.id)}
                  />
                ))}
              </>
            ) : (
              <EmptyStateScreen
                smaller
                icon="tabler:user-off"
                message={{
                  id: 'clients'
                }}
              />
            )}
          </>
        )}
      </WithQuery>
    </SidebarWrapper>
  )
}
