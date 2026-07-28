import { Box, Card, Flex, PrintArea } from '@lifeforge/ui'

import CompanyHeader from './sections/CompanyHeader'
import FooterSection from './sections/FooterSection'
import LineItemsSection from './sections/LineItemsSection'
import PaymentAndNotesSection from './sections/PaymentAndNotesSection'
import TopInfoSection from './sections/TopInfoSection'
import TotalsSection from './sections/TotalsSection'

export default function InvoicePreview({
  ref
}: {
  ref: React.RefObject<HTMLDivElement | null>
}) {
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
            <CompanyHeader />
            <TopInfoSection />
            <LineItemsSection />
            <Flex direction="column" gap="lg">
              <TotalsSection />
              <PaymentAndNotesSection />
            </Flex>
            <FooterSection />
          </Flex>
        </Card>
      </PrintArea>
    </Box>
  )
}
