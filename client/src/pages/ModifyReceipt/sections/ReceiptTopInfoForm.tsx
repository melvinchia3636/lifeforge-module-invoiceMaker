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

import { useReceiptEditor } from '../providers/ReceiptEditorProvider'

const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Bank Transfer',
  "Touch 'n Go",
  'Cheque',
  'Online Banking',
  'Other'
]

function ReceiptTopInfoForm() {
  const { t } = useModuleTranslation()
  const { open } = useModalStore()
  const clientsQuery = useQuery(forgeAPI.clients.list.queryOptions())

  const clients = clientsQuery.data || []
  const { formData, updateField } = useReceiptEditor()

  return (
    <Card>
      <Grid gap="lg" templateCols={{ base: 1, lg: 2 }}>
        {/* Left side - Client */}
        <Box minWidth="0">
          <Flex align="center" gap="xs" mb="sm">
            <Text as="h3" color="muted" size="sm" weight="medium">
              {t('inputs.billTo', 'Bill To')}
            </Text>
            <Icon color="dangerous" icon="uil:asterisk" size="0.75em" />
          </Flex>
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

        {/* Right side - Dates & Payment Method */}
        <Grid gap="md" templateCols={{ base: 1, md: 2 }}>
          <Box>
            <Flex align="center" gap="xs" mb="xs">
              <Text as="label" color="muted" size="sm">
                {t('inputs.date', 'Date')}
              </Text>
              <Icon color="dangerous" icon="uil:asterisk" size="0.75em" />
            </Flex>
            <DateInput
              value={formData.date}
              variant="plain"
              onChange={val => val && updateField('date', val)}
            />
          </Box>
          <Box>
            <Flex align="center" gap="xs" mb="xs">
              <Text as="label" color="muted" size="sm">
                {t('inputs.paymentMethod', 'Payment Method')}
              </Text>
              <Icon color="dangerous" icon="uil:asterisk" size="0.75em" />
            </Flex>
            <ListboxInput
              renderContent={() => (
                <Flex align="center" gap="sm" minWidth="0">
                  <Icon icon="tabler:credit-card" size="1.25rem" />
                  <Text truncate>{formData.payment_method || 'Select Payment Method'}</Text>
                </Flex>
              )}
              value={formData.payment_method}
              variant="plain"
              onChange={val => updateField('payment_method', val)}
            >
              {PAYMENT_METHODS.map(method => (
                <ListboxOption
                  key={method}
                  icon="tabler:credit-card"
                  label={method}
                  value={method}
                />
              ))}
            </ListboxInput>
          </Box>
          <Box>
            <Text as="label" color="muted" display="block" mb="xs" size="sm">
              {t('inputs.referenceNumber', 'Reference Number')}
            </Text>
            <TextInput
              placeholder="e.g. Invoice No."
              value={formData.reference_number}
              variant="plain"
              onChange={e => updateField('reference_number', e)}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ReceiptTopInfoForm
