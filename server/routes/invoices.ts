import z from 'zod'

import forge from '../forge'

const InvoiceListSchema = z.object({
  status: z
    .enum(['draft', 'sent', 'paid', 'overdue', 'cancelled'])
    .optional(),
  clientId: z.string().optional()
})

const CreateInvoiceBodySchema = z.object({
  bill_to: z.string().optional(),
  date: z.string(),
  due_date: z.string(),
  payment_terms: z.string().optional(),
  po_number: z.string().optional(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
  shipping_address: z.string().optional(),
  tax_type: z.enum(['rate', 'fixed']).optional(),
  tax_amount: z.number().optional(),
  discount_type: z.enum(['rate', 'fixed']).optional(),
  discount_amount: z.number().optional(),
  shipping_amount: z.number().optional(),
  amount_paid: z.number().optional(),
  notes: z.string().optional(),
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

const UpdateInvoiceBodySchema = z.object({
  invoice_number: z.string().optional(),
  bill_to: z.string().optional(),
  date: z.string().optional(),
  due_date: z.string().optional(),
  payment_terms: z.string().optional(),
  po_number: z.string().optional(),
  status: z
    .enum(['draft', 'sent', 'paid', 'overdue', 'cancelled'])
    .optional(),
  shipping_address: z.string().optional(),
  tax_type: z.enum(['rate', 'fixed']).optional(),
  tax_amount: z.number().optional(),
  discount_type: z.enum(['rate', 'fixed']).optional(),
  discount_amount: z.number().optional(),
  shipping_amount: z.number().optional(),
  amount_paid: z.number().optional(),
  notes: z.string().optional(),
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
    description: 'List all invoices',
    input: {
      query: InvoiceListSchema
    },
    output: {
      OK: z.any()
    }
  })
  .callback(async ({ pb, query, response }) => {
    let builder = pb.getFullList
      .collection('invoices_aggregated')
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

    return response.ok(await builder.execute())
  })

export const getById = forge
  .query({
    description: 'Get invoice by ID with items',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'invoices' }
    },
    output: {
      OK: z.any(),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const invoice = await pb.getOne
      .collection('invoices')
      .id(id)
      .expand({
        bill_to: 'clients'
      })
      .execute()

    const items = await pb.getFullList
      .collection('items')
      .filter([{ field: 'invoice', operator: '=', value: id }])
      .sort(['order'])
      .execute()

    return response.ok({ ...invoice, items })
  })

export const create = forge
  .mutation({
    description: 'Create a new invoice',
    input: {
      body: CreateInvoiceBodySchema
    },
    output: {
      CREATED: z.any()
    }
  })
  .callback(async ({ pb, body, response }) => {
    const { items, ...invoiceData } = body

    const settings = await pb.getFullList.collection('settings').execute()

    let invoiceNumber = '001'

    if (settings.length > 0) {
      const prefix = settings[0].invoice_prefix || ''

      const nextNum = settings[0].next_invoice_number || 1

      invoiceNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await pb.update
        .collection('settings')
        .id(settings[0].id)
        .data({ next_invoice_number: nextNum + 1 })
        .execute()
    }

    const invoice = await pb.create
      .collection('invoices')
      .data({
        ...invoiceData,
        invoice_number: invoiceNumber
      })
      .execute()

    if (items && items.length > 0) {
      await Promise.all(
        items.map(item =>
          pb.create
            .collection('items')
            .data({
              ...item,
              invoice: invoice.id
            })
            .execute()
        )
      )
    }

    return response.created(invoice)
  })

export const update = forge
  .mutation({
    description: 'Update an existing invoice',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: UpdateInvoiceBodySchema
    },
    existenceCheck: {
      query: { id: 'invoices' }
    },
    output: {
      OK: z.any(),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, body, response }) => {
    const { items, ...invoiceData } = body

    const invoice = await pb.update
      .collection('invoices')
      .id(id)
      .data(invoiceData)
      .execute()

    if (items !== undefined) {
      const existingItems = await pb.getFullList
        .collection('items')
        .filter([{ field: 'invoice', operator: '=', value: id }])
        .execute()

      const existingIds = new Set(existingItems.map(item => item.id))

      const newItemIds = new Set(
        items.filter(item => item.id).map(item => item.id)
      )

      const toDelete = existingItems.filter(item => !newItemIds.has(item.id))

      await Promise.all(
        toDelete.map(item =>
          pb.delete.collection('items').id(item.id).execute()
        )
      )

      await Promise.all(
        items.map(item => {
          if (item.id && existingIds.has(item.id)) {
            return pb.update
              .collection('items')
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
              .collection('items')
              .data({
                invoice: id,
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

    return response.ok(invoice)
  })

export const remove = forge
  .mutation({
    description: 'Delete an invoice',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'invoices' }
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    await pb.delete.collection('invoices').id(id).execute()

    return response.noContent()
  })

export const duplicate = forge
  .mutation({
    description: 'Duplicate an existing invoice',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    existenceCheck: {
      query: { id: 'invoices' }
    },
    output: {
      CREATED: z.any(),
      NOT_FOUND: true
    }
  })
  .callback(async ({ pb, query: { id }, response }) => {
    const original = await pb.getOne.collection('invoices').id(id).execute()

    const originalItems = await pb.getFullList
      .collection('items')
      .filter([{ field: 'invoice', operator: '=', value: id }])
      .sort(['order'])
      .execute()

    const settings = await pb.getFullList.collection('settings').execute()

    let invoiceNumber = '001'

    if (settings.length > 0) {
      const prefix = settings[0].invoice_prefix || ''

      const nextNum = settings[0].next_invoice_number || 1

      invoiceNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await pb.update
        .collection('settings')
        .id(settings[0].id)
        .data({ next_invoice_number: nextNum + 1 })
        .execute()
    }

    const newInvoice = await pb.create
      .collection('invoices')
      .data({
        invoice_number: invoiceNumber,
        bill_to: original.bill_to,
        date: new Date().toISOString(),
        due_date: original.due_date,
        payment_terms: original.payment_terms,
        po_number: '',
        status: 'draft',
        shipping_address: original.shipping_address,
        tax_type: original.tax_type,
        tax_amount: original.tax_amount,
        discount_type: original.discount_type,
        discount_amount: original.discount_amount,
        shipping_amount: original.shipping_amount,
        amount_paid: 0,
        notes: original.notes
      })
      .execute()

    await Promise.all(
      originalItems.map(item =>
        pb.create
          .collection('items')
          .data({
            invoice: newInvoice.id,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            order: item.order
          })
          .execute()
      )
    )

    return response.created(newInvoice)
  })
