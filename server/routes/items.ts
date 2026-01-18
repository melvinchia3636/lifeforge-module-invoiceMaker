import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

export const listByInvoice = forge
  .query()
  .description('List all items for an invoice')
  .input({
    query: z.object({
      invoiceId: z.string()
    })
  })
  .existenceCheck('query', {
    invoiceId: 'invoices'
  })
  .callback(async ({ pb, query: { invoiceId } }) =>
    pb.getFullList
      .collection('items')
      .filter([{ field: 'invoice', operator: '=', value: invoiceId }])
      .sort(['order'])
      .execute()
  )

export const create = forge
  .mutation()
  .description('Create a new line item')
  .input({
    body: schemas.items
  })
  .existenceCheck('body', {
    invoice: 'invoices'
  })
  .statusCode(201)
  .callback(async ({ pb, body }) =>
    pb.create.collection('items').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update an existing line item')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: schemas.items.partial()
  })
  .existenceCheck('query', {
    id: 'items'
  })
  .callback(async ({ pb, query: { id }, body }) =>
    pb.update.collection('items').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a line item')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'items'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('items').id(id).execute()
  )

export const reorder = forge
  .mutation()
  .description('Reorder line items')
  .input({
    body: z.object({
      invoiceId: z.string(),
      itemIds: z.array(z.string())
    })
  })
  .existenceCheck('body', {
    invoiceId: 'invoices'
  })
  .callback(async ({ pb, body: { itemIds } }) => {
    // Update each item's order based on its position in the array
    const updates = itemIds.map((id, index) =>
      pb.update.collection('items').id(id).data({ order: index }).execute()
    )

    await Promise.all(updates)

    return { success: true }
  })
