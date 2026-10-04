import { asc, eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import {
  invoiceMakerReceiptItems,
  invoiceMakerReceipts
} from '../schema.drizzle'

const receiptItemDto = createSelectSchema(invoiceMakerReceiptItems)

const receiptItemInputDto = z.object({
  description: z.string(),
  quantity: z.number(),
  rate: z.number(),
  order: z.number()
})

export const listByReceipt = forge
  .query({
    description: 'List all items for a receipt',
    input: {
      query: z.object({
        receiptId: forge.existsIn(z.string(), invoiceMakerReceipts)
      })
    },
    output: {
      OK: z.array(receiptItemDto)
    }
  })
  .callback(async ({ db, query: { receiptId }, response }) => {
    const rows = await db
      .select()
      .from(invoiceMakerReceiptItems)
      .where(eq(invoiceMakerReceiptItems.receipt, receiptId))
      .orderBy(asc(invoiceMakerReceiptItems.order))

    return response.ok(rows)
  })

export const create = forge
  .mutation({
    description: 'Create a new line item for a receipt',
    input: {
      body: receiptItemInputDto.extend({
        receipt: forge.existsIn(z.string(), invoiceMakerReceipts)
      })
    },
    output: {
      CREATED: receiptItemDto
    }
  })
  .callback(async ({ db, body, response }) => {
    const [created] = await db
      .insert(invoiceMakerReceiptItems)
      .values(body)
      .returning()

    return response.created(created)
  })

export const update = forge
  .mutation({
    description: 'Update an existing line item for a receipt',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceiptItems)
      }),
      body: receiptItemInputDto.partial()
    },
    output: {
      OK: receiptItemDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const [updated] = await db
      .update(invoiceMakerReceiptItems)
      .set(body)
      .where(eq(invoiceMakerReceiptItems.id, id))
      .returning()

    return response.ok(updated)
  })

export const remove = forge
  .mutation({
    description: 'Delete a line item from a receipt',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceiptItems)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    await db
      .delete(invoiceMakerReceiptItems)
      .where(eq(invoiceMakerReceiptItems.id, id))

    return response.noContent()
  })

export const reorder = forge
  .mutation({
    description: 'Reorder receipt line items',
    input: {
      body: z.object({
        receiptId: forge.existsIn(z.string(), invoiceMakerReceipts),
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
        .update(invoiceMakerReceiptItems)
        .set({ order: index })
        .where(eq(invoiceMakerReceiptItems.id, id))
    }

    return response.ok({ success: true })
  })
