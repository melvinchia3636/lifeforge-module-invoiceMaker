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

import { STATUS_CONFIG } from './InvoiceCard'

interface SidebarProps {
  statusFilter: string | null
  onStatusFilterChange: (status: string | null) => void
  clientFilter: string | null
  onClientFilterChange: (clientId: string | null) => void
}

export default function Sidebar({
  statusFilter,
  onStatusFilterChange,
  clientFilter,
  onClientFilterChange
}: SidebarProps) {
  const { open } = useModalStore()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  return (
    <SidebarWrapper>
      <SidebarItem
        active={statusFilter === null && clientFilter === null}
        icon="tabler:file-invoice"
        label="All Invoices"
        onClick={() => {
          onStatusFilterChange(null)
          onClientFilterChange(null)
        }}
      />
      <SidebarDivider />
      <SidebarTitle label="status" />
      {Object.entries(STATUS_CONFIG).map(([key, value]) => (
        <SidebarItem
          key={key}
          active={statusFilter === key}
          icon={value.icon}
          label={`statuses.${key}`}
          sideStripColor={value.color}
          onCancelButtonClick={() => onStatusFilterChange(null)}
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
                  active={clientFilter === null}
                  icon="tabler:users"
                  label="allClients"
                  onClick={() => onClientFilterChange(null)}
                />
                {clients.map(client => (
                  <SidebarItem
                    key={client.id}
                    active={clientFilter === client.id}
                    icon="tabler:user"
                    label={client.name}
                    namespace={false}
                    onCancelButtonClick={() => onClientFilterChange(null)}
                    onClick={() => onClientFilterChange(client.id)}
                  />
                ))}
              </>
            ) : (
              <EmptyStateScreen
                smaller
                icon="tabler:user-off"
                message={{
                  id: 'clients',
                }}
              />
            )}
          </>
        )}
      </WithQuery>
    </SidebarWrapper>
  )
}
