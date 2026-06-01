import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

export const listByInvoice = forge
  .query({
    description: 'List all items for an invoice',
    input: {
      query: z.object({
        invoiceId: z.string()
      })
    },
    existenceCheck: {
      query: { invoiceId: 'invoices' }
    },
    output: {
      OK: z.array(schemas.items),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { invoiceId }, response }) =>
    response.ok(
      await pb.getFullList
        .collection('items')
        .filter([{ field: 'invoice', operator: '=', value: invoiceId }])
        .sort(['order'])
        .execute()
    )
  )

export const create = forge
  .mutation({
    description: 'Create a new line item',
    input: {
      body: schemas.items
    },
    existenceCheck: {
      body: { invoice: 'invoices' }
    },
    output: {
      CREATED: schemas.items,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, body, response }) =>
    response.created(await pb.create.collection('items').data(body).execute())
  )

export const update = forge
  .mutation({
    description: 'Update an existing line item',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: schemas.items.partial()
    },
    existenceCheck: {
      query: { id: 'items' }
    },
    output: {
      OK: schemas.items,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, body, response }) =>
    response.ok(await pb.update.collection('items').id(id).data(body).execute())
  )

export const remove = forge
  .mutation({
    description: 'Delete a line item',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'items' }
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    await pb.delete.collection('items').id(id).execute()

    return response.noContent()
  })

export const reorder = forge
  .mutation({
    description: 'Reorder line items',
    input: {
      body: z.object({
        invoiceId: z.string(),
        itemIds: z.array(z.string())
      })
    },
    existenceCheck: {
      body: { invoiceId: 'invoices' }
    },
    output: {
      OK: z.object({ success: z.boolean() }),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, body: { itemIds }, response }) => {
    const updates = itemIds.map((id, index) =>
      pb.update.collection('items').id(id).data({ order: index }).execute()
    )

    await Promise.all(updates)

    return response.ok({ success: true })
  })
