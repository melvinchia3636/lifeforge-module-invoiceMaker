import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as clientsRoutes from './routes/clients'
import * as invoicesRoutes from './routes/invoices'
import * as itemsRoutes from './routes/items'
import * as receiptItemsRoutes from './routes/receiptItems'
import * as receiptsRoutes from './routes/receipts'
import * as settingsRoutes from './routes/settings'

const routes = forgeRouter({
  invoices: invoicesRoutes,
  items: itemsRoutes,
  receipts: receiptsRoutes,
  receiptItems: receiptItemsRoutes,
  clients: clientsRoutes,
  settings: settingsRoutes
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
