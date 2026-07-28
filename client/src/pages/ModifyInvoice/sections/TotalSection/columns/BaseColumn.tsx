import { useModuleTranslation } from '@lifeforge/localization'
import { Button, Flex, Text } from '@lifeforge/ui'

interface ColumnProps {
  children: React.ReactNode
  type: 'tax' | 'shipping' | 'discount'
  onHide: () => void
}

function BaseColumn({ children, type, onHide }: ColumnProps) {
  const { t } = useModuleTranslation()

  return (
    <Flex
      align={{ sm: 'center' }}
      direction={{ base: 'column', sm: 'row' }}
      gap="sm"
      justify="between"
    >
      <Text color="muted">{t(`inputs.${type}`)}</Text>
      <Flex align="center" gap="sm">
        {children}
        <Button
          dangerous
          icon="tabler:x"
          variant="secondary"
          onClick={onHide}
        />
      </Flex>
    </Flex>
  )
}

export default BaseColumn
