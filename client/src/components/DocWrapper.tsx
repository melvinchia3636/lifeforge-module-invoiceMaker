import { useNavigate } from 'react-router'

import {
  ContentWrapperWithSidebar,
  FAB,
  LayoutWithSidebar,
  SearchInput,
  useModalStore
} from '@lifeforge/ui'

import {
  INVOICE_STATUS_CONFIG,
  RECEIPT_STATUS_CONFIG
} from '@/constants/statusConfig'
import useFilter from '@/hooks/useFilter'
import ManageClientsModal from '@/modals/ManageClientsModal'
import ModifySettingsModal from '@/modals/ModifySettingsModal'

import DocInnerHeader from './DocInnerHeader'
import DocModuleHeader from './DocModuleHeader'
import DocSidebar from './DocSidebar'

function DocWrapper({
  type,
  itemCount,
  children
}: {
  type: 'invoice' | 'receipt'
  itemCount: number
  children: React.ReactNode
}) {
  const { open } = useModalStore()
  const navigate = useNavigate()

  const {
    statusFilter,
    setStatusFilter,
    clientFilter,
    setClientFilter,
    searchQuery,
    setSearchQuery
  } = useFilter()

  const statusConfig =
    type === 'invoice' ? INVOICE_STATUS_CONFIG : RECEIPT_STATUS_CONFIG

  return (
    <>
      <DocModuleHeader
        newButtonLabel="New Invoice"
        onManageClients={() => open(ManageClientsModal, {})}
        onManageSettings={() => open(ModifySettingsModal, {})}
        onNewClick={() =>
          navigate(`/melvinchia3636--invoice-maker/${type}/modify`)
        }
      />
      <LayoutWithSidebar>
        <DocSidebar
          allItemIcon="tabler:file-invoice"
          allItemLabel="All Invoices"
          clientFilter={clientFilter}
          statusConfig={statusConfig}
          statusFilter={statusFilter}
          onClientFilterChange={setClientFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <ContentWrapperWithSidebar>
          <DocInnerHeader
            itemCount={itemCount}
            statusConfig={statusConfig}
            type={type}
          />
          <SearchInput
            debounceMs={500}
            mb="lg"
            searchTarget={type}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          {children}
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>
      <FAB
        icon="tabler:plus"
        onClick={() =>
          navigate(`/melvinchia3636--invoice-maker/${type}/modify`)
        }
      />
    </>
  )
}

export default DocWrapper
