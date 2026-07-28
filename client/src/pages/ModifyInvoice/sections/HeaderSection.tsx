import type { InvoiceEntry } from '@'
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

import { STATUS_CONFIG } from '@/components/InvoiceCard'
import { forgeAPI } from '@/manifest'
import ModifyInvoiceMetadataModal from '@/modals/ModifyInvoiceMetadataModal'

import { useInvoiceEditor } from '../providers/InvoiceEditorProvider'

function Header() {
  const { id } = useParams<{ id?: string }>()
  const { t } = useModuleTranslation()
  const { open } = useModalStore()

  const invoiceQuery = useQuery(
    forgeAPI.invoices.getById
      .input({ id: id || '' })
      .queryOptions({ enabled: !!id })
  )

  const { isEditMode } = useInvoiceEditor()

  return (
    <Box as="header" mb="lg" mt="md">
      {isEditMode ? (
        <>
          <Flex align="center" gap="sm">
            <Text as="h1" size={{ base: 'xl', sm: '2xl' }} weight="semibold">
              <Text as="span" color="muted">
                {t('items.invoice')}
              </Text>{' '}
              #{invoiceQuery.data?.invoice_number}
            </Text>
            <Button
              icon="tabler:edit"
              variant="plain"
              onClick={() => {
                if (invoiceQuery.data) {
                  open(ModifyInvoiceMetadataModal, {
                    invoice: invoiceQuery.data as unknown as InvoiceEntry
                  })
                }
              }}
            />
          </Flex>
          <Flex align="center" mt="xs">
            <Text as="span" color="muted" size={{ base: 'sm', sm: 'base' }}>
              {t('sidebar.status')}:
            </Text>
            <TagChip
              color={STATUS_CONFIG[invoiceQuery.data?.status || 'draft'].color}
              icon={STATUS_CONFIG[invoiceQuery.data?.status || 'draft'].icon}
              label={t(`statuses.${invoiceQuery.data?.status}`)}
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
            <Icon icon="tabler:invoice" size="1.5rem" />
          </Flex>
          <Text as="span" size="2xl" weight="semibold">
            {t('buttons.newInvoice')}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default Header
