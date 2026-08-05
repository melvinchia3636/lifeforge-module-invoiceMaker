import { useRef } from 'react'
import { useParams } from 'react-router'

import ReceiptPreview from './components/ReceiptPreview'
import ReceiptViewHeader from './components/ReceiptViewHeader'
import ReceiptViewerProvider from './providers/ReceiptViewerProvider'

function ViewReceiptContent() {
  const receiptRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ReceiptViewHeader receiptRef={receiptRef} />
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
