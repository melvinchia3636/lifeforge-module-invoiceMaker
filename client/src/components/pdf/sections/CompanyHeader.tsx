import { Image, Text, View } from '@react-pdf/renderer'

import type { Styles } from '../shared/styles'
import type { Settings } from '../shared/types'

export function CompanyHeader({
  logoSrc,
  settings,
  styles,
  title
}: {
  logoSrc?: string
  settings: Settings
  styles: Styles
  title: string
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerDivider}>
        <View style={styles.headerRow}>
          {logoSrc && <Image src={logoSrc} style={styles.logo} />}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{settings.company_name}</Text>
            {settings.company_reg_no && (
              <Text style={styles.companyDetail}>
                Business Reg. No.: {settings.company_reg_no}
              </Text>
            )}
            {settings.company_address && (
              <Text style={styles.companyDetail}>
                Address: {settings.company_address}
              </Text>
            )}
            {settings.company_tel_no && (
              <Text style={styles.companyDetail}>
                Tel: {settings.company_tel_no}
              </Text>
            )}
            {settings.company_email && (
              <Text style={styles.companyDetail}>
                Email: {settings.company_email}
              </Text>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.docTitle}>{title}</Text>
    </View>
  )
}
