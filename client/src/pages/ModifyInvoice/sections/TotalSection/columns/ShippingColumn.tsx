import { CurrencyInput } from '@lifeforge/ui'

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
      <span className="text-bg-500">{currencySymbol}</span>
      <CurrencyInput
        className="w-24"
        placeholder="0.00"
        value={formData.shipping_amount}
        variant="plain"
        onChange={val => updateField('shipping_amount', val || 0)}
      />
    </BaseColumn>
  )
}

export default ShippingColumn
