import { Flex } from '@lifeforge/ui'

import TotalsForm from '@/components/form/TotalsForm'

import { useReceiptEditor } from '../providers/ReceiptEditorProvider'

function ReceiptTotalsAndNotesForm() {
  const {
    formData,
    currencySymbol,
    updateField,
    showDiscount,
    setShowDiscount,
    showTax,
    setShowTax,
    showShipping,
    setShowShipping,
    finalNumbers
  } = useReceiptEditor()

  return (
    <Flex justify="end" width="100%">
      <TotalsForm
        calculations={finalNumbers}
        currencySymbol={currencySymbol}
        formData={formData}
        setShowDiscount={setShowDiscount}
        setShowShipping={setShowShipping}
        setShowTax={setShowTax}
        showDiscount={showDiscount}
        showShipping={showShipping}
        showTax={showTax}
        updateField={updateField}
      />
    </Flex>
  )
}

export default ReceiptTotalsAndNotesForm
