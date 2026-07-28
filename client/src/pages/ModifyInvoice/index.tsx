import { useNavigate } from 'react-router'

import { Box, Button, GoBackButton, Stack } from '@lifeforge/ui'

import InvoiceEditorProvider, {
  useInvoiceEditor
} from './providers/InvoiceEditorProvider'
import Header from './sections/HeaderSection'
import LineItemsSection from './sections/LineItemsSection'
import PaymentInfoAndNotesSection from './sections/PaymentInfoAndNotesSection'
import TopInfoSection from './sections/TopInfoSection'
import TotalSection from './sections/TotalSection'

function ModifyInvoiceContent() {
  const navigate = useNavigate()
  const { isEditMode, handleSubmit, isLoading } = useInvoiceEditor()

  return (
    <>
      <GoBackButton
        onClick={() => navigate('/melvinchia3636--invoice-maker')}
      />
      <Header />
      <Stack gap="lg" pb="lg" width="100%">
        <TopInfoSection />
        <LineItemsSection />
        <Stack direction={{ base: 'column', md: 'row' }} gap="lg" width="100%">
          <Box flex="1" minWidth="0">
            <PaymentInfoAndNotesSection />
          </Box>
          <Box flex="1" minWidth="0">
            <TotalSection />
          </Box>
        </Stack>
        <Button
          display="flex"
          icon={isEditMode ? 'tabler:device-floppy' : 'tabler:plus'}
          loading={isLoading}
          onClick={handleSubmit}
        >
          {isEditMode ? 'Save Invoice' : 'Create Invoice'}
        </Button>
      </Stack>
    </>
  )
}

export default function ModifyInvoice() {
  return (
    <InvoiceEditorProvider>
      <ModifyInvoiceContent />
    </InvoiceEditorProvider>
  )
}
