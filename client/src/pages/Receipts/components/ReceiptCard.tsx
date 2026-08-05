import dayjs from 'dayjs'
import { useNavigate } from 'react-router'

import { type InferOutput, useForgeMutation, usePromiseLoading } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
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

export type ReceiptEntry = InferOutput<typeof forgeAPI.receipts.list>[number]

export const RECEIPT_STATUS_CONFIG = {
  draft: { color: TAILWIND_PALETTE.zinc[500], icon: 'tabler:file' },
  issued: { color: TAILWIND_PALETTE.green[500], icon: 'tabler:check' },
  cancelled: {
    color: TAILWIND_PALETTE.zinc[400],
    icon: 'tabler:ban'
  }
} as const

export default function ReceiptCard({
  receipt,
  currencySymbol
}: {
  receipt: ReceiptEntry
  currencySymbol: string
}) {
  const { open } = useModalStore()
  const navigate = useNavigate()
  const { t } = useModuleTranslation()

  const statusConfig = RECEIPT_STATUS_CONFIG[receipt.status || 'draft']

  const duplicateMutation = useForgeMutation(
    forgeAPI.receipts.duplicate.input({ id: receipt.id }),
    { action: 'create', queryKey: forgeAPI.key }
  )

  const deleteMutation = useForgeMutation(
    forgeAPI.receipts.remove.input({ id: receipt.id }),
    { action: 'delete', queryKey: forgeAPI.key }
  )

  function handleDelete() {
    open(ConfirmationModal, {
      title: t('modals.deleteReceipt.title', 'Delete Receipt'),
      description: t(
        'modals.deleteReceipt.message',
        'Are you sure you want to delete this receipt? This action cannot be undone.'
      ),
      onConfirm: async () => {
        await deleteMutation.mutateAsync(undefined)
      }
    })
  }

  const [loading, onDuplicate] = usePromiseLoading(async () => {
    await duplicateMutation.mutateAsync(undefined)
  })

  return (
    <Flex
      as="li"
      gap="md"
      p="md"
      r="md"
      style={{
        cursor: 'pointer',
        backgroundColor: 'var(--color-bg-50)'
      }}
      onClick={() =>
        navigate(`/melvinchia3636--invoice-maker/receipts/view/${receipt.id}`)
      }
    >
      <Box flex="1" minWidth="0">
        <Flex align="center" gap="md">
          <Text size="lg" weight="semibold">
            #{receipt.receipt_number}
          </Text>
          <TagChip
            color={statusConfig.color}
            flexShrink="0"
            icon={statusConfig.icon}
            label={t(`statuses.${receipt.status}`, receipt.status)}
          />
        </Flex>
        <Text truncate color="muted" size="sm">
          {receipt.expand?.bill_to?.name || 'No client'}
        </Text>
      </Box>
      <Stack align="end" gap="xs">
        <Text weight="semibold">
          {currencySymbol}{' '}
          {(receipt.subtotal || 0).toLocaleString('en-MY', {
            minimumFractionDigits: 2
          })}
        </Text>
        <Text color="muted" size="sm">
          {dayjs(receipt.date).format('MMM D, YYYY')}
        </Text>
      </Stack>
      <ContextMenu>
        <ContextMenuItem
          icon="tabler:pencil"
          label="edit"
          onClick={() =>
            navigate(`/melvinchia3636--invoice-maker/receipts/modify/${receipt.id}`)
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
    </Flex>
  )
}
