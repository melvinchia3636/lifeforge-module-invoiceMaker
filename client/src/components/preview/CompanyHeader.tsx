import { Bordered, Box, Flex, Text } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

interface CompanySettings {
  collectionId: string
  id: string
  default_logo?: string
  company_name?: string
  company_reg_no?: string
  company_address?: string
  company_tel_no?: string
  company_email?: string
}

interface CompanyHeaderProps {
  settings: CompanySettings
  title: string
}

export default function CompanyHeader({
  settings,
  title
}: CompanyHeaderProps) {
  return (
    <Flex direction="column" mb="lg" width="100%">
      <Bordered
        borderColor="bg-950"
        borderSide="bottom"
        borderWidth="1px"
        pb="md"
        width="100%"
      >
        <Flex align="center" gap="lg" width="100%">
          {settings.default_logo && (
            <Box asChild height="5rem" width="auto">
              <img
                alt="Logo"
                src={forgeAPI.getMedia({
                  collectionId: settings.collectionId,
                  recordId: settings.id,
                  fieldId: settings.default_logo
                })}
                style={{
                  objectFit: 'contain'
                }}
              />
            </Box>
          )}
          <Flex direction="column" gap="none">
            <Text size="xl" weight="bold">
              {settings.company_name}
            </Text>
            {settings.company_reg_no && (
              <Text style={{ color: '#3f3f46' }}>
                Business Reg. No.: {settings.company_reg_no}
              </Text>
            )}
            {settings.company_address && (
              <Text style={{ color: '#3f3f46' }}>
                Address: {settings.company_address}
              </Text>
            )}
            {settings.company_tel_no && (
              <Text style={{ color: '#3f3f46' }}>
                Tel: {settings.company_tel_no}
              </Text>
            )}
            {settings.company_email && (
              <Text style={{ color: '#3f3f46' }}>
                Email: {settings.company_email}
              </Text>
            )}
          </Flex>
        </Flex>
      </Bordered>
      <Text
        align="center"
        mt="md"
        style={{
          fontSize: '32px',
          fontWeight: 300,
          letterSpacing: '0.05em'
        }}
      >
        {title}
      </Text>
    </Flex>
  )
}
