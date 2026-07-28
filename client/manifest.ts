import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModule({
  routes: {
    '/': lazy(() => import('@')),
    '/view/:id': lazy(() => import('@/pages/ViewInvoice')),
    '/modify': lazy(() => import('@/pages/ModifyInvoice')),
    '/modify/:id': lazy(() => import('@/pages/ModifyInvoice'))
  },
  contract
})

export default manifest

export { forgeAPI }
