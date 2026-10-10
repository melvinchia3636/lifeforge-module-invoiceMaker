import { useParams } from 'react-router'

import DocumentViewHeader from '@/components/DocumentViewHeader'
import { InvoicePdf } from '@/components/pdf/documents/InvoicePdf'
import DocumentPdfPreview from '@/components/pdf/DocumentPdfPreview'
import InvoiceViewerProvider, {
  useInvoiceViewer
} from './providers/InvoiceViewerProvider'

function ViewInvoiceContent() {
  const { invoice, settings, currencySymbol, calculations } = useInvoiceViewer()

  return (
    <>
      <DocumentViewHeader
        calculations={calculations}
        currencySymbol={currencySymbol}
        data={invoice}
        settings={settings}
      />
      <DocumentPdfPreview logoKey={settings.default_logo}>
        {logoSrc => (
          <InvoicePdf
            calculations={calculations}
            currencySymbol={currencySymbol}
            invoice={invoice}
            logoSrc={logoSrc}
            settings={settings}
          />
        )}
      </DocumentPdfPreview>
    </>
  )
}

export default function ViewInvoice() {
  const { id } = useParams<{ id: string }>()

  return (
    <InvoiceViewerProvider invoiceId={id!}>
      <ViewInvoiceContent />
    </InvoiceViewerProvider>
  )
}
