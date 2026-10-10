import { Text, View } from '@react-pdf/renderer'

import { formatCurrency, type Styles } from '../shared/styles'

export function LineItems({
  currencySymbol,
  items,
  styles
}: {
  currencySymbol: string
  items: { description: string; quantity: number; rate: number }[]
  styles: Styles
}) {
  return (
    <View style={styles.lineItems}>
      <View style={styles.lineItemsHeader}>
        <View style={styles.column6}>
          <Text style={styles.lineItemsHeaderCell}>Item</Text>
        </View>
        <View style={styles.column2}>
          <Text style={[styles.lineItemsHeaderCell, { textAlign: 'center' }]}>
            Quantity
          </Text>
        </View>
        <View style={styles.column2}>
          <Text style={[styles.lineItemsHeaderCell, { textAlign: 'center' }]}>
            Rate ({currencySymbol})
          </Text>
        </View>
        <View style={styles.column2}>
          <Text style={[styles.lineItemsHeaderCell, { textAlign: 'right' }]}>
            Amount ({currencySymbol})
          </Text>
        </View>
      </View>
      {items.map((item, index) => (
        <View
          key={index}
          style={
            index < items.length - 1
              ? styles.lineItemRow
              : [styles.lineItemRow, { borderBottomWidth: 0 }]
          }
          wrap={false}
        >
          <View style={styles.column6}>
            <Text>{item.description}</Text>
          </View>
          <View style={styles.column2}>
            <Text style={{ textAlign: 'center' }}>{item.quantity}</Text>
          </View>
          <View style={styles.column2}>
            <Text style={{ textAlign: 'center' }}>
              {formatCurrency(item.rate)}
            </Text>
          </View>
          <View style={styles.column2}>
            <Text style={{ textAlign: 'right' }}>
              {formatCurrency(item.quantity * item.rate)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}
