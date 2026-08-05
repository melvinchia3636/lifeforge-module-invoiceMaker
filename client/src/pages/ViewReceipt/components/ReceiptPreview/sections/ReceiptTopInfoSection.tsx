import dayjs from 'dayjs'

import { Flex, Text } from '@lifeforge/ui'

import { useReceiptViewer } from '../../../providers/ReceiptViewerProvider'

function ReceiptTopInfoSection() {
  const { receipt, currencySymbol, calculations } = useReceiptViewer()

  return (
    <Flex gap="lg" mb="lg" width="100%">
      <Flex direction="column" flex="1" gap="none">
        <Text
          mb="xs"
          style={{ color: '#71717a', fontSize: '14px', fontWeight: 500 }}
        >
          Received From:
        </Text>
        {receipt.expand?.bill_to ? (
          <>
            <Text size="xl" weight="semibold">
              {receipt.expand.bill_to.name}
            </Text>
            <Text mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
              {receipt.expand.bill_to.address}
            </Text>
          </>
        ) : (
          <Text style={{ color: '#a1a1aa', fontStyle: 'italic' }}>
            No client specified
          </Text>
        )}
      </Flex>
      <Flex direction="column" flex="1" gap="sm">
        <Flex justify="between">
          <Text style={{ color: '#71717a' }}>Receipt Number:</Text>
          <Text>{receipt.receipt_number}</Text>
        </Flex>
        <Flex justify="between">
          <Text style={{ color: '#71717a' }}>Date:</Text>
          <Text>{dayjs(receipt.date).format('DD MMM YYYY')}</Text>
        </Flex>
        {receipt.payment_method && (
          <Flex justify="between">
            <Text style={{ color: '#71717a' }}>Payment Method:</Text>
            <Text>{receipt.payment_method}</Text>
          </Flex>
        )}
        {receipt.reference_number && (
          <Flex justify="between">
            <Text style={{ color: '#71717a' }}>Reference Number:</Text>
            <Text>{receipt.reference_number}</Text>
          </Flex>
        )}
        <Flex
          justify="between"
          mt="lg"
          style={{ fontSize: '20px', fontWeight: 600 }}
        >
          <Text>Balance:</Text>
          <Text>
            {currencySymbol}{' '}
            {calculations.balanceDue.toLocaleString('en-MY', {
              minimumFractionDigits: 2
            })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ReceiptTopInfoSection
