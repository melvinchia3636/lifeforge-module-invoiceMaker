import { Box, CurrencyInput, Text } from '@lifeforge/ui'

import { useInvoiceEditor } from '../../../providers/InvoiceEditorProvider'
import BaseColumn from './BaseColumn'

function ShippingColumn() {
  const { formData, currencySymbol, updateField, setShowShipping } =
    useInvoiceEditor()

  return (
    <BaseColumn
      type="shipping"
      onHide={() => {
        setShowShipping(false)
        updateField('shipping_amount', 0)
      }}
    >
      <Text color="muted">{currencySymbol}</Text>
      <Box width="6rem">
        <CurrencyInput
          value={formData.shipping_amount}
          variant="plain"
          onChange={val => updateField('shipping_amount', val || 0)}
        />
      </Box>
    </BaseColumn>
  )
}

export default ShippingColumn
