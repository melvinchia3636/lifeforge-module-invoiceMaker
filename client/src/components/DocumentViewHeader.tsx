import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'
import { useReactToPrint } from 'react-to-print'

import type { InferOutput } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Button, Flex, GoBackButton, TagChip, Text } from '@lifeforge/ui'

import { INVOICE_STATUS_CONFIG, RECEIPT_STATUS_CONFIG } from '@/constants/statusConfig'
import { forgeAPI } from '@/manifest'

type Invoice = InferOutput<typeof forgeAPI.invoices.getById>
type Receipt = InferOutput<typeof forgeAPI.receipts.getById>

interface DocumentViewHeaderProps {
  data: Invoice | Receipt
  contentRef: React.RefObject<HTMLDivElement | null>
}

export default function DocumentViewHeader({
  data,
  contentRef
}: DocumentViewHeaderProps) {
  const navigate = useNavigate()
  const { t } = useModuleTranslation()

  const isInvoice = 'invoice_number' in data
  const documentType = isInvoice ? 'invoice' : 'receipt'
  const documentNumber = isInvoice ? (data as Invoice).invoice_number : (data as Receipt).receipt_number

  const statusConfig = isInvoice
    ? INVOICE_STATUS_CONFIG[(data.status as keyof typeof INVOICE_STATUS_CONFIG) || 'draft']
    : RECEIPT_STATUS_CONFIG[(data.status as keyof typeof RECEIPT_STATUS_CONFIG) || 'draft']

  const fontQuery = useQuery(
    forgeAPI
      .getGoogleFont({
        family: 'Onest'
      })
      .queryOptions()
  )

  const documentTitle = `${isInvoice ? 'Invoice' : 'Receipt'}_${documentNumber || ''}`

  const reactToPrintFn = useReactToPrint({
    contentRef,
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
                {t(`items.${documentType}`, isInvoice ? 'Invoice' : 'Receipt')}
              </Text>{' '}
              #{documentNumber}
            </Text>
            <TagChip
              color={statusConfig.color}
              flexShrink="0"
              icon={statusConfig.icon}
              label={t(`statuses.${data.status}`, data.status)}
            />
          </Flex>
          <Text color="muted" mt="xs">
            For {data.expand?.bill_to?.name || 'Client'}
          </Text>
        </Box>
        <Flex
          align="center"
          gap="xs"
          width={{ base: '100%', sm: 'auto' }}
          wrap={{ base: 'wrap', sm: 'nowrap' }}
        >
          {isInvoice && (
            <Button
              flex="1"
              icon="tabler:receipt"
              minWidth="min-content"
              variant="secondary"
              onClick={() =>
                navigate(
                  `/melvinchia3636--invoice-maker/invoice/modify?fromInvoice=${data.id}`
                )
              }
            >
              createReceipt
            </Button>
          )}
          <Button
            as={Link}
            flex="1"
            icon="tabler:pencil"
            minWidth="min-content"
            to={`/melvinchia3636--invoice-maker/${documentType}/modify/${data.id}`}
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
