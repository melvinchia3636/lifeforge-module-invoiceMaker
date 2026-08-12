import { useNavigate } from 'react-router'

import { Button, GoBackButton, Stack } from '@lifeforge/ui'

import LineItemsForm from '@/components/form/LineItemsForm'

import ReceiptEditorProvider, {
  useReceiptEditor
} from './providers/ReceiptEditorProvider'
import ReceiptHeaderSection from './sections/ReceiptHeaderSection'
import ReceiptTopInfoForm from './sections/ReceiptTopInfoForm'
import ReceiptTotalsAndNotesForm from './sections/ReceiptTotalsAndNotesForm'

function ModifyReceiptContent() {
  const navigate = useNavigate()
  const {
    isEditMode,
    handleSubmit,
    isLoading,
    formData,
    currencySymbol,
    updateLineItem,
    removeLineItem,
    addLineItem
  } = useReceiptEditor()

  return (
    <>
      <GoBackButton
        onClick={() => navigate('/melvinchia3636--invoice-maker/receipt')}
      />
      <ReceiptHeaderSection />
      <Stack gap="lg" pb="lg" width="100%">
        <ReceiptTopInfoForm />
        <LineItemsForm
          currencySymbol={currencySymbol}
          items={formData.items}
          onAddLineItem={addLineItem}
          onRemoveLineItem={removeLineItem}
          onUpdateLineItem={updateLineItem}
        />
        <ReceiptTotalsAndNotesForm />
        <Button
          display="flex"
          icon={isEditMode ? 'tabler:device-floppy' : 'tabler:plus'}
          loading={isLoading}
          onClick={handleSubmit}
        >
          {isEditMode ? 'Save Receipt' : 'Create Receipt'}
        </Button>
      </Stack>
    </>
  )
}

export default function ModifyReceipt() {
  return (
    <ReceiptEditorProvider>
      <ModifyReceiptContent />
    </ReceiptEditorProvider>
  )
}
