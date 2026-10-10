import { Document, Page, Text, View } from '@react-pdf/renderer'
import dayjs from 'dayjs'

import { CompanyHeader } from '../sections/CompanyHeader'
import { Footer } from '../sections/Footer'
import { LineItems } from '../sections/LineItems'
import { COLORS, createStyles, formatCurrency } from '../shared/styles'
import { Totals } from '../sections/Totals'
import { getPdfFontFamily } from '../shared/fonts'
import type { PdfCalculations, Receipt, Settings } from '../shared/types'

export function ReceiptPdf({
  calculations,
  currencySymbol,
  logoSrc,
  receipt,
  settings
}: {
  calculations: PdfCalculations
  currencySymbol: string
  logoSrc?: string
  receipt: Receipt
  settings: Settings
}) {
  const styles = createStyles(getPdfFontFamily())

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <CompanyHeader
          logoSrc={logoSrc}
          settings={settings}
          styles={styles}
          title="RECEIPT"
        />
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={[styles.label, { fontWeight: 500, marginBottom: 4 }]}>
              Received From:
            </Text>
            {receipt.expand?.bill_to ? (
              <>
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  {receipt.expand.bill_to.name}
                </Text>
                <Text style={{ marginTop: 4 }}>
                  {receipt.expand.bill_to.address}
                </Text>
              </>
            ) : (
              <Text style={{ color: COLORS.lightMuted }}>
                No client specified
              </Text>
            )}
          </View>
          <View style={[styles.column, { gap: 6 }]}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Receipt Number:</Text>
              <Text style={styles.infoValue}>{receipt.receipt_number}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.infoValue}>
                {dayjs(receipt.date).format('DD MMM YYYY')}
              </Text>
            </View>
            {receipt.payment_method && (
              <View style={styles.infoRow}>
                <Text style={styles.label}>Payment Method:</Text>
                <Text style={styles.infoValue}>{receipt.payment_method}</Text>
              </View>
            )}
            {receipt.reference_number && (
              <View style={styles.infoRow}>
                <Text style={styles.label}>Reference Number:</Text>
                <Text style={styles.infoValue}>{receipt.reference_number}</Text>
              </View>
            )}
            <View style={styles.balanceRow}>
              <Text>Balance:</Text>
              <Text>
                {currencySymbol} {formatCurrency(calculations.balanceDue)}
              </Text>
            </View>
          </View>
        </View>
        <LineItems
          currencySymbol={currencySymbol}
          items={receipt.items || []}
          styles={styles}
        />
        <Totals
          amountPaid={receipt.amount_paid}
          calculations={calculations}
          currencySymbol={currencySymbol}
          discountAmount={receipt.discount_amount}
          discountType={receipt.discount_type}
          shippingAmount={receipt.shipping_amount}
          styles={styles}
          taxAmount={receipt.tax_amount}
          taxType={receipt.tax_type}
        />
        <Footer companyName={settings.company_name} styles={styles} />
      </Page>
    </Document>
  )
}
