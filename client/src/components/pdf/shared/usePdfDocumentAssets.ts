import { useEffect, useState } from 'react'

import { ensurePdfFont, resolveMediaDataUrl } from './fonts'

export function usePdfDocumentAssets(logoKey?: string): {
  logoSrc?: string
  ready: boolean
} {
  const [assets, setAssets] = useState<{ logoSrc?: string; ready: boolean }>({
    ready: false
  })

  useEffect(() => {
    const state = { active: true }

    void (async () => {
      await ensurePdfFont()

      const logoSrc = await resolveMediaDataUrl(logoKey)

      if (state.active) {
        setAssets({ logoSrc, ready: true })
      }
    })()

    return () => {
      state.active = false
    }
  }, [logoKey])

  return assets
}
