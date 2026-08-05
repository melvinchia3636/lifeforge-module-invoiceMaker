import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'

import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Button, Flex, GoBackButton, TagChip, Text } from '@lifeforge/ui'

import { RECEIPT_STATUS_CONFIG } from '@/pages/Receipts/components/ReceiptCard'
import { forgeAPI } from '@/manifest'

import { useReceiptViewer } from '../providers/ReceiptViewerProvider'

function ReceiptViewHeader({
  receiptRef
}: {
  receiptRef: React.RefObject<HTMLDivElement | null>
}) {
  const navigate = useNavigate()
  const { t } = useModuleTranslation()
  const { receipt } = useReceiptViewer()

  const statusConfig = RECEIPT_STATUS_CONFIG[receipt.status || 'draft']

  const fontQuery = useQuery(
    forgeAPI
      .getGoogleFont({
        family: 'Onest'
      })
      .queryOptions()
  )

  const documentTitle = `Receipt_${receipt?.receipt_number || ''}`

  const reactToPrintFn = useReactToPrint({
    contentRef: receiptRef,
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
                {t(`items.receipt`, 'Receipt')}
              </Text>{' '}
              #{receipt.receipt_number}
            </Text>
            <TagChip
              color={statusConfig.color}
              icon={statusConfig.icon}
              label={t(`statuses.${receipt.status}`, receipt.status)}
            />
          </Flex>
          <Text color="muted" mt="xs">
            For {receipt.expand?.bill_to?.name || 'Client'}
          </Text>
        </Box>
        <Flex align="center" gap="xs">
          <Button
            as={Link}
            icon="tabler:pencil"
            to={`/melvinchia3636--invoice-maker/receipts/modify/${receipt.id}`}
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

export default ReceiptViewHeader
