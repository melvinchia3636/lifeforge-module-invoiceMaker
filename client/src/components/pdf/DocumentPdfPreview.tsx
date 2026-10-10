import { useEffect, useRef, useState } from 'react'

import { PDFViewer } from '@react-pdf/renderer'

import { Box, LoadingScreen } from '@lifeforge/ui'

import { usePdfDocumentAssets } from './shared/usePdfDocumentAssets'

const BOTTOM_GAP = 24

function DocumentPdfPreview({
  logoKey,
  children
}: {
  logoKey?: string
  children: (logoSrc?: string) => React.ReactElement
}) {
  const { logoSrc, ready } = usePdfDocumentAssets(logoKey)
  const containerRef = useRef<HTMLElement>(null)
  const [availableHeight, setAvailableHeight] = useState<number>()

  useEffect(() => {
    function update() {
      const element = containerRef.current

      if (!element) {
        return
      }

      setAvailableHeight(
        window.innerHeight - element.getBoundingClientRect().top - BOTTOM_GAP
      )
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      height={availableHeight ? `${availableHeight}px` : undefined}
      minHeight="0"
      width="100%"
    >
      {ready ? (
        <PDFViewer
          showToolbar={false}
          style={{ width: '100%', height: '100%' }}
        >
          {children(logoSrc) as React.ComponentProps<typeof PDFViewer>['children']}
        </PDFViewer>
      ) : (
        <LoadingScreen />
      )}
    </Box>
  )
}

export default DocumentPdfPreview
