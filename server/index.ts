import { forgeRouter } from '@lifeforge/server-utils'

import * as clientsRoutes from './routes/clients'
import * as invoicesRoutes from './routes/invoices'
import * as itemsRoutes from './routes/items'
import * as settingsRoutes from './routes/settings'

export default forgeRouter({
  invoices: invoicesRoutes,
  items: itemsRoutes,
  clients: clientsRoutes,
  settings: settingsRoutes
})
