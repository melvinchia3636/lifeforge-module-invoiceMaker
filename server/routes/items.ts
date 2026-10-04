import { asc, eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { invoiceMakerInvoices, invoiceMakerItems } from '../schema.drizzle'

const itemDto = createSelectSchema(invoiceMakerItems)

const itemInputDto = z.object({
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
  order: z.number()
})

export const listByInvoice = forge
  .query({
    description: 'List all items for an invoice',
    input: {
      query: z.object({
        invoiceId: forge.existsIn(z.string(), invoiceMakerInvoices)
      })
    },
    output: {
      OK: z.array(itemDto)
    }
  })
  .callback(async ({ db, query: { invoiceId }, response }) => {
    const rows = await db
      .select()
      .from(invoiceMakerItems)
      .where(eq(invoiceMakerItems.invoice, invoiceId))
      .orderBy(asc(invoiceMakerItems.order))

    return response.ok(rows)
  })

export const create = forge
  .mutation({
    description: 'Create a new line item',
    input: {
      body: itemInputDto.extend({
        invoice: forge.existsIn(z.string(), invoiceMakerInvoices)
      })
    },
    output: {
      CREATED: itemDto
    }
  })
  .callback(async ({ db, body, response }) => {
    const [created] = await db.insert(invoiceMakerItems).values(body).returning()

    return response.created(created)
  })

export const update = forge
  .mutation({
    description: 'Update an existing line item',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerItems)
      }),
      body: itemInputDto.partial()
    },
    output: {
      OK: itemDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const [updated] = await db
      .update(invoiceMakerItems)
      .set(body)
      .where(eq(invoiceMakerItems.id, id))
      .returning()

    return response.ok(updated)
  })

export const remove = forge
  .mutation({
    description: 'Delete a line item',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerItems)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    await db.delete(invoiceMakerItems).where(eq(invoiceMakerItems.id, id))

    return response.noContent()
  })

export const reorder = forge
  .mutation({
    description: 'Reorder line items',
    input: {
      body: z.object({
        invoiceId: forge.existsIn(z.string(), invoiceMakerInvoices),
        itemIds: z.array(z.string())
      })
    },
    output: {
      OK: z.object({ success: z.boolean() })
    }
  })
  .callback(async ({ db, body: { itemIds }, response }) => {
    for (const [index, id] of itemIds.entries()) {
      await db
        .update(invoiceMakerItems)
        .set({ order: index })
        .where(eq(invoiceMakerItems.id, id))
    }

    return response.ok({ success: true })
  })
