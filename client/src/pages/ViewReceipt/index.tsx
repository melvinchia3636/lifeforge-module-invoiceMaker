import { useRef } from 'react'
import { useParams } from 'react-router'

import DocumentViewHeader from '@/components/DocumentViewHeader'
import ReceiptPreview from './components/ReceiptPreview'
import ReceiptViewerProvider, {
  useReceiptViewer
} from './providers/ReceiptViewerProvider'

function ViewReceiptContent() {
  const receiptRef = useRef<HTMLDivElement>(null)
  const { receipt } = useReceiptViewer()

  return (
    <>
      <DocumentViewHeader data={receipt} contentRef={receiptRef} />
      <ReceiptPreview ref={receiptRef} />
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
