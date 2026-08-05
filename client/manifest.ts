import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModule({
  subsection: [
    { label: 'Invoices', icon: 'tabler:file-invoice', path: '' },
    { label: 'Receipts', icon: 'tabler:receipt', path: 'receipts' }
  ],
  routes: {
    '/': lazy(() => import('@')),
    '/view/:id': lazy(() => import('@/pages/ViewInvoice')),
    '/modify': lazy(() => import('@/pages/ModifyInvoice')),
    '/modify/:id': lazy(() => import('@/pages/ModifyInvoice')),
    '/receipts': lazy(() => import('@/pages/Receipts')),
    '/receipts/view/:id': lazy(() => import('@/pages/ViewReceipt')),
    '/receipts/modify': lazy(() => import('@/pages/ModifyReceipt')),
    '/receipts/modify/:id': lazy(() => import('@/pages/ModifyReceipt'))
  },
  contract
})

export default manifest

export { forgeAPI }
