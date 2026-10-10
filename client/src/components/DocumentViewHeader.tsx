import { useState } from 'react'
import { useNavigate } from 'react-router'

import { pdf } from '@react-pdf/renderer'

import type { InferOutput } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  ContextMenu,
  ContextMenuItem,
  Flex,
  GoBackButton,
  TagChip,
  Text,
  useModalStore
} from '@lifeforge/ui'

import { InvoicePdf } from '@/components/pdf/documents/InvoicePdf'
import { ReceiptPdf } from '@/components/pdf/documents/ReceiptPdf'
import { ensurePdfFont, resolveMediaDataUrl } from '@/components/pdf/shared/fonts'
import type { PdfCalculations } from '@/components/pdf/shared/types'
import {
  INVOICE_STATUS_CONFIG,
  RECEIPT_STATUS_CONFIG
} from '@/constants/statusConfig'
import { forgeAPI } from '@/manifest'
import ModifyInvoiceStatusModal from '@/modals/ModifyInvoiceStatusModal'
import ModifyReceiptStatusModal from '@/modals/ModifyReceiptStatusModal'

type Invoice = InferOutput<typeof forgeAPI.invoices.getById>
type Receipt = InferOutput<typeof forgeAPI.receipts.getById>
type Settings = InferOutput<typeof forgeAPI.settings.get>

interface DocumentViewHeaderProps {
  data: Invoice | Receipt
  settings: Settings
  currencySymbol: string
  calculations: PdfCalculations
}

export default function DocumentViewHeader({
  data,
  settings,
  currencySymbol,
  calculations
}: DocumentViewHeaderProps) {
  const navigate = useNavigate()
  const { t } = useModuleTranslation()
  const { open } = useModalStore()
  const [downloading, setDownloading] = useState(false)

  const isInvoice = 'invoice_number' in data
  const documentType = isInvoice ? 'invoice' : 'receipt'
  const documentNumber = isInvoice ? (data as Invoice).invoice_number : (data as Receipt).receipt_number

  const statusConfig = isInvoice
    ? INVOICE_STATUS_CONFIG[(data.status as keyof typeof INVOICE_STATUS_CONFIG) || 'draft']
    : RECEIPT_STATUS_CONFIG[(data.status as keyof typeof RECEIPT_STATUS_CONFIG) || 'draft']

  const documentTitle = [documentNumber, data.expand?.bill_to?.name]
    .filter(Boolean)
    .join(' ')

  async function handleDownload() {
    setDownloading(true)

    try {
      await ensurePdfFont()

      const logoSrc = await resolveMediaDataUrl(settings.default_logo)

      const blob = await pdf(
        isInvoice ? (
          <InvoicePdf
            calculations={calculations}
            currencySymbol={currencySymbol}
            invoice={data}
            logoSrc={logoSrc}
            settings={settings}
          />
        ) : (
          <ReceiptPdf
            calculations={calculations}
            currencySymbol={currencySymbol}
            logoSrc={logoSrc}
            receipt={data}
            settings={settings}
          />
        )
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.download = `${documentTitle}.pdf`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  function handleChangeStatus() {
    if (isInvoice) {
      open(ModifyInvoiceStatusModal, { id: data.id, status: data.status })
    } else {
      open(ModifyReceiptStatusModal, { id: data.id, status: data.status })
    }
  }

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
          <Button
            flex="1"
            icon="tabler:download"
            loading={downloading}
            minWidth="min-content"
            onClick={handleDownload}
          >
            downloadPdf
          </Button>
          <ContextMenu>
            {isInvoice && (
              <ContextMenuItem
                icon="tabler:receipt"
                label="createReceipt"
                onClick={() =>
                  navigate(
                    `/melvinchia3636--invoice-maker/receipt/modify?fromInvoice=${data.id}`
                  )
                }
              />
            )}
            <ContextMenuItem
              icon="tabler:pencil"
              label="edit"
              onClick={() =>
                navigate(
                  `/melvinchia3636--invoice-maker/${documentType}/modify/${data.id}`
                )
              }
            />
            <ContextMenuItem
              icon="tabler:info-circle"
              label="changeStatus"
              onClick={handleChangeStatus}
            />
          </ContextMenu>
        </Flex>
      </Flex>
    </>
  )
}
