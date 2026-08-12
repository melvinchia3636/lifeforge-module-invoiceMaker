import z from 'zod'

import forge from '../forge'
import schemas from '../schema'

const ReceiptListSchema = z.object({
  status: z.enum(['draft', 'issued', 'cancelled']).optional(),
  clientId: z.string().optional(),
  search: z.string().optional()
})

const CreateReceiptBodySchema = z.object({
  bill_to: z.string().optional(),
  date: z.string(),
  payment_method: z.string().optional(),
  payment_terms: z.string().optional(),
  reference_number: z.string().optional(),
  status: z.enum(['draft', 'issued', 'cancelled']),
  shipping_address: z.string().optional(),
  tax_type: z.enum(['rate', 'fixed']).optional(),
  tax_amount: z.number().optional(),
  discount_type: z.enum(['rate', 'fixed']).optional(),
  discount_amount: z.number().optional(),
  shipping_amount: z.number().optional(),
  amount_paid: z.number().optional(),
  items: z
    .array(
      z.object({
        description: z.string(),
        quantity: z.number(),
        rate: z.number(),
        order: z.number()
      })
    )
    .optional()
})

const UpdateReceiptBodySchema = z.object({
  receipt_number: z.string().optional(),
  bill_to: z.string().optional(),
  date: z.string().optional(),
  payment_method: z.string().optional(),
  payment_terms: z.string().optional(),
  reference_number: z.string().optional(),
  status: z.enum(['draft', 'issued', 'cancelled']).optional(),
  shipping_address: z.string().optional(),
  tax_type: z.enum(['rate', 'fixed']).optional(),
  tax_amount: z.number().optional(),
  discount_type: z.enum(['rate', 'fixed']).optional(),
  discount_amount: z.number().optional(),
  shipping_amount: z.number().optional(),
  amount_paid: z.number().optional(),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        description: z.string(),
        quantity: z.number(),
        rate: z.number(),
        order: z.number()
      })
    )
    .optional()
})

export const list = forge
  .query({
    description: 'List all receipts',
    input: {
      query: ReceiptListSchema
    },
    output: {
      OK: z.array(
        schemas.receipts_aggregated
          .extend({
            expand: z
              .object({
                bill_to: schemas.clients.optional()
              })
              .optional()
          })
          .and(
            z.object({
              subtotal: z.number()
            })
          )
      )
    }
  })
  .callback(async ({ pb, query, response }) => {
    let builder = pb.getFullList
      .collection('receipts_aggregated')
      .sort(['-date', '-created'])
      .expand({
        bill_to: 'clients'
      })

    if (query?.status) {
      builder = builder.filter([
        { field: 'status', operator: '=', value: query.status }
      ])
    }

    if (query?.clientId) {
      builder = builder.filter([
        { field: 'bill_to', operator: '=', value: query.clientId }
      ])
    }

    if (query?.search) {
      builder = builder.filter([
        {
          combination: '||',
          filters: [
            { field: 'receipt_number', operator: '~', value: query.search },
            { field: 'bill_to.name', operator: '~', value: query.search }
          ]
        }
      ])
    }

    return response.ok(await builder.execute())
  })

export const getById = forge
  .query({
    description: 'Get receipt by ID with items',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'receipts' }
    },
    output: {
      OK: schemas.receipts.extend({
        items: z.array(schemas.receipt_items),
        expand: z
          .object({
            bill_to: schemas.clients.optional()
          })
          .optional()
      }),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const receipt = await pb.getOne
      .collection('receipts')
      .id(id)
      .expand({
        bill_to: 'clients'
      })
      .execute()

    const items = await pb.getFullList
      .collection('receipt_items')
      .filter([{ field: 'receipt', operator: '=', value: id }])
      .sort(['order'])
      .execute()

    return response.ok({ ...receipt, items })
  })

export const create = forge
  .mutation({
    description: 'Create a new receipt',
    input: {
      body: CreateReceiptBodySchema
    },
    output: {
      CREATED: schemas.receipts
    }
  })
  .callback(async ({ pb, body, response }) => {
    const { items, ...receiptData } = body

    const settings = await pb.getFullList.collection('settings').execute()

    let receiptNumber = 'REC-001'

    if (settings.length > 0) {
      const prefix = settings[0].receipt_prefix || 'REC-'
      const nextNum = settings[0].next_receipt_number || 1

      receiptNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await pb.update
        .collection('settings')
        .id(settings[0].id)
        .data({ next_receipt_number: nextNum + 1 })
        .execute()
    }

    const receipt = await pb.create
      .collection('receipts')
      .data({
        ...receiptData,
        receipt_number: receiptNumber
      })
      .execute()

    if (items && items.length > 0) {
      await Promise.all(
        items.map(item =>
          pb.create
            .collection('receipt_items')
            .data({
              ...item,
              receipt: receipt.id
            })
            .execute()
        )
      )
    }

    return response.created(receipt)
  })

export const update = forge
  .mutation({
    description: 'Update an existing receipt',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: UpdateReceiptBodySchema
    },
    existenceCheck: {
      query: { id: 'receipts' }
    },
    output: {
      OK: schemas.receipts,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, body, response }) => {
    const { items, ...receiptData } = body

    const receipt = await pb.update
      .collection('receipts')
      .id(id)
      .data(receiptData)
      .execute()

    if (items !== undefined) {
      const existingItems = await pb.getFullList
        .collection('receipt_items')
        .filter([{ field: 'receipt', operator: '=', value: id }])
        .execute()

      const existingIds = new Set(existingItems.map(item => item.id))
      const newItemIds = new Set(
        items.filter(item => item.id).map(item => item.id)
      )

      const toDelete = existingItems.filter(item => !newItemIds.has(item.id))

      await Promise.all(
        toDelete.map(item =>
          pb.delete.collection('receipt_items').id(item.id).execute()
        )
      )

      await Promise.all(
        items.map(item => {
          if (item.id && existingIds.has(item.id)) {
            return pb.update
              .collection('receipt_items')
              .id(item.id)
              .data({
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
                order: item.order
              })
              .execute()
          } else {
            return pb.create
              .collection('receipt_items')
              .data({
                receipt: id,
                description: item.description,
                quantity: item.quantity,
                rate: item.rate,
                order: item.order
              })
              .execute()
          }
        })
      )
    }

    return response.ok(receipt)
  })

export const remove = forge
  .mutation({
    description: 'Delete a receipt',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'receipts' }
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    await pb.delete.collection('receipts').id(id).execute()

    return response.noContent()
  })

export const duplicate = forge
  .mutation({
    description: 'Duplicate an existing receipt',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'receipts' }
    },
    output: {
      CREATED: z.null(),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const original = await pb.getOne.collection('receipts').id(id).execute()

    const originalItems = await pb.getFullList
      .collection('receipt_items')
      .filter([{ field: 'receipt', operator: '=', value: id }])
      .sort(['order'])
      .execute()

    const settings = await pb.getFullList.collection('settings').execute()

    let receiptNumber = 'REC-001'

    if (settings.length > 0) {
      const prefix = settings[0].receipt_prefix || 'REC-'
      const nextNum = settings[0].next_receipt_number || 1

      receiptNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await pb.update
        .collection('settings')
        .id(settings[0].id)
        .data({ next_receipt_number: nextNum + 1 })
        .execute()
    }

    const newReceipt = await pb.create
      .collection('receipts')
      .data({
        receipt_number: receiptNumber,
        bill_to: original.bill_to,
        date: new Date().toISOString(),
        payment_method: original.payment_method,
        payment_terms: original.payment_terms,
        reference_number: '',
        status: 'draft',
        shipping_address: original.shipping_address,
        tax_type: original.tax_type,
        tax_amount: original.tax_amount,
        discount_type: original.discount_type,
        discount_amount: original.discount_amount,
        shipping_amount: original.shipping_amount,
        amount_paid: 0
      })
      .execute()

    await Promise.all(
      originalItems.map(item =>
        pb.create
          .collection('receipt_items')
          .data({
            receipt: newReceipt.id,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            order: item.order
          })
          .execute()
      )
    )

    return response.created(null)
  })
