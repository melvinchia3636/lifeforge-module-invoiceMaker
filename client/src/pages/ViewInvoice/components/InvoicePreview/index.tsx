import { Box, Card, Flex, PrintArea } from '@lifeforge/ui'

import CompanyHeader from '@/components/preview/CompanyHeader'
import PreviewFooter from '@/components/preview/PreviewFooter'
import PreviewLineItems from '@/components/preview/PreviewLineItems'
import PreviewPaymentInfo from '@/components/preview/PreviewPaymentInfo'
import PreviewTotals from '@/components/preview/PreviewTotals'

import { useInvoiceViewer } from '../../providers/InvoiceViewerProvider'
import TopInfoSection from './sections/TopInfoSection'

export default function InvoicePreview({
  ref
}: {
  ref: React.RefObject<HTMLDivElement | null>
}) {
  const { invoice, settings, currencySymbol, calculations } = useInvoiceViewer()

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
          height="100%"
          p="xl"
          r="lg"
          style={{
            aspectRatio: '1 / 1.414',
            backgroundColor: '#fff',
            color: '#000',
            fontFamily: 'Onest'
          }}
          width="100%"
        >
          <Flex direction="column" gap="sm" height="100%" width="100%">
            <CompanyHeader settings={settings} title="INVOICE" />
            <TopInfoSection />
            <PreviewLineItems
              currencySymbol={currencySymbol}
              items={invoice.items || []}
            />
            <Flex direction="column" gap="lg">
              <PreviewTotals
                amountPaid={invoice.amount_paid}
                calculations={calculations}
                currencySymbol={currencySymbol}
                discountAmount={invoice.discount_amount}
                discountType={invoice.discount_type}
                shippingAmount={invoice.shipping_amount}
                taxAmount={invoice.tax_amount}
                taxType={invoice.tax_type}
              />
              <PreviewPaymentInfo notes={invoice.notes} settings={settings} />
            </Flex>
            <PreviewFooter companyName={settings.company_name} />
          </Flex>
        </Card>
      </PrintArea>
    </Box>
  )
}
