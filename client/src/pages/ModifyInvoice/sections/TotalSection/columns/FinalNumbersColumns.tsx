import { useModuleTranslation } from '@lifeforge/localization'
import { Box, CurrencyInput, Flex, Text } from '@lifeforge/ui'

import { useInvoiceEditor } from '@/pages/ModifyInvoice/providers/InvoiceEditorProvider'

function FinalNumbersColumns() {
  const { t } = useModuleTranslation()

  const {
    formData,
    currencySymbol,
    updateField,
    finalNumbers: { total, balanceDue }
  } = useInvoiceEditor()

  return (
    <>
      <Box pt="sm" style={{ borderTop: '1px solid var(--color-bg-200)' }}>
        <Flex justify="between">
          <Text weight="semibold">{t('inputs.total')}</Text>
          <Text weight="semibold">
            {currencySymbol}{' '}
            {total.toLocaleString('en-MY', {
              minimumFractionDigits: 2
            })}
          </Text>
        </Flex>
      </Box>
      <Flex
        align={{ sm: 'center' }}
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        justify="between"
      >
        <Text color="muted">{t('inputs.amountPaid')}</Text>
        <Box width="8rem">
          <CurrencyInput
            prefix={currencySymbol}
            value={formData.amount_paid}
            variant="plain"
            onChange={val => updateField('amount_paid', val || 0)}
          />
        </Box>
      </Flex>
      <Box pt="sm" style={{ borderTop: '1px solid var(--color-bg-200)' }}>
        <Flex justify="between">
          <Text size="lg" weight="bold">
            {t('inputs.balanceDue')}
          </Text>
          <Text color="custom-500" size="lg" weight="bold">
            {currencySymbol}{' '}
            {balanceDue.toLocaleString('en-MY', {
              minimumFractionDigits: 2
            })}
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default FinalNumbersColumns
