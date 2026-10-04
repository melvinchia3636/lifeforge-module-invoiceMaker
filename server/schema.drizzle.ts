import { type RelationsBuilder } from 'drizzle-orm'
import {
  doublePrecision,
  integer,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

import { createModuleTable } from '@lifeforge/drizzle'

const pgTable = createModuleTable()

export const invoiceMakerClients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().default(''),
  address: text('address').notNull().default(''),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const invoiceMakerInvoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoice_number: text('invoice_number').notNull().default(''),
  bill_to: uuid('bill_to').references(() => invoiceMakerClients.id, {
    onDelete: 'set null'
  }),
  date: timestamp('date', { mode: 'date' }).defaultNow().notNull(),
  due_date: timestamp('due_date', { mode: 'date' }).defaultNow().notNull(),
  payment_terms: text('payment_terms').notNull().default(''),
  po_number: text('po_number').notNull().default(''),
  status: text('status').notNull().default('draft'),
  shipping_address: text('shipping_address').notNull().default(''),
  tax_type: text('tax_type').notNull().default(''),
  tax_amount: doublePrecision('tax_amount').notNull().default(0),
  discount_type: text('discount_type').notNull().default(''),
  discount_amount: doublePrecision('discount_amount').notNull().default(0),
  shipping_amount: doublePrecision('shipping_amount').notNull().default(0),
  amount_paid: doublePrecision('amount_paid').notNull().default(0),
  notes: text('notes').notNull().default(''),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const invoiceMakerItems = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoice: uuid('invoice').references(() => invoiceMakerInvoices.id, {
    onDelete: 'cascade'
  }),
  description: text('description').notNull().default(''),
  quantity: doublePrecision('quantity').notNull().default(0),
  rate: doublePrecision('rate').notNull().default(0),
  order: integer('order').notNull().default(0)
})

export const invoiceMakerSettings = pgTable('settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  company_name: text('company_name').notNull().default(''),
  company_address: text('company_address').notNull().default(''),
  company_reg_no: text('company_reg_no').notNull().default(''),
  company_email: text('company_email').notNull().default(''),
  company_tel_no: text('company_tel_no').notNull().default(''),
  default_logo: text('default_logo').notNull().default(''),
  default_payment_terms: text('default_payment_terms').notNull().default(''),
  default_notes: text('default_notes').notNull().default(''),
  default_tax_rate: doublePrecision('default_tax_rate').notNull().default(0),
  bank_name: text('bank_name').notNull().default(''),
  bank_account: text('bank_account').notNull().default(''),
  bank_account_name: text('bank_account_name').notNull().default(''),
  currency: text('currency').notNull().default(''),
  currency_symbol: text('currency_symbol').notNull().default(''),
  invoice_prefix: text('invoice_prefix').notNull().default(''),
  next_invoice_number: integer('next_invoice_number').notNull().default(1),
  receipt_prefix: text('receipt_prefix').notNull().default(''),
  next_receipt_number: integer('next_receipt_number').notNull().default(1),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const invoiceMakerReceipts = pgTable('receipts', {
  id: uuid('id').defaultRandom().primaryKey(),
  receipt_number: text('receipt_number').notNull().default(''),
  bill_to: uuid('bill_to').references(() => invoiceMakerClients.id, {
    onDelete: 'set null'
  }),
  date: timestamp('date', { mode: 'date' }).defaultNow().notNull(),
  payment_method: text('payment_method').notNull().default(''),
  payment_terms: text('payment_terms').notNull().default(''),
  reference_number: text('reference_number').notNull().default(''),
  status: text('status').notNull().default('draft'),
  shipping_address: text('shipping_address').notNull().default(''),
  tax_type: text('tax_type').notNull().default(''),
  tax_amount: doublePrecision('tax_amount').notNull().default(0),
  discount_type: text('discount_type').notNull().default(''),
  discount_amount: doublePrecision('discount_amount').notNull().default(0),
  shipping_amount: doublePrecision('shipping_amount').notNull().default(0),
  amount_paid: doublePrecision('amount_paid').notNull().default(0),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const invoiceMakerReceiptItems = pgTable('receipt_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  receipt: uuid('receipt').references(() => invoiceMakerReceipts.id, {
    onDelete: 'cascade'
  }),
  description: text('description').notNull().default(''),
  quantity: doublePrecision('quantity').notNull().default(0),
  rate: doublePrecision('rate').notNull().default(0),
  order: integer('order').notNull().default(0)
})

export const tables = {
  invoices: invoiceMakerInvoices,
  items: invoiceMakerItems,
  clients: invoiceMakerClients,
  settings: invoiceMakerSettings,
  receipts: invoiceMakerReceipts,
  receipt_items: invoiceMakerReceiptItems
}

export const relations = (r: RelationsBuilder<typeof tables>) => ({
  invoices: {
    bill_to_info: r.one.clients({
      from: r.invoices.bill_to,
      to: r.clients.id
    })
  },
  items: {
    invoice_info: r.one.invoices({
      from: r.items.invoice,
      to: r.invoices.id
    })
  },
  receipts: {
    bill_to_info: r.one.clients({
      from: r.receipts.bill_to,
      to: r.clients.id
    })
  },
  receipt_items: {
    receipt_info: r.one.receipts({
      from: r.receipt_items.receipt,
      to: r.receipts.id
    })
  }
})
