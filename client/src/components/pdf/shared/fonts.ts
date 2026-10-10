import { Font } from '@react-pdf/renderer'

import { forgeAPI } from '@/manifest'

let fontFamilyRegistered = false
let fontRegistration: Promise<boolean> | null = null

export function getPdfFontFamily(): string {
  return fontFamilyRegistered ? 'Onest' : 'Helvetica'
}

export function ensurePdfFont(): Promise<boolean> {
  if (fontFamilyRegistered) {
    return Promise.resolve(true)
  }

  if (fontRegistration) {
    return fontRegistration
  }

  fontRegistration = forgeAPI
    .getGoogleFont({ family: 'Onest' })
    .query()
    .then(res => {
      const files = res.items?.[0]?.files

      if (!files) {
        return false
      }

      const fonts = [
        { fontWeight: 300, src: files['300'] },
        { fontWeight: 400, src: files.regular },
        { fontWeight: 500, src: files['500'] },
        { fontWeight: 600, src: files['600'] },
        { fontWeight: 700, src: files['700'] }
      ].filter((font): font is { fontWeight: number; src: string } =>
        Boolean(font.src)
      )

      if (fonts.length === 0) {
        return false
      }

      Font.register({ family: 'Onest', fonts })
      fontFamilyRegistered = true

      return true
    })
    .catch(() => false)

  return fontRegistration
}

export async function resolveMediaDataUrl(
  key?: string
): Promise<string | undefined> {
  if (!key) {
    return undefined
  }

  try {
    const res = await fetch(forgeAPI.getMedia({ key }), {
      credentials: 'include'
    })

    if (!res.ok) {
      return undefined
    }

    const blob = await res.blob()

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return undefined
  }
}
