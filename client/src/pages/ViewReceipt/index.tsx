import { useParams } from 'react-router'

import DocumentViewHeader from '@/components/DocumentViewHeader'
import { ReceiptPdf } from '@/components/pdf/documents/ReceiptPdf'
import DocumentPdfPreview from '@/components/pdf/DocumentPdfPreview'
import ReceiptViewerProvider, {
  useReceiptViewer
} from './providers/ReceiptViewerProvider'

function ViewReceiptContent() {
  const { receipt, settings, currencySymbol, calculations } = useReceiptViewer()

  return (
    <>
      <DocumentViewHeader
        calculations={calculations}
        currencySymbol={currencySymbol}
        data={receipt}
        settings={settings}
      />
      <DocumentPdfPreview logoKey={settings.default_logo}>
        {logoSrc => (
          <ReceiptPdf
            calculations={calculations}
            currencySymbol={currencySymbol}
            logoSrc={logoSrc}
            receipt={receipt}
            settings={settings}
          />
        )}
      </DocumentPdfPreview>
    </>
  )
}

export default function ViewReceipt() {
  const { id } = useParams<{ id: string }>()

  return (
    <ReceiptViewerProvider receiptId={id!}>
      <ViewReceiptContent />
    </ReceiptViewerProvider>
  )
}
