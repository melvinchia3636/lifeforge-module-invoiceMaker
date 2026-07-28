import { Box, Button, NumberInput, Text } from '@lifeforge/ui'

import { useInvoiceEditor } from '../../../providers/InvoiceEditorProvider'
import BaseColumn from './BaseColumn'

function TaxColumn() {
  const { formData, currencySymbol, updateField, setShowTax } =
    useInvoiceEditor()

  return (
    <BaseColumn
      type="tax"
      onHide={() => {
        setShowTax(false)
        updateField('tax_amount', 0)
        updateField('tax_type', '')
      }}
    >
      {formData.tax_type === 'fixed' && (
        <Text color="muted">{currencySymbol}</Text>
      )}
      <Box width="6rem">
        <NumberInput
          icon=""
          label=""
          min={0}
          value={formData.tax_amount}
          variant="plain"
          onChange={val => updateField('tax_amount', val || 0)}
        />
      </Box>
      {formData.tax_type === 'rate' && <Text color="muted">%</Text>}
      <Button
        icon="tabler:exchange"
        variant="secondary"
        onClick={() => {
          updateField(
            'tax_type',
            formData.tax_type === 'rate' ? 'fixed' : 'rate'
          )
        }}
      />
    </BaseColumn>
  )
}

export default TaxColumn
