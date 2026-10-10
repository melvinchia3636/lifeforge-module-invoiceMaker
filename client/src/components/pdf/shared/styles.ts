import { StyleSheet } from '@react-pdf/renderer'

export const COLORS = {
  border: '#e4e4e7',
  dark: '#09090b',
  darkDetail: '#3f3f46',
  darkText: '#fafafa',
  footer: '#a1a1aa',
  lightMuted: '#a1a1aa',
  muted: '#71717a'
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-MY', {
    minimumFractionDigits: 2
  })
}

export function createStyles(fontFamily: string) {
  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      color: '#000000',
      fontFamily,
      fontSize: 10.5,
      padding: 24
    },
    header: {
      marginBottom: 18
    },
    headerDivider: {
      borderBottomColor: COLORS.dark,
      borderBottomWidth: 1,
      paddingBottom: 12
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 18
    },
    logo: {
      objectFit: 'contain',
      height: 60
    },
    companyInfo: {
      flexDirection: 'column',
      gap: 1
    },
    companyName: {
      fontSize: 13,
      fontWeight: 700
    },
    companyDetail: {
      color: COLORS.darkDetail
    },
    docTitle: {
      fontSize: 24,
      fontWeight: 300,
      letterSpacing: 3.2,
      marginTop: 12,
      textAlign: 'center'
    },
    section: {
      flexDirection: 'row',
      gap: 18,
      marginBottom: 18
    },
    column: {
      flex: 1,
      flexDirection: 'column'
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    label: {
      color: COLORS.muted,
      flexShrink: 0
    },
    infoValue: {
      flex: 1,
      marginLeft: 6,
      textAlign: 'right'
    },
    balanceRow: {
      flexDirection: 'row',
      fontSize: 15,
      fontWeight: 600,
      justifyContent: 'space-between',
      marginTop: 18
    },
    lineItems: {
      borderColor: COLORS.border,
      borderWidth: 1,
      marginBottom: 18
    },
    lineItemsHeader: {
      backgroundColor: COLORS.dark,
      flexDirection: 'row',
      gap: 12,
      padding: 12
    },
    lineItemsHeaderCell: {
      color: COLORS.darkText,
      fontSize: 10.5,
      fontWeight: 500
    },
    lineItemRow: {
      borderBottomColor: COLORS.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      gap: 12,
      padding: 12
    },
    column6: {
      flex: 6
    },
    column2: {
      flex: 2
    },
    totals: {
      alignItems: 'flex-end',
      flexDirection: 'column',
      marginLeft: 'auto',
      width: '50%'
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
      width: '100%'
    },
    totalLabelBold: {
      fontWeight: 600
    },
    totalMuted: {
      color: COLORS.muted
    },
    paymentSection: {
      flexDirection: 'column',
      gap: 18,
      marginTop: 18
    },
    paymentBlock: {
      flexDirection: 'column'
    },
    paymentLabel: {
      color: COLORS.muted,
      fontWeight: 500,
      marginBottom: 6
    },
    bold: {
      fontWeight: 500
    },
    footer: {
      alignItems: 'center',
      marginTop: 48
    },
    footerText: {
      color: COLORS.footer,
      fontSize: 9,
      fontWeight: 500,
      textAlign: 'center'
    }
  })
}

export type Styles = ReturnType<typeof createStyles>
