import {
  parseAsString,
  useQueryState,
  useQueryStates
} from 'nuqs'

export default function useFilter() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const [filter, setFilter] = useQueryStates({
    status: parseAsString.withDefault(''),
    client: parseAsString.withDefault('')
  })

  const updateFilter = (key: keyof typeof filter, value: string) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return {
    searchQuery,
    setSearchQuery,
    statusFilter: filter.status,
    clientFilter: filter.client,
    setStatusFilter: (value: string) => updateFilter('status', value),
    setClientFilter: (value: string) => updateFilter('client', value)
  }
}
