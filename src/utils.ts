import { FontScalePresets, fontScalePresets } from './constants'

export const getNumber = (value: number | string) => {
  if (typeof value === 'number') return value
  return parseFloat(value)
}

export const getFontUnit = (size: string): string => {
  const match = size.match(/px|r?em$/)

  if (!match) {
    throw new Error(
      'Unsupported font unit: Shevy only supports px, em, or rem.'
    )
  }

  return match[0]
}

export const toMax6 = <T>(arr: Array<T>) => {
  if (arr.length > 6) return arr.slice(0, 6)
  return arr
}

export const getFontScale = (
  fontScale: keyof FontScalePresets | Array<number>
): Array<number> => {
  if (Array.isArray(fontScale)) {
    return toMax6(fontScale)
  }

  if (fontScalePresets[fontScale]) {
    return fontScalePresets[fontScale]
  }

  throw new Error(
    `No Font Scale Preset Found for "${fontScale}", the presets available are: "${Object.keys(
      fontScalePresets
    )}"`
  )
}
