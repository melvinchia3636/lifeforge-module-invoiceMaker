import { desc, eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { invoiceMakerClients, invoiceMakerInvoices } from '../schema.drizzle'

const clientDto = createSelectSchema(invoiceMakerClients)

const clientInputDto = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string()
})

export const list = forge
  .query({
    description: 'List all clients',
    output: {
      OK: z.array(clientDto)
    }
  })
  .callback(async ({ db, response }) => {
    const rows = await db
      .select()
      .from(invoiceMakerClients)
      .orderBy(desc(invoiceMakerClients.created))

    return response.ok(rows)
  })

export const getById = forge
  .query({
    description: 'Get client by ID',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerClients)
      })
    },
    output: {
      OK: clientDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const row = (await db.query.clients.findFirst({ where: { id } }))!

    return response.ok(row)
  })

export const create = forge
  .mutation({
    description: 'Create a new client',
    input: {
      body: clientInputDto
    },
    output: {
      CREATED: clientDto
    }
  })
  .callback(async ({ db, body, response }) => {
    const [created] = await db
      .insert(invoiceMakerClients)
      .values(body)
      .returning()

    return response.created(created)
  })

export const update = forge
  .mutation({
    description: 'Update an existing client',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerClients)
      }),
      body: clientInputDto
    },
    output: {
      OK: clientDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const [updated] = await db
      .update(invoiceMakerClients)
      .set({ ...body, updated: new Date() })
      .where(eq(invoiceMakerClients.id, id))
      .returning()

    return response.ok(updated)
  })

export const remove = forge
  .mutation({
    description: 'Delete a client',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerClients)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const invoices = await db
      .select({ id: invoiceMakerInvoices.id })
      .from(invoiceMakerInvoices)
      .where(eq(invoiceMakerInvoices.bill_to, id))

    if (invoices.length > 0) {
      return response.conflict()
    }

    await db.delete(invoiceMakerClients).where(eq(invoiceMakerClients.id, id))

    return response.noContent()
  })
