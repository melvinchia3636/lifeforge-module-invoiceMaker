import {
  Button,
  ContextMenu,
  ContextMenuItem,
  Flex,
  ModuleHeader
} from '@lifeforge/ui'

function DocModuleHeader({
  newButtonLabel,
  onNewClick,
  onManageClients,
  onManageSettings
}: {
  newButtonLabel: string
  onNewClick: () => void
  onManageClients: () => void
  onManageSettings: () => void
}) {
  return (
    <ModuleHeader
      trailing={
        <Flex align="center" gap="sm">
          <Button
            display={{ base: 'none', md: 'flex' }}
            icon="tabler:plus"
            onClick={onNewClick}
          >
            {newButtonLabel}
          </Button>
          <ContextMenu>
            <ContextMenuItem
              icon="tabler:users"
              label="manageClients"
              onClick={onManageClients}
            />
            <ContextMenuItem
              icon="tabler:settings"
              label="settings"
              onClick={onManageSettings}
            />
          </ContextMenu>
        </Flex>
      }
    />
  )
}

export default DocModuleHeader
