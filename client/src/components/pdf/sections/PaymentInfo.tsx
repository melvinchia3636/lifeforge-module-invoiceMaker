import { Text, View } from '@react-pdf/renderer'

import type { Styles } from '../shared/styles'
import type { Settings } from '../shared/types'

export function PaymentInfo({
  notes,
  settings,
  styles
}: {
  notes?: string
  settings: Settings
  styles: Styles
}) {
  const hasBankInfo =
    settings.bank_name ||
    settings.bank_account ||
    settings.bank_account_name

  if (!hasBankInfo && !notes) {
    return null
  }

  return (
    <View style={styles.paymentSection} wrap={false}>
      {hasBankInfo && (
        <View style={styles.paymentBlock}>
          <Text style={styles.paymentLabel}>Payment Information:</Text>
          {settings.bank_name && (
            <Text>
              Bank: <Text style={styles.bold}>{settings.bank_name}</Text>
            </Text>
          )}
          {settings.bank_account && (
            <Text>
              A/C No.: <Text style={styles.bold}>{settings.bank_account}</Text>
            </Text>
          )}
          {settings.bank_account_name && (
            <Text>
              A/C Name:{' '}
              <Text style={styles.bold}>{settings.bank_account_name}</Text>
            </Text>
          )}
        </View>
      )}
      {notes && (
        <View style={styles.paymentBlock}>
          <Text style={styles.paymentLabel}>Notes:</Text>
          <Text>{notes}</Text>
        </View>
      )}
    </View>
  )
}
