import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModule({
  subsection: [
    { label: 'Invoices', icon: 'tabler:file-invoice', path: 'invoice' },
    { label: 'Receipts', icon: 'tabler:receipt', path: 'receipt' }
  ],
  routes: {
    '/': lazy(() => import('@/pages')),
    '/invoice': lazy(() => import('@/pages/Invoices')),
    '/invoice/view/:id': lazy(() => import('@/pages/ViewInvoice')),
    '/invoice/modify': lazy(() => import('@/pages/ModifyInvoice')),
    '/invoice/modify/:id': lazy(() => import('@/pages/ModifyInvoice')),
    '/receipt': lazy(() => import('@/pages/Receipts')),
    '/receipt/view/:id': lazy(() => import('@/pages/ViewReceipt')),
    '/receipt/modify': lazy(() => import('@/pages/ModifyReceipt')),
    '/receipt/modify/:id': lazy(() => import('@/pages/ModifyReceipt'))
  },
  contract
})

export default manifest

export { forgeAPI }
