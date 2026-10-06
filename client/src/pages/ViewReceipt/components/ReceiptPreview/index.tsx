import { Box, Card, Flex, PrintArea } from '@lifeforge/ui'

import CompanyHeader from '@/components/preview/CompanyHeader'
import PreviewFooter from '@/components/preview/PreviewFooter'
import PreviewLineItems from '@/components/preview/PreviewLineItems'
import PreviewTotals from '@/components/preview/PreviewTotals'

import { useReceiptViewer } from '../../providers/ReceiptViewerProvider'
import ReceiptTopInfoSection from './sections/ReceiptTopInfoSection'

export default function ReceiptPreview({
  ref
}: {
  ref: React.RefObject<HTMLDivElement | null>
}) {
  const { receipt, settings, currencySymbol, calculations } = useReceiptViewer()

  return (
    <Box
      pb="lg"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '56rem'
      }}
      width="100%"
    >
      <PrintArea contentRef={ref}>
        <Card
          p="xl"
          r="lg"
          style={{
            backgroundColor: '#fff',
            boxDecorationBreak: 'clone',
            color: '#000',
            fontFamily: 'Onest',
            WebkitBoxDecorationBreak: 'clone'
          }}
          width="100%"
        >
          <Flex direction="column" gap="sm" width="100%">
            <CompanyHeader settings={settings} title="RECEIPT" />
            <ReceiptTopInfoSection />
            <PreviewLineItems
              currencySymbol={currencySymbol}
              items={receipt.items || []}
            />
            <Flex direction="column" gap="lg">
              <PreviewTotals
                amountPaid={receipt.amount_paid}
                calculations={calculations}
                currencySymbol={currencySymbol}
                discountAmount={receipt.discount_amount}
                discountType={receipt.discount_type}
                shippingAmount={receipt.shipping_amount}
                taxAmount={receipt.tax_amount}
                taxType={receipt.tax_type}
              />
            </Flex>
            <PreviewFooter companyName={settings.company_name} />
          </Flex>
        </Card>
      </PrintArea>
    </Box>
  )
}
