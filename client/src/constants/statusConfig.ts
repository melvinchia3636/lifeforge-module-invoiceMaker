import { TAILWIND_PALETTE } from '@lifeforge/ui'

export const INVOICE_STATUS_CONFIG = {
  draft: { color: TAILWIND_PALETTE.zinc[500], icon: 'tabler:file' },
  sent: { color: TAILWIND_PALETTE.blue[500], icon: 'tabler:send' },
  paid: { color: TAILWIND_PALETTE.green[500], icon: 'tabler:check' },
  overdue: {
    color: TAILWIND_PALETTE.red[500],
    icon: 'tabler:alert-circle'
  },
  cancelled: {
    color: TAILWIND_PALETTE.zinc[400],
    icon: 'tabler:ban'
  }
} as const

export const RECEIPT_STATUS_CONFIG = {
  draft: { color: TAILWIND_PALETTE.zinc[500], icon: 'tabler:file' },
  issued: { color: TAILWIND_PALETTE.green[500], icon: 'tabler:check' },
  cancelled: {
    color: TAILWIND_PALETTE.zinc[400],
    icon: 'tabler:ban'
  }
} as const
