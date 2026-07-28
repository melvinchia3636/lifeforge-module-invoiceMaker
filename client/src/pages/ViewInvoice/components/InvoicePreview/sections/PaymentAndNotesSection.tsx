import { Flex, Text } from '@lifeforge/ui'

import { useInvoiceViewer } from '../../../providers/InvoiceViewerProvider'

function PaymentAndNotesSection() {
  const { invoice, settings } = useInvoiceViewer()

  return (
    <Flex direction="column" gap="lg" mt="3xl">
      {(settings.bank_name || settings.bank_account) && (
        <Flex direction="column" gap="none">
          <Text color="muted" mb="sm" weight="medium">
            Payment Information:
          </Text>
          {settings.bank_name && (
            <Text>
              Bank: <Text weight="medium">{settings.bank_name}</Text>
            </Text>
          )}
          {settings.bank_account && (
            <Text>
              A/C No.: <Text weight="medium">{settings.bank_account}</Text>
            </Text>
          )}
          {settings.bank_account_name && (
            <Text>
              A/C Name:{' '}
              <Text weight="medium">{settings.bank_account_name}</Text>
            </Text>
          )}
        </Flex>
      )}

      {invoice.notes && (
        <Flex direction="column" gap="none">
          <Text color="muted" mb="sm" weight="medium">
            Notes:
          </Text>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{invoice.notes}</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default PaymentAndNotesSection
