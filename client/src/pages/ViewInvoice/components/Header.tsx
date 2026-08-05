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
      <Flex
        align="center"
        direction={{ base: 'column', sm: 'row' }}
        gapX="2xl"
        gapY="md"
        justify="between"
        mb="lg"
        minWidth="0"
        mt="md"
      >
        <Box minWidth="0" width="100%">
          <Flex
            align={{ base: 'start', md: 'center' }}
            direction={{ base: 'column-reverse', md: 'row' }}
            gap="md"
            minWidth="0"
          >
            <Text truncate size="2xl" weight="semibold">
              <Text as="span" color="muted">
                {t(`items.invoice`)}
              </Text>{' '}
              #{invoice.invoice_number}
            </Text>
            <TagChip
              color={statusConfig.color}
              flexShrink="0"
              icon={statusConfig.icon}
              label={t(`statuses.${invoice.status}`)}
            />
          </Flex>
          <Text color="muted" mt="xs">
            For {invoice.expand?.bill_to?.name}
          </Text>
        </Box>
        <Flex
          align="center"
          gap="xs"
          width={{ base: '100%', sm: 'auto' }}
          wrap={{ base: 'wrap', sm: 'nowrap' }}
        >
          <Button
            flex="1"
            icon="tabler:receipt"
            minWidth="min-content"
            variant="secondary"
            onClick={() =>
              navigate(
                `/melvinchia3636--invoice-maker/receipts/modify?fromInvoice=${invoice.id}`
              )
            }
          >
            createReceipt
          </Button>
          <Button
            as={Link}
            flex="1"
            icon="tabler:pencil"
            minWidth="min-content"
            to={`/melvinchia3636--invoice-maker/modify/${invoice.id}`}
            variant="secondary"
          >
            Edit
          </Button>
          <Button
            flex="1"
            icon="tabler:printer"
            loading={fontQuery.isLoading}
            minWidth="min-content"
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
