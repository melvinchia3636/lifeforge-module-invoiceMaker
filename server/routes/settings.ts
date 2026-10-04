import { eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { invoiceMakerSettings } from '../schema.drizzle'

const settingsDto = createSelectSchema(invoiceMakerSettings)

const settingsInputDto = z.object({
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  company_reg_no: z.string().optional(),
  company_email: z.string().optional(),
  company_tel_no: z.string().optional(),
  default_payment_terms: z.string().optional(),
  default_notes: z.string().optional(),
  default_tax_rate: z.number().optional(),
  bank_name: z.string().optional(),
  bank_account: z.string().optional(),
  bank_account_name: z.string().optional(),
  currency: z.string().optional(),
  currency_symbol: z.string().optional(),
  invoice_prefix: z.string().optional(),
  next_invoice_number: z.number().optional(),
  receipt_prefix: z.string().optional(),
  next_receipt_number: z.number().optional()
})

const DEFAULT_SETTINGS = {
  company_name: '',
  company_address: '',
  company_reg_no: '',
  company_email: '',
  company_tel_no: '',
  default_payment_terms: 'Net 30',
  default_notes: '',
  default_tax_rate: 0,
  bank_name: '',
  bank_account: '',
  bank_account_name: '',
  currency: 'MYR',
  currency_symbol: 'RM',
  invoice_prefix: '',
  next_invoice_number: 1,
  receipt_prefix: 'REC-',
  next_receipt_number: 1
}

export const get = forge
  .query({
    description: 'Get invoice maker settings',
    output: {
      OK: settingsDto
    }
  })
  .callback(async ({ db, response }) => {
    const existing = await db.query.settings.findFirst()

    if (existing) {
      return response.ok(existing)
    }

    const [created] = await db
      .insert(invoiceMakerSettings)
      .values(DEFAULT_SETTINGS)
      .returning()

    return response.ok(created)
  })

export const update = forge
  .mutation({
    description: 'Update invoice maker settings',
    input: {
      body: settingsInputDto
    },
    media: {
      default_logo: {
        optional: true
      }
    },
    output: {
      OK: settingsDto
    }
  })
  .callback(
    async ({ db, body, media: { default_logo }, core: { storage }, response }) => {
      const logoUpdate: { default_logo?: string } = {}

      if (default_logo === 'removed') {
        logoUpdate.default_logo = ''
      } else if (default_logo && typeof default_logo !== 'string') {
        const ref = await storage.save({ file: default_logo })

        logoUpdate.default_logo = ref?.key ?? ''
      }

      const existing = await db.query.settings.findFirst()

      if (!existing) {
        const [created] = await db
          .insert(invoiceMakerSettings)
          .values({ ...DEFAULT_SETTINGS, ...body, ...logoUpdate })
          .returning()

        return response.ok(created)
      }

      const [updated] = await db
        .update(invoiceMakerSettings)
        .set({ ...body, ...logoUpdate, updated: new Date() })
        .where(eq(invoiceMakerSettings.id, existing.id))
        .returning()

      return response.ok(updated)
    }
  )
