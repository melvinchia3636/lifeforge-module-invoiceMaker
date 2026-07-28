import { Box, Button, NumberInput, Text } from '@lifeforge/ui'

import { useInvoiceEditor } from '../../../providers/InvoiceEditorProvider'
import BaseColumn from './BaseColumn'

function DiscountColumn() {
  const { formData, currencySymbol, updateField, setShowDiscount } =
    useInvoiceEditor()

  return (
    <BaseColumn
      type="discount"
      onHide={() => {
        setShowDiscount(false)
        updateField('discount_amount', 0)
        updateField('discount_type', '')
      }}
    >
      {formData.discount_type === 'fixed' && (
        <Text color="muted">{currencySymbol}</Text>
      )}
      <Box width="6rem">
        <NumberInput
          icon=""
          label=""
          min={0}
          value={formData.discount_amount}
          variant="plain"
          onChange={val => updateField('discount_amount', val || 0)}
        />
      </Box>
      {formData.discount_type === 'rate' && <Text color="muted">%</Text>}
      <Button
        icon="tabler:exchange"
        variant="secondary"
        onClick={() => {
          updateField(
            'discount_type',
            formData.discount_type === 'rate' ? 'fixed' : 'rate'
          )
        }}
      />
    </BaseColumn>
  )
}

export default DiscountColumn
