import { Box, Flex, Text } from '@lifeforge/ui'

import { useInvoiceViewer } from '../../../providers/InvoiceViewerProvider'

function LineItemsSection() {
  const { invoice, currencySymbol } = useInvoiceViewer()

  return (
    <Flex
      direction="column"
      mb="lg"
      style={{
        border: '1px solid #e4e4e7',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}
    >
      <Flex
        bg="bg-950"
        gap="md"
        p="md"
        style={{ fontSize: '14px', fontWeight: 500 }}
      >
        <Box asChild flex="6">
          <Text color="bg-50">Item</Text>
        </Box>
        <Box asChild flex="2">
          <Text align="center" color="bg-50">
            Quantity
          </Text>
        </Box>
        <Box asChild flex="2">
          <Text align="center" color="bg-50">
            Rate
          </Text>
        </Box>
        <Box asChild flex="2">
          <Text align="right" color="bg-50">
            Amount
          </Text>
        </Box>
      </Flex>

      <Flex direction="column" width="100%">
        {invoice.items?.map((item, index) => (
          <Flex
            key={index}
            gap="md"
            p="md"
            style={{
              borderBottom:
                index < invoice.items.length - 1
                  ? '1px solid #e4e4e7'
                  : undefined
            }}
          >
            <Box asChild flex="6">
              <Text whiteSpace="pre-wrap">{item.description}</Text>
            </Box>
            <Box asChild flex="2">
              <Text align="center">{item.quantity}</Text>
            </Box>
            <Box asChild flex="2">
              <Text align="center">
                {currencySymbol}{' '}
                {item.rate.toLocaleString('en-MY', {
                  minimumFractionDigits: 2
                })}
              </Text>
            </Box>
            <Box asChild flex="2">
              <Text align="right">
                {currencySymbol}{' '}
                {(item.quantity * item.rate).toLocaleString('en-MY', {
                  minimumFractionDigits: 2
                })}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default LineItemsSection
