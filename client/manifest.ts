import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Invoice Maker',
  icon: 'tabler:invoice',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Finance'
} satisfies ModuleConfig
