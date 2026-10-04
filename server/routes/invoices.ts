import { and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import {
  invoiceMakerClients,
  invoiceMakerInvoices,
  invoiceMakerItems,
  invoiceMakerSettings
} from '../schema.drizzle'

const invoiceDto = createSelectSchema(invoiceMakerInvoices).extend({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
  tax_type: z.enum(['rate', 'fixed', '']),
  discount_type: z.enum(['rate', 'fixed', ''])
})
const clientDto = createSelectSchema(invoiceMakerClients)
const itemDto = createSelectSchema(invoiceMakerItems)

const invoiceAggregateDto = invoiceDto.extend({
  subtotal: z.number(),
  item_count: z.number(),
  calculated_tax: z.number(),
  calculated_discount: z.number(),
  calculated_shipping: z.number()
})

const invoiceListDto = invoiceAggregateDto.extend({
  expand: z
    .object({
      bill_to: clientDto.optional()
    })
    .optional()
})

const invoiceDetailDto = invoiceDto.extend({
  items: z.array(itemDto),
  expand: z
    .object({
      bill_to: clientDto.optional()
    })
    .optional()
})

const InvoiceListSchema = z.object({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  clientId: z.string().optional(),
  search: z.string().optional()
})

const invoiceBodyFields = {
  bill_to: z.string().optional(),
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
  notes: z.string().optional()
}

const lineItemsSchema = z
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

const CreateInvoiceBodySchema = z.object({
  ...invoiceBodyFields,
  date: z.string(),
  due_date: z.string(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']),
  items: lineItemsSchema
})

const UpdateInvoiceBodySchema = z.object({
  ...invoiceBodyFields,
  invoice_number: z.string().optional(),
  date: z.string().optional(),
  due_date: z.string().optional(),
  items: lineItemsSchema
})

function computeAggregate(
  invoice: typeof invoiceMakerInvoices.$inferSelect,
  subtotal: number,
  item_count: number
) {
  const calculated_tax =
    invoice.tax_type === 'rate'
      ? (subtotal * invoice.tax_amount) / 100
      : invoice.tax_type === 'fixed'
        ? invoice.tax_amount
        : 0

  const calculated_discount =
    invoice.discount_type === 'rate'
      ? (subtotal * invoice.discount_amount) / 100
      : invoice.discount_type === 'fixed'
        ? invoice.discount_amount
        : 0

  return {
    subtotal,
    item_count,
    calculated_tax,
    calculated_discount,
    calculated_shipping: invoice.shipping_amount || 0
  }
}

export const list = forge
  .query({
    description: 'List all invoices',
    input: {
      query: InvoiceListSchema
    },
    output: {
      OK: z.array(invoiceListDto)
    }
  })
  .callback(async ({ db, query, response }) => {
    const conditions = []

    if (query?.status) {
      conditions.push(eq(invoiceMakerInvoices.status, query.status))
    }

    if (query?.clientId) {
      conditions.push(eq(invoiceMakerInvoices.bill_to, query.clientId))
    }

    if (query?.search) {
      conditions.push(
        or(
          ilike(invoiceMakerInvoices.invoice_number, `%${query.search}%`),
          ilike(invoiceMakerClients.name, `%${query.search}%`)
        )
      )
    }

    const rows = await db
      .select({ invoice: invoiceMakerInvoices, client: invoiceMakerClients })
      .from(invoiceMakerInvoices)
      .leftJoin(
        invoiceMakerClients,
        eq(invoiceMakerInvoices.bill_to, invoiceMakerClients.id)
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(invoiceMakerInvoices.date), desc(invoiceMakerInvoices.created))

    const aggregates = await db
      .select({
        invoice: invoiceMakerItems.invoice,
        subtotal: sql<number>`CAST(COALESCE(SUM(${invoiceMakerItems.quantity} * ${invoiceMakerItems.rate}), 0) AS DOUBLE PRECISION)`,
        item_count: sql<number>`CAST(COUNT(*) AS INTEGER)`
      })
      .from(invoiceMakerItems)
      .groupBy(invoiceMakerItems.invoice)

    const aggregateMap = new Map(
      aggregates.map(row => [row.invoice, row] as const)
    )

    return response.ok(
      rows.map(({ invoice, client }) => {
        const aggregate = aggregateMap.get(invoice.id)

        return {
          ...invoice,
          ...computeAggregate(
            invoice,
            aggregate?.subtotal ?? 0,
            aggregate?.item_count ?? 0
          ),
          expand: {
            bill_to: client ?? undefined
          }
        }
      }) as z.infer<typeof invoiceListDto>[]
    )
  })

export const getById = forge
  .query({
    description: 'Get invoice by ID with items',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerInvoices)
      })
    },
    output: {
      OK: invoiceDetailDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const invoice = (await db.query.invoices.findFirst({
      where: { id }
    }))!

    const items = await db
      .select()
      .from(invoiceMakerItems)
      .where(eq(invoiceMakerItems.invoice, id))
      .orderBy(invoiceMakerItems.order)

    const client = invoice.bill_to
      ? await db.query.clients.findFirst({ where: { id: invoice.bill_to } })
      : undefined

    return response.ok({
      ...invoice,
      items,
      expand: {
        bill_to: client ?? undefined
      }
    } as z.infer<typeof invoiceDetailDto>)
  })

export const create = forge
  .mutation({
    description: 'Create a new invoice',
    input: {
      body: CreateInvoiceBodySchema
    },
    output: {
      CREATED: invoiceDto
    }
  })
  .callback(async ({ db, body, response }) => {
    const { items, ...invoiceData } = body

    const settings = await db.query.settings.findFirst()

    let invoiceNumber = '001'

    if (settings) {
      const prefix = settings.invoice_prefix || ''

      const nextNum = settings.next_invoice_number || 1

      invoiceNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await db
        .update(invoiceMakerSettings)
        .set({ next_invoice_number: nextNum + 1 })
        .where(eq(invoiceMakerSettings.id, settings.id))
    }

    const [invoice] = await db
      .insert(invoiceMakerInvoices)
      .values({
        invoice_number: invoiceNumber,
        bill_to: invoiceData.bill_to || null,
        date: new Date(invoiceData.date),
        due_date: new Date(invoiceData.due_date),
        payment_terms: invoiceData.payment_terms ?? '',
        po_number: invoiceData.po_number ?? '',
        status: invoiceData.status,
        shipping_address: invoiceData.shipping_address ?? '',
        tax_type: invoiceData.tax_type ?? '',
        tax_amount: invoiceData.tax_amount ?? 0,
        discount_type: invoiceData.discount_type ?? '',
        discount_amount: invoiceData.discount_amount ?? 0,
        shipping_amount: invoiceData.shipping_amount ?? 0,
        amount_paid: invoiceData.amount_paid ?? 0,
        notes: invoiceData.notes ?? ''
      })
      .returning()

    if (items && items.length > 0) {
      await db.insert(invoiceMakerItems).values(
        items.map(item => ({
          invoice: invoice.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          order: item.order
        }))
      )
    }

    return response.created(invoice as z.infer<typeof invoiceDto>)
  })

export const update = forge
  .mutation({
    description: 'Update an existing invoice',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerInvoices)
      }),
      body: UpdateInvoiceBodySchema
    },
    output: {
      OK: invoiceDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const { items, date, due_date, bill_to, ...rest } = body

    const [invoice] = await db
      .update(invoiceMakerInvoices)
      .set({
        ...rest,
        updated: new Date(),
        ...(bill_to !== undefined ? { bill_to: bill_to || null } : {}),
        ...(date !== undefined ? { date: new Date(date) } : {}),
        ...(due_date !== undefined ? { due_date: new Date(due_date) } : {})
      })
      .where(eq(invoiceMakerInvoices.id, id))
      .returning()

    if (items !== undefined) {
      const existingItems = await db
        .select()
        .from(invoiceMakerItems)
        .where(eq(invoiceMakerItems.invoice, id))

      const existingIds = new Set(existingItems.map(item => item.id))

      const newItemIds = new Set(
        items.filter(item => item.id).map(item => item.id)
      )

      for (const item of existingItems) {
        if (!newItemIds.has(item.id)) {
          await db
            .delete(invoiceMakerItems)
            .where(eq(invoiceMakerItems.id, item.id))
        }
      }

      for (const item of items) {
        if (item.id && existingIds.has(item.id)) {
          await db
            .update(invoiceMakerItems)
            .set({
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
              order: item.order
            })
            .where(eq(invoiceMakerItems.id, item.id))
        } else {
          await db.insert(invoiceMakerItems).values({
            invoice: id,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            order: item.order
          })
        }
      }
    }

    return response.ok(invoice as z.infer<typeof invoiceDto>)
  })

export const remove = forge
  .mutation({
    description: 'Delete an invoice',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerInvoices)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    await db.delete(invoiceMakerInvoices).where(eq(invoiceMakerInvoices.id, id))

    return response.noContent()
  })

export const duplicate = forge
  .mutation({
    description: 'Duplicate an existing invoice',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerInvoices)
      })
    },
    output: {
      CREATED: z.null()
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const original = (await db.query.invoices.findFirst({ where: { id } }))!

    const originalItems = await db
      .select()
      .from(invoiceMakerItems)
      .where(eq(invoiceMakerItems.invoice, id))
      .orderBy(invoiceMakerItems.order)

    const settings = await db.query.settings.findFirst()

    let invoiceNumber = '001'

    if (settings) {
      const prefix = settings.invoice_prefix || ''

      const nextNum = settings.next_invoice_number || 1

      invoiceNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await db
        .update(invoiceMakerSettings)
        .set({ next_invoice_number: nextNum + 1 })
        .where(eq(invoiceMakerSettings.id, settings.id))
    }

    const [newInvoice] = await db
      .insert(invoiceMakerInvoices)
      .values({
        invoice_number: invoiceNumber,
        bill_to: original.bill_to,
        date: new Date(),
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
      .returning()

    if (originalItems.length > 0) {
      await db.insert(invoiceMakerItems).values(
        originalItems.map(item => ({
          invoice: newInvoice.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          order: item.order
        }))
      )
    }

    return response.created(null)
  })
