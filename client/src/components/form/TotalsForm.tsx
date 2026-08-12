import { useModuleTranslation } from '@lifeforge/localization'
import {
  Bordered,
  Box,
  Button,
  Card,
  CurrencyInput,
  Flex,
  NumberInput,
  Stack,
  Text,
  surface
} from '@lifeforge/ui'

export interface TotalsFormData {
  discount_type: 'rate' | 'fixed' | ''
  discount_amount: number
  tax_type: 'rate' | 'fixed' | ''
  tax_amount: number
  shipping_amount: number
  amount_paid: number
}

export interface TotalsCalculations {
  subtotal: number
  total: number
  balanceDue: number
}

interface TotalsFormProps {
  formData: TotalsFormData
  currencySymbol: string
  calculations: TotalsCalculations
  showDiscount: boolean
  setShowDiscount: (val: boolean) => void
  showTax: boolean
  setShowTax: (val: boolean) => void
  showShipping: boolean
  setShowShipping: (val: boolean) => void
  updateField: (field: any, value: any) => void
}

export default function TotalsForm({
  formData,
  currencySymbol,
  calculations: { subtotal, total, balanceDue },
  showDiscount,
  setShowDiscount,
  showTax,
  setShowTax,
  showShipping,
  setShowShipping,
  updateField
}: TotalsFormProps) {
  const { t } = useModuleTranslation()

  return (
    <Card bg={surface.default} p="md" r="lg" style={{ width: '100%' }}>
      <Stack gap="sm">
        <Flex align="center" justify="between" mb="md">
          <Text color="muted">{t('inputs.subtotal', 'Subtotal')}</Text>
          <Text>
            {currencySymbol}{' '}
            {subtotal.toLocaleString('en-MY', {
              minimumFractionDigits: 2
            })}
          </Text>
        </Flex>

        {/* Add columns buttons */}
        <Flex gap="xs" style={{ flexWrap: 'wrap' }}>
          {!showDiscount && (
            <Button
              flex="1"
              icon="tabler:plus"
              variant="secondary"
              onClick={() => {
                setShowDiscount(true)
                updateField('discount_type', 'rate')
                updateField('discount_amount', 0)
              }}
            >
              inputs.discount
            </Button>
          )}
          {!showTax && (
            <Button
              flex="1"
              icon="tabler:plus"
              variant="secondary"
              onClick={() => {
                setShowTax(true)
                updateField('tax_type', 'rate')
                updateField('tax_amount', 0)
              }}
            >
              inputs.tax
            </Button>
          )}
          {!showShipping && (
            <Button
              flex="1"
              icon="tabler:plus"
              variant="secondary"
              onClick={() => {
                setShowShipping(true)
                updateField('shipping_amount', 0)
              }}
            >
              inputs.shipping
            </Button>
          )}
        </Flex>

        {/* Discount controls */}
        {showDiscount && (
          <Flex
            align={{ sm: 'center' }}
            direction={{ base: 'column', sm: 'row' }}
            gap="sm"
            justify="between"
          >
            <Text color="muted">{t('inputs.discount', 'Discount')}</Text>
            <Flex align="center" gap="sm">
              {formData.discount_type === 'fixed' && (
                <Text color="muted">{currencySymbol}</Text>
              )}
              <Box width="6rem">
                <NumberInput
                  icon=""
                  label=""
                  min={0}
                  value={formData.discount_amount}
                  variant="plain"
                  onChange={val => updateField('discount_amount', val || 0)}
                />
              </Box>
              {formData.discount_type === 'rate' && (
                <Text color="muted">%</Text>
              )}
              <Button
                icon="tabler:arrows-exchange"
                variant="secondary"
                onClick={() => {
                  updateField(
                    'discount_type',
                    formData.discount_type === 'rate' ? 'fixed' : 'rate'
                  )
                }}
              />
              <Button
                dangerous
                icon="tabler:x"
                variant="secondary"
                onClick={() => {
                  setShowDiscount(false)
                  updateField('discount_type', '')
                  updateField('discount_amount', 0)
                }}
              />
            </Flex>
          </Flex>
        )}

        {/* Tax controls */}
        {showTax && (
          <Flex
            align={{ sm: 'center' }}
            direction={{ base: 'column', sm: 'row' }}
            gap="sm"
            justify="between"
          >
            <Text color="muted">{t('inputs.tax', 'Tax')}</Text>
            <Flex align="center" gap="sm">
              {formData.tax_type === 'fixed' && (
                <Text color="muted">{currencySymbol}</Text>
              )}
              <Box width="6rem">
                <NumberInput
                  icon=""
                  label=""
                  min={0}
                  value={formData.tax_amount}
                  variant="plain"
                  onChange={val => updateField('tax_amount', val || 0)}
                />
              </Box>
              {formData.tax_type === 'rate' && <Text color="muted">%</Text>}
              <Button
                icon="tabler:arrows-exchange"
                variant="secondary"
                onClick={() => {
                  updateField(
                    'tax_type',
                    formData.tax_type === 'rate' ? 'fixed' : 'rate'
                  )
                }}
              />
              <Button
                dangerous
                icon="tabler:x"
                variant="secondary"
                onClick={() => {
                  setShowTax(false)
                  updateField('tax_type', '')
                  updateField('tax_amount', 0)
                }}
              />
            </Flex>
          </Flex>
        )}

        {/* Shipping controls */}
        {showShipping && (
          <Flex
            align={{ sm: 'center' }}
            direction={{ base: 'column', sm: 'row' }}
            gap="sm"
            justify="between"
          >
            <Text color="muted">{t('inputs.shipping', 'Shipping')}</Text>
            <Flex align="center" gap="sm">
              <Box width="8rem">
                <CurrencyInput
                  prefix={currencySymbol}
                  value={formData.shipping_amount}
                  variant="plain"
                  onChange={val => updateField('shipping_amount', val || 0)}
                />
              </Box>
              <Button
                dangerous
                icon="tabler:x"
                variant="secondary"
                onClick={() => {
                  setShowShipping(false)
                  updateField('shipping_amount', 0)
                }}
              />
            </Flex>
          </Flex>
        )}

        {/* Final Numbers */}
        <Bordered asChild borderSide="bottom">
          <Flex justify="between" mb="md" mt="lg" pb="md">
            <Text weight="semibold">{t('inputs.total', 'Total')}</Text>
            <Text weight="semibold">
              {currencySymbol}{' '}
              {total.toLocaleString('en-MY', {
                minimumFractionDigits: 2
              })}
            </Text>
          </Flex>
        </Bordered>
        <Flex
          align={{ sm: 'center' }}
          direction={{ base: 'column', sm: 'row' }}
          gap="sm"
          justify="between"
        >
          <Text color="muted">{t('inputs.amountPaid', 'Amount Paid')}</Text>
          <Box width="8rem">
            <CurrencyInput
              prefix={currencySymbol}
              value={formData.amount_paid}
              variant="plain"
              onChange={val => updateField('amount_paid', val || 0)}
            />
          </Box>
        </Flex>
        <Bordered asChild borderSide="top">
          <Flex justify="between" mt="md" pt="md">
            <Text size="lg" weight="bold">
              {t('inputs.balanceDue', 'Balance Due')}
            </Text>
            <Text color="custom-500" size="lg" weight="bold">
              {currencySymbol}{' '}
              {balanceDue.toLocaleString('en-MY', {
                minimumFractionDigits: 2
              })}
            </Text>
          </Flex>
        </Bordered>
      </Stack>
    </Card>
  )
}
