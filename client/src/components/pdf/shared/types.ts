import type { InferOutput } from '@lifeforge/api'

import { forgeAPI } from '@/manifest'

export type Invoice = InferOutput<typeof forgeAPI.invoices.getById>

export type Receipt = InferOutput<typeof forgeAPI.receipts.getById>

export type Settings = InferOutput<typeof forgeAPI.settings.get>

export interface PdfCalculations {
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  balanceDue: number
}
