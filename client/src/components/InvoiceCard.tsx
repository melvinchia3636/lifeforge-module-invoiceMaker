import type { InvoiceEntry } from '@'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'

import { useForgeMutation, usePromiseLoading } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Card,
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Stack,
  TAILWIND_PALETTE,
  TagChip,
  Text,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

export const STATUS_CONFIG = {
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

export default function InvoiceCard({
  invoice,
  currencySymbol
}: {
  invoice: InvoiceEntry
  currencySymbol: string
}) {
  const { open } = useModalStore()
  const navigate = useNavigate()
  const { t } = useModuleTranslation()

  const statusConfig = STATUS_CONFIG[invoice.status || 'draft']

  const duplicateMutation = useForgeMutation(
    forgeAPI.invoices.duplicate.input({ id: invoice.id }),
    { action: 'create', queryKey: forgeAPI.key }
  )

  const deleteMutation = useForgeMutation(
    forgeAPI.invoices.remove.input({ id: invoice.id }),
    { action: 'delete', queryKey: forgeAPI.key }
  )

  function handleDelete() {
    open(ConfirmationModal, {
      title: t('modals.deleteInvoice.title'),
      description: t('modals.deleteInvoice.message'),
      onConfirm: async () => {
        await deleteMutation.mutateAsync(undefined)
      }
    })
  }

  const [loading, onDuplicate] = usePromiseLoading(async () => {
    await duplicateMutation.mutateAsync(undefined)
  })

  return (
    <Card
      as="li"
      direction="row"
      onClick={() =>
        navigate(`/melvinchia3636--invoice-maker/view/${invoice.id}`)
      }
    >
      <Box flex="1" minWidth="0">
        <Flex align="center" gap="md">
          <Text size="lg" weight="semibold">
            #{invoice.invoice_number}
          </Text>
          <TagChip
            color={statusConfig.color}
            flexShrink="0"
            icon={statusConfig.icon}
            label={t(`statuses.${invoice.status}`)}
          />
        </Flex>
        <Text truncate color="muted" size="sm">
          {invoice.expand?.bill_to?.name || 'No client'}
        </Text>
      </Box>
      <Stack align="end" gap="xs" mr="md">
        <Text weight="semibold">
          {currencySymbol}{' '}
          {invoice.subtotal.toLocaleString('en-MY', {
            minimumFractionDigits: 2
          })}
        </Text>
        <Text color="muted" size="sm">
          {dayjs(invoice.date).format('MMM D, YYYY')}
        </Text>
      </Stack>
      <ContextMenu>
        <ContextMenuItem
          icon="tabler:pencil"
          label="edit"
          onClick={() =>
            navigate(`/melvinchia3636--invoice-maker/modify/${invoice.id}`)
          }
        />
        <ContextMenuItem
          icon="tabler:files"
          label="duplicate"
          loading={loading}
          onClick={onDuplicate}
        />
        <ContextMenuItem
          dangerous
          icon="tabler:trash"
          label="delete"
          onClick={handleDelete}
        />
      </ContextMenu>
    </Card>
  )
}
