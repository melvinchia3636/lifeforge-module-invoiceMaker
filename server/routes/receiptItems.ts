import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

export const listByReceipt = forge
  .query({
    description: 'List all items for a receipt',
    input: {
      query: z.object({
        receiptId: z.string()
      })
    },
    existenceCheck: {
      query: { receiptId: 'receipts' }
    },
    output: {
      OK: z.array(schemas.receipt_items),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { receiptId }, response }) =>
    response.ok(
      await pb.getFullList
        .collection('receipt_items')
        .filter([{ field: 'receipt', operator: '=', value: receiptId }])
        .sort(['order'])
        .execute()
    )
  )

export const create = forge
  .mutation({
    description: 'Create a new line item for a receipt',
    input: {
      body: schemas.receipt_items
    },
    existenceCheck: {
      body: { receipt: 'receipts' }
    },
    output: {
      CREATED: schemas.receipt_items,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, body, response }) =>
    response.created(
      await pb.create.collection('receipt_items').data(body).execute()
    )
  )

export const update = forge
  .mutation({
    description: 'Update an existing line item for a receipt',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: schemas.receipt_items.partial()
    },
    existenceCheck: {
      query: { id: 'receipt_items' }
    },
    output: {
      OK: schemas.receipt_items,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, body, response }) =>
    response.ok(
      await pb.update.collection('receipt_items').id(id).data(body).execute()
    )
  )

export const remove = forge
  .mutation({
    description: 'Delete a line item from a receipt',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'receipt_items' }
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    await pb.delete.collection('receipt_items').id(id).execute()

    return response.noContent()
  })

export const reorder = forge
  .mutation({
    description: 'Reorder receipt line items',
    input: {
      body: z.object({
        receiptId: z.string(),
        itemIds: z.array(z.string())
      })
    },
    existenceCheck: {
      body: { receiptId: 'receipts' }
    },
    output: {
      OK: z.object({ success: z.boolean() }),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, body: { itemIds }, response }) => {
    const updates = itemIds.map((id, index) =>
      pb.update.collection('receipt_items').id(id).data({ order: index }).execute()
    )

    await Promise.all(updates)

    return response.ok({ success: true })
  })
