import { Text, View } from '@react-pdf/renderer'

import type { Styles } from '../shared/styles'

export function Footer({
  companyName,
  styles
}: {
  companyName?: string
  styles: Styles
}) {
  if (!companyName) {
    return null
  }

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Thank you for choosing {companyName}.
      </Text>
    </View>
  )
}
