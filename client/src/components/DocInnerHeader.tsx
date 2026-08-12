import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Button,
  Flex,
  TagsFilter,
  Text,
  useModuleSidebarState
} from '@lifeforge/ui'

import useFilter from '@/hooks/useFilter'
import { forgeAPI } from '@/manifest'

function DocInnerHeader({
  type,
  itemCount,
  statusConfig
}: {
  type: 'invoice' | 'receipt'
  itemCount: number
  statusConfig: Record<string, { color: string; icon: string }>
}) {
  const { setIsSidebarOpen } = useModuleSidebarState()
  const { t } = useModuleTranslation()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  const {
    statusFilter,
    setStatusFilter,
    clientFilter,
    setClientFilter,
    searchQuery
  } = useFilter()

  const isFiltered =
    statusFilter !== '' || clientFilter !== '' || searchQuery.trim() !== ''

  const title = t(
    `sidebar.${isFiltered ? 'filtered' : 'all'}${_.upperFirst(type)}s`
  )

  return (
    <header>
      <Flex align="center" justify="between" mb="md">
        <Text size="3xl" weight="semibold">
          {title}{' '}
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
            data: Object.entries(statusConfig).map(([key, config]) => ({
              id: key,
              label: t(`statuses.${key}`),
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
        mb="md"
        values={{
          status: statusFilter,
          client: clientFilter
        }}
        onChange={{
          status: value => setStatusFilter(value || ''),
          client: value => setClientFilter(value || '')
        }}
      />
    </header>
  )
}

export default DocInnerHeader
