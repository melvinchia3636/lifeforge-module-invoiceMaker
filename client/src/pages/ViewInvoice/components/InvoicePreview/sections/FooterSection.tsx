import { Flex, Text } from '@lifeforge/ui'

import { useInvoiceViewer } from '../../../providers/InvoiceViewerProvider'

function FooterSection() {
  const { settings } = useInvoiceViewer()

  if (!settings.company_name) {
    return null
  }

  return (
    <Flex
      justify="center"
      pt="xl"
      style={{
        marginTop: 'auto'
      }}
      width="100%"
    >
      <Text align="center" color="bg-400" size="sm" weight="medium">
        Thank you for choosing {settings.company_name}.
      </Text>
    </Flex>
  )
}

export default FooterSection
