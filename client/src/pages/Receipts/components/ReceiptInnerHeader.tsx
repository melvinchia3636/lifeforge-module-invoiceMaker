import { useQuery } from '@tanstack/react-query'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Button,
  Flex,
  TagsFilter,
  Text,
  useModuleSidebarState
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import { RECEIPT_STATUS_CONFIG } from './ReceiptCard'

interface ReceiptHeaderProps {
  itemCount: number
  statusFilter: string | null
  clientFilter: string | null
  searchQuery: string
  onStatusFilterChange: (status: string | null) => void
  onClientFilterChange: (clientId: string | null) => void
}

function ReceiptInnerHeader({
  itemCount,
  statusFilter,
  clientFilter,
  searchQuery,
  onStatusFilterChange,
  onClientFilterChange
}: ReceiptHeaderProps) {
  const { t } = useModuleTranslation()
  const { setIsSidebarOpen } = useModuleSidebarState()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  const isFiltered =
    statusFilter !== null || clientFilter !== null || searchQuery.trim() !== ''

  return (
    <header>
      <Flex align="center" justify="between" mb="md">
        <Text size="3xl" weight="semibold">
          {t(`sidebar.${isFiltered ? 'filteredReceipts' : 'allReceipts'}`, isFiltered ? 'Filtered Receipts' : 'All Receipts')}{' '}
          <Text as="span" color="muted" size="base">
            ({itemCount})
          </Text>
        </Text>
        <Button
          display={{ base: 'flex', xl: 'none' }}
          icon="tabler:menu"
          variant="plain"
          onClick={() => {
            setIsSidebarOpen(true)
          }}
        />
      </Flex>
      <TagsFilter
        availableFilters={{
          status: {
            isColored: true,
            data: Object.entries(RECEIPT_STATUS_CONFIG).map(([key, config]) => ({
              id: key,
              label: t(`statuses.${key}`, key),
              icon: config.icon,
              color: config.color
            }))
          },
          client: {
            data:
              clientsQuery.data?.map(client => ({
                id: client.id,
                label: client.name,
                icon: 'tabler:user'
              })) ?? []
          }
        }}
        values={{
          status: statusFilter ?? '',
          client: clientFilter ?? ''
        }}
        onChange={{
          status: value =>
            onStatusFilterChange((value || null) as string | null),
          client: value =>
            onClientFilterChange((value || null) as string | null)
        }}
      />
    </header>
  )
}

export default ReceiptInnerHeader
