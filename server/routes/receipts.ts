import { and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import {
  invoiceMakerClients,
  invoiceMakerReceiptItems,
  invoiceMakerReceipts,
  invoiceMakerSettings
} from '../schema.drizzle'

const receiptDto = createSelectSchema(invoiceMakerReceipts).extend({
  status: z.enum(['draft', 'issued', 'cancelled']),
  tax_type: z.enum(['rate', 'fixed', '']),
  discount_type: z.enum(['rate', 'fixed', ''])
})
const clientDto = createSelectSchema(invoiceMakerClients)
const receiptItemDto = createSelectSchema(invoiceMakerReceiptItems)

const receiptAggregateDto = receiptDto.extend({
  subtotal: z.number(),
  item_count: z.number(),
  calculated_tax: z.number(),
  calculated_discount: z.number(),
  calculated_shipping: z.number()
})

const receiptListDto = receiptAggregateDto.extend({
  expand: z
    .object({
      bill_to: clientDto.optional()
    })
    .optional()
})

const receiptDetailDto = receiptDto.extend({
  items: z.array(receiptItemDto),
  expand: z
    .object({
      bill_to: clientDto.optional()
    })
    .optional()
})

const ReceiptListSchema = z.object({
  status: z.enum(['draft', 'issued', 'cancelled']).optional(),
  clientId: z.string().optional(),
  search: z.string().optional()
})

const receiptBodyFields = {
  bill_to: z.string().optional(),
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
  amount_paid: z.number().optional()
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

const CreateReceiptBodySchema = z.object({
  ...receiptBodyFields,
  date: z.string(),
  status: z.enum(['draft', 'issued', 'cancelled']),
  items: lineItemsSchema
})

const UpdateReceiptBodySchema = z.object({
  ...receiptBodyFields,
  receipt_number: z.string().optional(),
  date: z.string().optional(),
  items: lineItemsSchema
})

function computeAggregate(
  receipt: typeof invoiceMakerReceipts.$inferSelect,
  subtotal: number,
  item_count: number
) {
  const calculated_tax =
    receipt.tax_type === 'rate'
      ? (subtotal * receipt.tax_amount) / 100
      : receipt.tax_type === 'fixed'
        ? receipt.tax_amount
        : 0

  const calculated_discount =
    receipt.discount_type === 'rate'
      ? (subtotal * receipt.discount_amount) / 100
      : receipt.discount_type === 'fixed'
        ? receipt.discount_amount
        : 0

  return {
    subtotal,
    item_count,
    calculated_tax,
    calculated_discount,
    calculated_shipping: receipt.shipping_amount || 0
  }
}

export const list = forge
  .query({
    description: 'List all receipts',
    input: {
      query: ReceiptListSchema
    },
    output: {
      OK: z.array(receiptListDto)
    }
  })
  .callback(async ({ db, query, response }) => {
    const conditions = []

    if (query?.status) {
      conditions.push(eq(invoiceMakerReceipts.status, query.status))
    }

    if (query?.clientId) {
      conditions.push(eq(invoiceMakerReceipts.bill_to, query.clientId))
    }

    if (query?.search) {
      conditions.push(
        or(
          ilike(invoiceMakerReceipts.receipt_number, `%${query.search}%`),
          ilike(invoiceMakerClients.name, `%${query.search}%`)
        )
      )
    }

    const rows = await db
      .select({
        receipt: invoiceMakerReceipts,
        client: invoiceMakerClients
      })
      .from(invoiceMakerReceipts)
      .leftJoin(
        invoiceMakerClients,
        eq(invoiceMakerReceipts.bill_to, invoiceMakerClients.id)
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(
        desc(invoiceMakerReceipts.date),
        desc(invoiceMakerReceipts.created)
      )

    const aggregates = await db
      .select({
        receipt: invoiceMakerReceiptItems.receipt,
        subtotal: sql<number>`CAST(COALESCE(SUM(${invoiceMakerReceiptItems.quantity} * ${invoiceMakerReceiptItems.rate}), 0) AS DOUBLE PRECISION)`,
        item_count: sql<number>`CAST(COUNT(*) AS INTEGER)`
      })
      .from(invoiceMakerReceiptItems)
      .groupBy(invoiceMakerReceiptItems.receipt)

    const aggregateMap = new Map(
      aggregates.map(row => [row.receipt, row] as const)
    )

    return response.ok(
      rows.map(({ receipt, client }) => {
        const aggregate = aggregateMap.get(receipt.id)

        return {
          ...receipt,
          ...computeAggregate(
            receipt,
            aggregate?.subtotal ?? 0,
            aggregate?.item_count ?? 0
          ),
          expand: {
            bill_to: client ?? undefined
          }
        }
      }) as z.infer<typeof receiptListDto>[]
    )
  })

export const getById = forge
  .query({
    description: 'Get receipt by ID with items',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceipts)
      })
    },
    output: {
      OK: receiptDetailDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const receipt = (await db.query.receipts.findFirst({ where: { id } }))!

    const items = await db
      .select()
      .from(invoiceMakerReceiptItems)
      .where(eq(invoiceMakerReceiptItems.receipt, id))
      .orderBy(invoiceMakerReceiptItems.order)

    const client = receipt.bill_to
      ? await db.query.clients.findFirst({ where: { id: receipt.bill_to } })
      : undefined

    return response.ok({
      ...receipt,
      items,
      expand: {
        bill_to: client ?? undefined
      }
    } as z.infer<typeof receiptDetailDto>)
  })

export const create = forge
  .mutation({
    description: 'Create a new receipt',
    input: {
      body: CreateReceiptBodySchema
    },
    output: {
      CREATED: receiptDto
    }
  })
  .callback(async ({ db, body, response }) => {
    const { items, ...receiptData } = body

    const settings = await db.query.settings.findFirst()

    let receiptNumber = 'REC-001'

    if (settings) {
      const prefix = settings.receipt_prefix || 'REC-'

      const nextNum = settings.next_receipt_number || 1

      receiptNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await db
        .update(invoiceMakerSettings)
        .set({ next_receipt_number: nextNum + 1 })
        .where(eq(invoiceMakerSettings.id, settings.id))
    }

    const [receipt] = await db
      .insert(invoiceMakerReceipts)
      .values({
        receipt_number: receiptNumber,
        bill_to: receiptData.bill_to || null,
        date: new Date(receiptData.date),
        payment_method: receiptData.payment_method ?? '',
        payment_terms: receiptData.payment_terms ?? '',
        reference_number: receiptData.reference_number ?? '',
        status: receiptData.status,
        shipping_address: receiptData.shipping_address ?? '',
        tax_type: receiptData.tax_type ?? '',
        tax_amount: receiptData.tax_amount ?? 0,
        discount_type: receiptData.discount_type ?? '',
        discount_amount: receiptData.discount_amount ?? 0,
        shipping_amount: receiptData.shipping_amount ?? 0,
        amount_paid: receiptData.amount_paid ?? 0
      })
      .returning()

    if (items && items.length > 0) {
      await db.insert(invoiceMakerReceiptItems).values(
        items.map(item => ({
          receipt: receipt.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          order: item.order
        }))
      )
    }

    return response.created(receipt as z.infer<typeof receiptDto>)
  })

export const update = forge
  .mutation({
    description: 'Update an existing receipt',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceipts)
      }),
      body: UpdateReceiptBodySchema
    },
    output: {
      OK: receiptDto
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const { items, date, bill_to, ...rest } = body

    const [receipt] = await db
      .update(invoiceMakerReceipts)
      .set({
        ...rest,
        updated: new Date(),
        ...(bill_to !== undefined ? { bill_to: bill_to || null } : {}),
        ...(date !== undefined ? { date: new Date(date) } : {})
      })
      .where(eq(invoiceMakerReceipts.id, id))
      .returning()

    if (items !== undefined) {
      const existingItems = await db
        .select()
        .from(invoiceMakerReceiptItems)
        .where(eq(invoiceMakerReceiptItems.receipt, id))

      const existingIds = new Set(existingItems.map(item => item.id))

      const newItemIds = new Set(
        items.filter(item => item.id).map(item => item.id)
      )

      for (const item of existingItems) {
        if (!newItemIds.has(item.id)) {
          await db
            .delete(invoiceMakerReceiptItems)
            .where(eq(invoiceMakerReceiptItems.id, item.id))
        }
      }

      for (const item of items) {
        if (item.id && existingIds.has(item.id)) {
          await db
            .update(invoiceMakerReceiptItems)
            .set({
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
              order: item.order
            })
            .where(eq(invoiceMakerReceiptItems.id, item.id))
        } else {
          await db.insert(invoiceMakerReceiptItems).values({
            receipt: id,
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
            order: item.order
          })
        }
      }
    }

    return response.ok(receipt as z.infer<typeof receiptDto>)
  })

export const remove = forge
  .mutation({
    description: 'Delete a receipt',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceipts)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    await db
      .delete(invoiceMakerReceipts)
      .where(eq(invoiceMakerReceipts.id, id))

    return response.noContent()
  })

export const duplicate = forge
  .mutation({
    description: 'Duplicate an existing receipt',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), invoiceMakerReceipts)
      })
    },
    output: {
      CREATED: z.null()
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const original = (await db.query.receipts.findFirst({ where: { id } }))!

    const originalItems = await db
      .select()
      .from(invoiceMakerReceiptItems)
      .where(eq(invoiceMakerReceiptItems.receipt, id))
      .orderBy(invoiceMakerReceiptItems.order)

    const settings = await db.query.settings.findFirst()

    let receiptNumber = 'REC-001'

    if (settings) {
      const prefix = settings.receipt_prefix || 'REC-'

      const nextNum = settings.next_receipt_number || 1

      receiptNumber = `${prefix}${String(nextNum).padStart(3, '0')}`

      await db
        .update(invoiceMakerSettings)
        .set({ next_receipt_number: nextNum + 1 })
        .where(eq(invoiceMakerSettings.id, settings.id))
    }

    const [newReceipt] = await db
      .insert(invoiceMakerReceipts)
      .values({
        receipt_number: receiptNumber,
        bill_to: original.bill_to,
        date: new Date(),
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
      .returning()

    if (originalItems.length > 0) {
      await db.insert(invoiceMakerReceiptItems).values(
        originalItems.map(item => ({
          receipt: newReceipt.id,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          order: item.order
        }))
      )
    }

    return response.created(null)
  })
