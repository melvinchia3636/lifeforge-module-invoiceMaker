import { Flex, Text } from '@lifeforge/ui'

interface PreviewFooterProps {
  companyName?: string
}

export default function PreviewFooter({ companyName }: PreviewFooterProps) {
  if (!companyName) {
    return null
  }

  return (
    <Flex justify="center" pt="xl" style={{ marginTop: 'auto' }} width="100%">
      <Text align="center" color="bg-400" size="sm" weight="medium">
        Thank you for choosing {companyName}.
      </Text>
    </Flex>
  )
}
