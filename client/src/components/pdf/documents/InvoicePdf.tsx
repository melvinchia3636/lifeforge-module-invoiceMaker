import { Document, Page, Text, View } from '@react-pdf/renderer'
import dayjs from 'dayjs'

import { CompanyHeader } from '../sections/CompanyHeader'
import { Footer } from '../sections/Footer'
import { LineItems } from '../sections/LineItems'
import { PaymentInfo } from '../sections/PaymentInfo'
import { COLORS, createStyles, formatCurrency } from '../shared/styles'
import { Totals } from '../sections/Totals'
import { getPdfFontFamily } from '../shared/fonts'
import type { Invoice, PdfCalculations, Settings } from '../shared/types'

export function InvoicePdf({
  calculations,
  currencySymbol,
  invoice,
  logoSrc,
  settings
}: {
  calculations: PdfCalculations
  currencySymbol: string
  invoice: Invoice
  logoSrc?: string
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
          title="INVOICE"
        />
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={[styles.label, { fontWeight: 500, marginBottom: 4 }]}>
              Bill To:
            </Text>
            {invoice.expand?.bill_to ? (
              <>
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  {invoice.expand.bill_to.name}
                </Text>
                <Text style={{ marginTop: 4 }}>
                  {invoice.expand.bill_to.address}
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
              <Text style={styles.label}>Invoice Number:</Text>
              <Text style={styles.infoValue}>{invoice.invoice_number}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.infoValue}>
                {dayjs(invoice.date).format('DD MMM YYYY')}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Payment Terms:</Text>
              <Text style={styles.infoValue}>{invoice.payment_terms || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.infoValue}>
                {dayjs(invoice.due_date).format('DD MMM YYYY')}
              </Text>
            </View>
            {invoice.po_number && (
              <View style={styles.infoRow}>
                <Text style={styles.label}>PO Number:</Text>
                <Text style={styles.infoValue}>{invoice.po_number}</Text>
              </View>
            )}
            <View style={styles.balanceRow}>
              <Text>Balance Due:</Text>
              <Text>
                {currencySymbol} {formatCurrency(calculations.balanceDue)}
              </Text>
            </View>
          </View>
        </View>
        <LineItems
          currencySymbol={currencySymbol}
          items={invoice.items || []}
          styles={styles}
        />
        <Totals
          amountPaid={invoice.amount_paid}
          calculations={calculations}
          currencySymbol={currencySymbol}
          discountAmount={invoice.discount_amount}
          discountType={invoice.discount_type}
          shippingAmount={invoice.shipping_amount}
          styles={styles}
          taxAmount={invoice.tax_amount}
          taxType={invoice.tax_type}
        />
        <PaymentInfo notes={invoice.notes} settings={settings} styles={styles} />
        <Footer companyName={settings.company_name} styles={styles} />
      </Page>
    </Document>
  )
}
