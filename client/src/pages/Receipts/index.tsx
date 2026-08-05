import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import {
  Button,
  ContentWrapperWithSidebar,
  ContextMenu,
  ContextMenuItem,
  EmptyStateScreen,
  FAB,
  Flex,
  LayoutWithSidebar,
  ModuleHeader,
  Scrollbar,
  SearchInput,
  Stack,
  WithQuery,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import ManageClientsModal from '@/modals/ManageClientsModal'
import ModifySettingsModal from '@/modals/ModifySettingsModal'

import ReceiptCard, { RECEIPT_STATUS_CONFIG } from './components/ReceiptCard'
import ReceiptInnerHeader from './components/ReceiptInnerHeader'
import ReceiptSidebar from './components/ReceiptSidebar'

export default function ReceiptsPage() {
  const navigate = useNavigate()
  const { open } = useModalStore()
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [clientFilter, setClientFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const receiptsQuery = useQuery(
    forgeAPI.receipts.list
      .input({
        status: (statusFilter || undefined) as keyof typeof RECEIPT_STATUS_CONFIG,
        clientId: clientFilter || undefined
      })
      .queryOptions()
  )

  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())

  const filteredReceipts = useMemo(() => {
    if (!receiptsQuery.data) return []

    if (!searchQuery) return receiptsQuery.data

    const query = searchQuery.toLowerCase()

    return receiptsQuery.data.filter(receipt => {
      const clientName = receipt.expand?.bill_to?.name?.toLowerCase() || ''

      return (
        receipt.receipt_number.toLowerCase().includes(query) ||
        clientName.includes(query)
      )
    })
  }, [receiptsQuery.data, searchQuery])

  const currencySymbol = settingsQuery.data?.currency_symbol || 'RM'

  return (
    <>
      <ModuleHeader
        trailing={
          <Flex align="center" gap="sm">
            <Button
              display={{ base: 'none', md: 'flex' }}
              icon="tabler:plus"
              onClick={() => navigate('/melvinchia3636--invoice-maker/receipts/modify')}
            >
              New Receipt
            </Button>
            <ContextMenu>
              <ContextMenuItem
                icon="tabler:users"
                label="manageClients"
                onClick={() => open(ManageClientsModal, {})}
              />
              <ContextMenuItem
                icon="tabler:settings"
                label="settings"
                onClick={() => open(ModifySettingsModal, {})}
              />
            </ContextMenu>
          </Flex>
        }
      />

      <LayoutWithSidebar>
        <ReceiptSidebar
          clientFilter={clientFilter}
          statusFilter={statusFilter}
          onClientFilterChange={setClientFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <ContentWrapperWithSidebar>
          <ReceiptInnerHeader
            clientFilter={clientFilter}
            itemCount={filteredReceipts.length}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onClientFilterChange={setClientFilter}
            onStatusFilterChange={setStatusFilter}
          />
          <SearchInput
            mb="lg"
            searchTarget="receipt"
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <WithQuery query={receiptsQuery}>
            {data => {
              if (data.length === 0) {
                return (
                  <EmptyStateScreen
                    icon="tabler:file-off"
                    message={{
                      id: 'receipt'
                    }}
                  />
                )
              }

              return filteredReceipts.length === 0 ? (
                <EmptyStateScreen
                  icon="tabler:search-off"
                  message={{
                    id: 'search'
                  }}
                />
              ) : (
                <Scrollbar>
                  <Stack pb="lg">
                    {filteredReceipts.map(receipt => (
                      <ReceiptCard
                        key={receipt.id}
                        currencySymbol={currencySymbol}
                        receipt={receipt}
                      />
                    ))}
                  </Stack>
                </Scrollbar>
              )
            }}
          </WithQuery>
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>

      <FAB
        icon="tabler:plus"
        onClick={() => navigate('/melvinchia3636--invoice-maker/receipts/modify')}
      />
    </>
  )
}
