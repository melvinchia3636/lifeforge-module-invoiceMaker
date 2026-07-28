import dayjs from 'dayjs'

import { Flex, Text } from '@lifeforge/ui'

import { useInvoiceViewer } from '../../../providers/InvoiceViewerProvider'

function TopInfoSection() {
  const { invoice, currencySymbol, calculations } = useInvoiceViewer()

  return (
    <Flex gap="lg" mb="lg" width="100%">
      <Flex direction="column" flex="1" gap="none">
        <Text
          mb="xs"
          style={{ color: '#71717a', fontSize: '14px', fontWeight: 500 }}
        >
          Bill To:
        </Text>
        {invoice.expand?.bill_to ? (
          <>
            <Text size="xl" weight="semibold">
              {invoice.expand.bill_to.name}
            </Text>
            <Text mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
              {invoice.expand.bill_to.address}
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
          <Text style={{ color: '#71717a' }}>Invoice Number:</Text>
          <Text>{invoice.invoice_number}</Text>
        </Flex>
        <Flex justify="between">
          <Text style={{ color: '#71717a' }}>Date:</Text>
          <Text>{dayjs(invoice.date).format('DD MMM YYYY')}</Text>
        </Flex>
        <Flex justify="between">
          <Text style={{ color: '#71717a' }}>Payment Terms:</Text>
          <Text>{invoice.payment_terms || '-'}</Text>
        </Flex>
        <Flex justify="between">
          <Text style={{ color: '#71717a' }}>Due Date:</Text>
          <Text>{dayjs(invoice.due_date).format('DD MMM YYYY')}</Text>
        </Flex>
        {invoice.po_number && (
          <Flex justify="between">
            <Text style={{ color: '#71717a' }}>PO Number:</Text>
            <Text>{invoice.po_number}</Text>
          </Flex>
        )}
        <Flex
          justify="between"
          mt="lg"
          style={{ fontSize: '20px', fontWeight: 600 }}
        >
          <Text>Balance Due:</Text>
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

export default TopInfoSection
