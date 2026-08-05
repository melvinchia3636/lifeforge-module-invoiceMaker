import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  Flex,
  Icon,
  TagChip,
  Text,
  colorWithOpacity,
  useModalStore
} from '@lifeforge/ui'

import { RECEIPT_STATUS_CONFIG, type ReceiptEntry } from '@/pages/Receipts/components/ReceiptCard'
import { forgeAPI } from '@/manifest'
import ModifyReceiptMetadataModal from '@/modals/ModifyReceiptMetadataModal'

import { useReceiptEditor } from '../providers/ReceiptEditorProvider'

function ReceiptHeaderSection() {
  const { id } = useParams<{ id?: string }>()
  const { t } = useModuleTranslation()
  const { open } = useModalStore()

  const receiptQuery = useQuery(
    forgeAPI.receipts.getById
      .input({ id: id || '' })
      .queryOptions({ enabled: !!id })
  )

  const { isEditMode } = useReceiptEditor()
  const status = receiptQuery.data?.status || 'draft'

  return (
    <Box as="header" mb="lg" mt="md">
      {isEditMode ? (
        <>
          <Flex align="center" gap="sm">
            <Text as="h1" size={{ base: 'xl', sm: '2xl' }} weight="semibold">
              <Text as="span" color="muted">
                {t('items.receipt', 'Receipt')}
              </Text>{' '}
              #{receiptQuery.data?.receipt_number}
            </Text>
            <Button
              icon="tabler:pencil"
              variant="plain"
              onClick={() => {
                if (receiptQuery.data) {
                  open(ModifyReceiptMetadataModal, {
                    receipt: receiptQuery.data as unknown as ReceiptEntry
                  })
                }
              }}
            />
          </Flex>
          <Flex align="center" mt="xs">
            <Text as="span" color="muted" size={{ base: 'sm', sm: 'base' }}>
              {t('sidebar.status', 'Status')}:
            </Text>
            <TagChip
              color={RECEIPT_STATUS_CONFIG[status].color}
              icon={RECEIPT_STATUS_CONFIG[status].icon}
              label={t(`statuses.${status}`)}
              ml="sm"
            />
          </Flex>
        </>
      ) : (
        <Flex align="center" as="h1" gap="md">
          <Flex
            align="center"
            bg={colorWithOpacity('bg-500', '20%')}
            color="muted"
            justify="center"
            p="sm"
            r="md"
          >
            <Icon icon="tabler:receipt" size="1.5rem" />
          </Flex>
          <Text as="span" size="2xl" weight="semibold">
            {t('buttons.newReceipt', 'New Receipt')}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default ReceiptHeaderSection
