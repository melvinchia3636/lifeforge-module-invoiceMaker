import TotalsForm from '@/components/form/TotalsForm'
import { useInvoiceEditor } from '../../providers/InvoiceEditorProvider'

function TotalSection() {
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
  } = useInvoiceEditor()

  return (
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
  )
}

export default TotalSection
