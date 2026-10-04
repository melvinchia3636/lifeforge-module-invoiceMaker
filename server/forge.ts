import { createForgeContractBuilder } from '@lifeforge/server-utils'

import * as schema from './schema.drizzle'

export type InvoiceMakerSchema = typeof schema

const forge = createForgeContractBuilder({ schema })

export default forge
