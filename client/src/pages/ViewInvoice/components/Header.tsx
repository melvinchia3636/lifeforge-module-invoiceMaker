import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'

import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Button, Flex, GoBackButton, TagChip, Text } from '@lifeforge/ui'

import { STATUS_CONFIG } from '@/components/InvoiceCard'
import { forgeAPI } from '@/manifest'

import { useInvoiceViewer } from '../providers/InvoiceViewerProvider'

function Header({
  invoiceRef
}: {
  invoiceRef: React.RefObject<HTMLDivElement | null>
}) {
  const navigate = useNavigate()
  const { t } = useModuleTranslation()
  const { invoice } = useInvoiceViewer()

  const statusConfig = STATUS_CONFIG[invoice.status || 'draft']

  const fontQuery = useQuery(
    forgeAPI
      .getGoogleFont({
        family: 'Onest'
      })
      .queryOptions()
  )

  const documentTitle = `Invoice_${invoice?.invoice_number || ''}`

  const reactToPrintFn = useReactToPrint({
    contentRef: invoiceRef,
    fonts: fontQuery.data?.items?.length
      ? [
          {
            family: fontQuery.data.items[0].family,
            source: fontQuery.data.items[0].files.regular || ''
          }
        ]
      : [],
    documentTitle
  })

  return (
    <>
      <GoBackButton onClick={() => navigate(-1)} />
      <Flex align="center" justify="between" mb="lg" mt="md">
        <Box>
          <Flex align="center" gap="md">
            <Text size="2xl" weight="semibold">
              <Text as="span" color="muted">
                {t(`items.invoice`)}
              </Text>{' '}
              #{invoice.invoice_number}
            </Text>
            <TagChip
              color={statusConfig.color}
              icon={statusConfig.icon}
              label={t(`statuses.${invoice.status}`)}
            />
          </Flex>
          <Text color="muted" mt="xs">
            For {invoice.expand?.bill_to?.name}
          </Text>
        </Box>
        <Flex align="center" gap="xs">
          <Button
            as={Link}
            icon="tabler:pencil"
            to={`/melvinchia3636--invoice-maker/modify/${invoice.id}`}
            variant="secondary"
          >
            Edit
          </Button>
          <Button
            icon="tabler:printer"
            loading={fontQuery.isLoading}
            onClick={reactToPrintFn}
          >
            Print
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Header
