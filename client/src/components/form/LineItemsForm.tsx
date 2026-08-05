import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Button,
  Card,
  CurrencyInput,
  Flex,
  Grid,
  NumberInput,
  Stack,
  Text,
  TextAreaInput,
  WithDivide
} from '@lifeforge/ui'

export interface LineItem {
  id?: string
  description: string
  quantity: number
  rate: number
  order: number
}

interface LineItemsFormProps {
  items: LineItem[]
  currencySymbol: string
  onUpdateLineItem: (index: number, field: keyof LineItem, value: any) => void
  onRemoveLineItem: (index: number) => void
  onAddLineItem: () => void
}

export default function LineItemsForm({
  items,
  currencySymbol,
  onUpdateLineItem,
  onRemoveLineItem,
  onAddLineItem
}: LineItemsFormProps) {
  const { t } = useModuleTranslation()

  return (
    <Card>
      {/* Desktop header - hidden on mobile */}
      <Box
        bg={{ base: 'bg-300', dark: 'bg-700' }}
        display={{ base: 'none', lg: 'block' }}
        p="md"
      >
        <Grid gap="md" templateCols="repeat(12, 1fr)">
          <Box gridColumnSpan={6}>
            <Text
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="sm"
              weight="medium"
            >
              {t('inputs.item')}
            </Text>
          </Box>
          <Box gridColumnSpan={2}>
            <Text
              align="center"
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="sm"
              weight="medium"
            >
              {t('inputs.quantity')}
            </Text>
          </Box>
          <Box gridColumnSpan={2}>
            <Text
              align="center"
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="sm"
              weight="medium"
            >
              {t('inputs.rate')}
            </Text>
          </Box>
          <Box gridColumnSpan={2} pr="xl">
            <Text
              align="right"
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="sm"
              weight="medium"
            >
              {t('inputs.amount')}
            </Text>
          </Box>
        </Grid>
      </Box>

      <Stack gap="none" pt={{ base: 'none', lg: 'md' }}>
        {items.map((item, index) => (
          <WithDivide key={index} axis="y">
            <Box position="relative" py={{ base: 'lg', lg: 'md' }}>
              {/* Mobile layout - stacked */}
              <Stack display={{ base: 'flex', lg: 'none' }} gap="sm">
                <Box>
                  <Text
                    as="label"
                    color="muted"
                    display="block"
                    mb="xs"
                    size="sm"
                  >
                    {t('inputs.item')}
                  </Text>
                  <TextAreaInput
                    placeholder="Item description"
                    value={item.description}
                    variant="plain"
                    onChange={val =>
                      onUpdateLineItem(index, 'description', val)
                    }
                  />
                </Box>
                <Grid gap="sm" templateCols={{ base: 1, sm: 2 }}>
                  <Box>
                    <Text
                      as="label"
                      color="muted"
                      display="block"
                      mb="xs"
                      size="sm"
                    >
                      {t('inputs.quantity')}
                    </Text>
                    <NumberInput
                      icon=""
                      label=""
                      min={0}
                      value={item.quantity}
                      variant="plain"
                      onChange={val =>
                        onUpdateLineItem(index, 'quantity', val || 0)
                      }
                    />
                  </Box>
                  <Box>
                    <Text
                      as="label"
                      color="muted"
                      display="block"
                      mb="xs"
                      size="sm"
                    >
                      {t('inputs.rate')}
                    </Text>
                    <CurrencyInput
                      prefix={currencySymbol}
                      value={item.rate}
                      variant="plain"
                      onChange={val =>
                        onUpdateLineItem(index, 'rate', val || 0)
                      }
                    />
                  </Box>
                </Grid>
                <Flex align="center" justify="between">
                  <Text color="muted">{t('inputs.amount')}:</Text>
                  <Text weight="medium">
                    {currencySymbol}{' '}
                    {(item.quantity * item.rate).toLocaleString('en-MY', {
                      minimumFractionDigits: 2
                    })}
                  </Text>
                </Flex>
              </Stack>

              {/* Desktop layout - grid */}
              <Grid
                align="center"
                display={{ base: 'none', lg: 'grid' }}
                gap="md"
                templateCols="repeat(12, 1fr)"
              >
                <Box gridColumnSpan={6}>
                  <TextAreaInput
                    placeholder="Item description"
                    value={item.description}
                    variant="plain"
                    onChange={val =>
                      onUpdateLineItem(index, 'description', val)
                    }
                  />
                </Box>
                <Box gridColumnSpan={2}>
                  <NumberInput
                    icon=""
                    label=""
                    min={0}
                    value={item.quantity}
                    variant="plain"
                    onChange={val =>
                      onUpdateLineItem(index, 'quantity', val || 0)
                    }
                  />
                </Box>
                <Box gridColumnSpan={2}>
                  <CurrencyInput
                    icon=""
                    label=""
                    prefix={currencySymbol}
                    value={item.rate}
                    variant="plain"
                    onChange={val => onUpdateLineItem(index, 'rate', val || 0)}
                  />
                </Box>
                <Box gridColumnSpan={2} pr="xl">
                  <Text align="right" weight="medium">
                    {currencySymbol}{' '}
                    {(item.quantity * item.rate).toLocaleString('en-MY', {
                      minimumFractionDigits: 2
                    })}
                  </Text>
                </Box>
              </Grid>

              {/* Delete button */}
              <Box
                position="absolute"
                right="0"
                style={{
                  transform: 'translateY(-50%)'
                }}
                top="50%"
              >
                <Button
                  icon="tabler:trash"
                  variant="plain"
                  onClick={() => onRemoveLineItem(index)}
                />
              </Box>
            </Box>
          </WithDivide>
        ))}
      </Stack>
      <Box p="md">
        <Button
          icon="tabler:plus"
          variant="secondary"
          width="100%"
          onClick={onAddLineItem}
        >
          inputs.addLineItem
        </Button>
      </Box>
    </Card>
  )
}
