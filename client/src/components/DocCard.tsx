import dayjs from 'dayjs'
import _ from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useForgeMutation } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import {
  Card,
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  Flex,
  Icon,
  Stack,
  TagChip,
  Text,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

export type DocType = 'invoice' | 'receipt'

export interface DocEntry {
  id: string
  date: string
  status?: string
  subtotal?: number
  expand?: {
    bill_to?: {
      name?: string | null
    } | null
  } | null
}

export interface DocCardAction {
  icon: string
  label: string
  dangerous?: boolean
  onClick: () => void
}

export interface DocCardProps<T extends DocEntry> {
  type: DocType
  data: T
  statusConfig: Record<string, { color: string; icon: string }>
  currencySymbol: string
  extraActions?: DocCardAction[]
}

export default function DocCard<T extends DocEntry>({
  type,
  data,
  statusConfig,
  currencySymbol,
  extraActions = []
}: DocCardProps<T>) {
  const { open } = useModalStore()
  const { t } = useModuleTranslation()
  const navigate = useNavigate()
  const [duplicating, setDuplicating] = useState(false)

  const docs = type === 'invoice' ? forgeAPI.invoices : forgeAPI.receipts
  const clientName = data.expand?.bill_to?.name
  const amount = (data.subtotal || 0).toLocaleString('en-MY', {
    minimumFractionDigits: 2
  })

  const duplicateMutation = useForgeMutation(
    docs.duplicate.input({ id: data.id }),
    {
      action: 'create',
      queryKey: forgeAPI.key
    }
  )

  const deleteMutation = useForgeMutation(docs.remove.input({ id: data.id }), {
    action: 'delete',
    queryKey: forgeAPI.key
  })

  function handleDelete() {
    open(ConfirmationModal, {
      title: t(`modals.delete${_.startCase(type)}.title`),
      description: t(`modals.delete${_.startCase(type)}.message`),
      onConfirm: async () => {
        await deleteMutation.mutateAsync(undefined)
      }
    })
  }

  async function handleDuplicate() {
    setDuplicating(true)

    try {
      await duplicateMutation.mutateAsync(undefined)
    } finally {
      setDuplicating(false)
    }
  }

  return (
    <Card
      isInteractive
      align="center"
      as="li"
      direction="row"
      onClick={() =>
        navigate(`/melvinchia3636--invoice-maker/${type}/view/${data.id}`)
      }
    >
      <Stack minWidth="0">
        <Flex align="center" gap="md">
          <Text size="lg" weight="semibold">
            #{data[`${type}_number` as never]}
          </Text>
          <TagChip
            color={statusConfig[data.status || 'draft'].color}
            flexShrink="0"
            icon={statusConfig[data.status || 'draft'].icon}
            label={t(`statuses.${data.status || 'draft'}`)}
          />
        </Flex>
        <Flex align="center" gap="xs">
          <Icon color="muted" icon="tabler:user" />
          <Text truncate color="muted" size="sm">
            {clientName || 'No client'}
          </Text>
        </Flex>
      </Stack>
      <Stack align="end" gap="xs" mr="md">
        <Text weight="semibold">
          {currencySymbol} {amount}
        </Text>
        <Text color="muted" size="sm">
          {dayjs(data.date).format('MMM D, YYYY')}
        </Text>
      </Stack>
      <ContextMenu>
        {extraActions.map(action => (
          <ContextMenuItem key={action.label} {...action} />
        ))}
        <ContextMenuItem
          icon="tabler:pencil"
          label="edit"
          onClick={() =>
            navigate(`/melvinchia3636--invoice-maker/${type}/modify/${data.id}`)
          }
        />
        <ContextMenuItem
          icon="tabler:files"
          label="duplicate"
          loading={duplicating}
          onClick={handleDuplicate}
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
