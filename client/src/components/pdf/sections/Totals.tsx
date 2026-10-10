import { Text, View } from '@react-pdf/renderer'

import { COLORS, formatCurrency, type Styles } from '../shared/styles'
import type { PdfCalculations } from '../shared/types'

export function Totals({
  amountPaid,
  calculations,
  currencySymbol,
  discountAmount,
  discountType,
  shippingAmount,
  styles,
  taxAmount,
  taxType
}: {
  amountPaid?: number
  calculations: PdfCalculations
  currencySymbol: string
  discountAmount?: number
  discountType?: string
  shippingAmount?: number
  styles: Styles
  taxAmount?: number
  taxType?: string
}) {
  function Row({
    label,
    value,
    isTotal = false,
    negative = false
  }: {
    label: string
    value: string
    isTotal?: boolean
    negative?: boolean
  }) {
    return (
      <View style={styles.totalRow}>
        <Text
          style={
            isTotal
              ? styles.totalLabelBold
              : [styles.totalMuted, { flex: 1 }]
          }
        >
          {label}
        </Text>
        <Text style={isTotal ? styles.totalLabelBold : undefined}>
          {negative ? `-${currencySymbol} ` : `${currencySymbol} `}
          {value}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.totals} wrap={false}>
      <Row label="Subtotal" value={formatCurrency(calculations.subtotal)} />
      <Row
        label={`Tax ${
          taxType !== 'fixed'
            ? (taxAmount || 0) === 0
              ? '(N/A)'
              : `(${taxAmount}%)`
            : ''
        }`}
        value={formatCurrency(calculations.taxAmount)}
      />
      {calculations.discountAmount > 0 && (
        <Row
          negative
          label={`Discount ${discountType === 'rate' ? `(${discountAmount}%)` : ''}`}
          value={formatCurrency(calculations.discountAmount)}
        />
      )}
      {(shippingAmount || 0) > 0 && (
        <Row label="Shipping" value={formatCurrency(shippingAmount || 0)} />
      )}
      <View
        style={{
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          marginTop: 6,
          paddingTop: 6,
          width: '100%'
        }}
      />
      <Row isTotal label="Total" value={formatCurrency(calculations.total)} />
      {(amountPaid || 0) > 0 && (
        <Row label="Amount Paid" value={formatCurrency(amountPaid || 0)} />
      )}
    </View>
  )
}
