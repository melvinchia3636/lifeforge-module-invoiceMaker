import { Box, Flex, Text } from '@lifeforge/ui'

export interface PreviewLineItem {
  description: string
  quantity: number
  rate: number
}

interface PreviewLineItemsProps {
  items: PreviewLineItem[]
  currencySymbol: string
}

export default function PreviewLineItems({
  items,
  currencySymbol
}: PreviewLineItemsProps) {
  return (
    <Flex
      direction="column"
      flexShrink="0"
      mb="lg"
      overflow={{ base: 'hidden', print: 'visible' }}
      r="sm"
      style={{
        border: '1px solid #e4e4e7'
      }}
    >
      <Flex
        bg="bg-950"
        gap="md"
        p="md"
        rtl="sm"
        rtr="sm"
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
            Rate ({currencySymbol})
          </Text>
        </Box>
        <Box asChild flex="2">
          <Text align="right" color="bg-50">
            Amount ({currencySymbol})
          </Text>
        </Box>
      </Flex>

      <Flex direction="column" width="100%">
        {items.map((item, index) => (
          <Flex
            key={index}
            gap="md"
            p="md"
            style={{
              borderBottom:
                index < items.length - 1 ? '1px solid #e4e4e7' : undefined,
              breakInside: 'avoid'
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
                {item.rate.toLocaleString('en-MY', {
                  minimumFractionDigits: 2
                })}
              </Text>
            </Box>
            <Box asChild flex="2">
              <Text align="right">
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
