import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { type InferOutput } from '@lifeforge/api'
import {
  EmptyStateScreen,
  Scrollbar,
  Stack,
  WithQuery
} from '@lifeforge/ui'

import DocCard from '@/components/DocCard'
import DocWrapper from '@/components/DocWrapper'
import { INVOICE_STATUS_CONFIG } from '@/constants/statusConfig'
import useFilter from '@/hooks/useFilter'
import { forgeAPI } from '@/manifest'

export type InvoiceEntry = InferOutput<typeof forgeAPI.invoices.list>[number]

export default function InvoiceMaker() {
  const navigate = useNavigate()
  const { statusFilter, clientFilter, searchQuery } = useFilter()
  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())

  const invoicesQuery = useQuery(
    forgeAPI.invoices.list
      .input({
        status: (statusFilter ||
          undefined) as keyof typeof INVOICE_STATUS_CONFIG,
        clientId: clientFilter || undefined,
        search: searchQuery || undefined
      })
      .queryOptions()
  )

  const currencySymbol = settingsQuery.data?.currency_symbol || 'RM'

  return (
    <DocWrapper itemCount={invoicesQuery.data?.length ?? 0} type="invoice">
      <WithQuery query={invoicesQuery}>
        {data => {
          if (data.length === 0) {
            return (
              <EmptyStateScreen
                icon="tabler:file-off"
                message={{
                  id: 'invoice'
                }}
              />
            )
          }

          return (
            <Scrollbar>
              <Stack pb="lg">
                {data.map(invoice => (
                  <DocCard
                    key={invoice.id}
                    currencySymbol={currencySymbol}
                    data={invoice}
                    extraActions={[
                      {
                        icon: 'tabler:receipt',
                        label: 'createReceipt',
                        onClick: () =>
                          navigate(
                            `/melvinchia3636--invoice-maker/receipt/modify?fromInvoice=${invoice.id}`
                          )
                      }
                    ]}
                    statusConfig={INVOICE_STATUS_CONFIG}
                    type="invoice"
                  />
                ))}
              </Stack>
            </Scrollbar>
          )
        }}
      </WithQuery>
    </DocWrapper>
  )
}
