import { useQuery } from '@tanstack/react-query'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  Card,
  DateInput,
  Flex,
  Grid,
  Icon,
  ListboxInput,
  ListboxOption,
  Text,
  TextInput,
  useModalStore
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import ModifyClientModal from '@/modals/ModifyClientModal'

import { useInvoiceEditor } from '../providers/InvoiceEditorProvider'

function TopInfoSection() {
  const { t } = useModuleTranslation()
  const { open } = useModalStore()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  const clients = clientsQuery.data || []

  const { formData, updateField } = useInvoiceEditor()

  return (
    <Card>
      <Grid gap="lg" templateCols={{ base: 1, lg: 2 }}>
        {/* Left side - Client */}
        <Box minWidth="0">
          <Text as="h3" color="muted" mb="sm" size="sm" weight="medium">
            {t('inputs.billTo')}
          </Text>
          <Flex direction={{ base: 'column', sm: 'row' }} gap="sm" minWidth="0">
            <ListboxInput
              renderContent={() => {
                const targetClient = clients.find(
                  client => client.id === formData.bill_to
                )

                if (!targetClient) {
                  return (
                    <Flex align="center" color="muted" gap="sm">
                      <Icon icon="tabler:user" size="1.25rem" />
                      <Text>Select Client</Text>
                    </Flex>
                  )
                }

                return (
                  <Flex align="center" gap="sm" minWidth="0">
                    <Icon icon="tabler:user" size="1.25rem" />
                    <Text truncate>{targetClient.name}</Text>
                  </Flex>
                )
              }}
              value={formData.bill_to}
              variant="plain"
              onChange={val => updateField('bill_to', val)}
            >
              {clients.map(client => (
                <ListboxOption
                  key={client.id}
                  icon="tabler:user"
                  label={client.name}
                  value={client.id}
                />
              ))}
            </ListboxInput>
            <Button
              icon="tabler:plus"
              tProps={{ item: '' }}
              variant="secondary"
              onClick={() => open(ModifyClientModal, { type: 'create' })}
            >
              New
            </Button>
          </Flex>
        </Box>

        {/* Right side - Dates & Status */}
        <Grid gap="md" templateCols={{ base: 1, md: 2 }}>
          <Box>
            <Text as="label" color="muted" display="block" mb="xs" size="sm">
              {t('inputs.date')}
            </Text>
            <DateInput
              value={formData.date}
              variant="plain"
              onChange={val => val && updateField('date', val)}
            />
          </Box>
          <Box>
            <Text as="label" color="muted" display="block" mb="xs" size="sm">
              {t('inputs.dueDate')}
            </Text>
            <DateInput
              value={formData.due_date}
              variant="plain"
              onChange={val => val && updateField('due_date', val)}
            />
          </Box>
          <Box>
            <Text as="label" color="muted" display="block" mb="xs" size="sm">
              {t('inputs.paymentTerms')}
            </Text>
            <TextInput
              placeholder="Net 30"
              value={formData.payment_terms}
              variant="plain"
              onChange={e => updateField('payment_terms', e)}
            />
          </Box>
          <Box>
            <Text as="label" color="muted" display="block" mb="xs" size="sm">
              {t('inputs.poNumber')}
            </Text>
            <TextInput
              placeholder="Optional"
              value={formData.po_number}
              variant="plain"
              onChange={e => updateField('po_number', e)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default TopInfoSection
