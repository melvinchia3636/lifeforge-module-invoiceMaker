import { useRef } from 'react'
import { useParams } from 'react-router'

import DocumentViewHeader from '@/components/DocumentViewHeader'
import InvoicePreview from './components/InvoicePreview'
import InvoiceViewerProvider, {
  useInvoiceViewer
} from './providers/InvoiceViewerProvider'

function ViewInvoiceContent() {
  const invoiceRef = useRef<HTMLDivElement>(null)
  const { invoice } = useInvoiceViewer()

  return (
    <>
      <DocumentViewHeader data={invoice} contentRef={invoiceRef} />
      <InvoicePreview ref={invoiceRef} />
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
