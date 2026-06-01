import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as clientsRoutes from './routes/clients'
import * as invoicesRoutes from './routes/invoices'
import * as itemsRoutes from './routes/items'
import * as settingsRoutes from './routes/settings'

const routes = forgeRouter({
  invoices: invoicesRoutes,
  items: itemsRoutes,
  clients: clientsRoutes,
  settings: settingsRoutes
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
