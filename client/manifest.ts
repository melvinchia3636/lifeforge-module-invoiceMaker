import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Invoice Maker',
  icon: 'tabler:file-invoice',
  routes: {
    '/': lazy(() => import('@')),
    '/modify/:id?': lazy(() => import('@/pages/ModifyInvoice')),
    '/view/:id': lazy(() => import('@/pages/ViewInvoice'))
  },
  category: 'Finance'
} satisfies ModuleConfig
