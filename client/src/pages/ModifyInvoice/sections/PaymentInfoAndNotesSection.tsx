import { useQuery } from '@tanstack/react-query'

import { useModuleTranslation } from '@lifeforge/localization'
import { Card, Stack, Text, TextAreaInput, WithQuery } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import { useInvoiceEditor } from '../providers/InvoiceEditorProvider'

function PaymentInfoAndNotesSection() {
  const { t } = useModuleTranslation()
  const settingsQuery = useQuery(forgeAPI.settings.get.queryOptions())
  const { formData, updateField } = useInvoiceEditor()

  return (
    <WithQuery query={settingsQuery}>
      {settings => (
        <Stack gap="md">
          <Card>
            <Text as="h3" mb="sm" weight="medium">
              {t('inputs.paymentInfo')}
            </Text>
            <Text color="muted">
              {settings.bank_name && (
                <>
                  Bank: {settings.bank_name}
                  <br />
                </>
              )}
              {settings.bank_account && (
                <>
                  A/C No.: {settings.bank_account}
                  <br />
                </>
              )}
              {settings.bank_account_name && (
                <>A/C Name: {settings.bank_account_name}</>
              )}
            </Text>
          </Card>

          <Card>
            <Text as="h3" mb="sm" weight="medium">
              {t('inputs.notes')}
            </Text>
            <TextAreaInput
              icon="tabler:note"
              label="Notes"
              placeholder="Payment instructions, terms, etc."
              value={formData.notes}
              variant="plain"
              onChange={e => updateField('notes', e)}
            />
          </Card>
        </Stack>
      )}
    </WithQuery>
  )
}

export default PaymentInfoAndNotesSection
