import { Box, Flex, Text } from '@lifeforge/ui'

import { useInvoiceViewer } from '../../../providers/InvoiceViewerProvider'

function TotalsSection() {
  const { invoice, currencySymbol, calculations } = useInvoiceViewer()

  function Row({
    label,
    showCurrency = true,
    value,
    isTotal = false,
    negative = false
  }: {
    label: string
    showCurrency?: boolean
    value: string
    isTotal?: boolean
    negative?: boolean
  }) {
    return (
      <Flex gap="xs" justify="end" width="100%">
        <Box flex="1">
          <Text
            color={isTotal ? undefined : 'muted'}
            weight={isTotal ? 'semibold' : undefined}
          >
            {label}
          </Text>
        </Box>
        {showCurrency && (
          <Box asChild width="auto">
            <Text align="right" weight={isTotal ? 'semibold' : undefined}>
              {negative ? `-${currencySymbol}` : currencySymbol}
            </Text>
          </Box>
        )}
        <Box asChild width="auto">
          <Text
            align="right"
            style={{ fontVariantNumeric: 'tabular-nums' }}
            weight={isTotal ? 'semibold' : undefined}
          >
            {value}
          </Text>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      gap="xs"
      style={{
        marginLeft: 'auto'
      }}
      width="50%"
    >
      <Row
        label="Subtotal"
        value={calculations.subtotal.toLocaleString('en-MY', {
          minimumFractionDigits: 2
        })}
      />

      <Row
        label={`Tax ${
          invoice.tax_type !== 'fixed'
            ? (invoice.tax_amount || 0) === 0
              ? '(N/A)'
              : `(${invoice.tax_amount}%)`
            : ''
        }`}
        value={calculations.taxAmount.toLocaleString('en-MY', {
          minimumFractionDigits: 2
        })}
      />

      {calculations.discountAmount > 0 && (
        <Row
          negative
          label={`Discount ${invoice.discount_type === 'rate' ? `(${invoice.discount_amount}%)` : ''}`}
          value={calculations.discountAmount.toLocaleString('en-MY', {
            minimumFractionDigits: 2
          })}
        />
      )}

      {(invoice.shipping_amount || 0) > 0 && (
        <Row
          label="Shipping"
          value={invoice.shipping_amount.toLocaleString('en-MY', {
            minimumFractionDigits: 2
          })}
        />
      )}

      <Box
        style={{
          borderTop: '1px solid #e4e4e7',
          paddingTop: '0.5rem'
        }}
        width="100%"
      />

      <Row
        isTotal
        label="Total"
        value={calculations.total.toLocaleString('en-MY', {
          minimumFractionDigits: 2
        })}
      />

      {(invoice.amount_paid || 0) > 0 && (
        <Row
          label="Amount Paid"
          value={invoice.amount_paid.toLocaleString('en-MY', {
            minimumFractionDigits: 2
          })}
        />
      )}
    </Flex>
  )
}

export default TotalsSection
