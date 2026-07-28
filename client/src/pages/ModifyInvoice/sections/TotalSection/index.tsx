import { useModuleTranslation } from '@lifeforge/localization'
import { Card, Flex, Stack, Text, surface } from '@lifeforge/ui'

import { useInvoiceEditor } from '../../providers/InvoiceEditorProvider'
import AddColumnButtons from './columns/AddColumnButtons'
import DiscountColumn from './columns/DiscountColumn'
import FinalNumbersColumns from './columns/FinalNumbersColumns'
import ShippingColumn from './columns/ShippingColumn'
import TaxColumn from './columns/TaxColumn'

function TotalSection() {
  const { t } = useModuleTranslation()

  const {
    currencySymbol,
    showDiscount,
    showTax,
    showShipping,
    finalNumbers: { subtotal }
  } = useInvoiceEditor()

  return (
    <Card bg={surface.default} p="md" r="lg">
      <Stack gap="sm">
        <Flex align="center" justify="between">
          <Text color="muted">{t('inputs.subtotal')}</Text>
          <Text>
            {currencySymbol}{' '}
            {subtotal.toLocaleString('en-MY', {
              minimumFractionDigits: 2
            })}
          </Text>
        </Flex>
        <AddColumnButtons />
        {showDiscount && <DiscountColumn />}
        {showTax && <TaxColumn />}
        {showShipping && <ShippingColumn />}
        <FinalNumbersColumns />
      </Stack>
    </Card>
  )
}

export default TotalSection
