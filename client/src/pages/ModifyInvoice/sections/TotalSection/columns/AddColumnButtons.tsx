import { Button, Flex } from '@lifeforge/ui'

import { useInvoiceEditor } from '@/pages/ModifyInvoice/providers/InvoiceEditorProvider'

function AddColumnButtons() {
  const {
    showDiscount,
    setShowDiscount,
    showTax,
    setShowTax,
    showShipping,
    setShowShipping,
    updateField
  } = useInvoiceEditor()

  return (
    <Flex gap="md" justify="center" wrap="wrap">
      {(
        [
          [
            'discount',
            showDiscount,
            setShowDiscount,
            () => updateField('discount_type', 'rate')
          ],
          ['tax', showTax, setShowTax, () => updateField('tax_type', 'rate')],
          ['shipping', showShipping, setShowShipping]
        ] as const
      ).map(
        ([type, show, setShow, onClick]) =>
          !show && (
            <Button
              key={type}
              flex="1"
              icon="tabler:plus"
              variant="tertiary"
              onClick={() => {
                setShow(true)
                onClick?.()
              }}
            >
              {`inputs.${type}`}
            </Button>
          )
      )}
    </Flex>
  )
}

export default AddColumnButtons
