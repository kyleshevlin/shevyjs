import { fontScalePresets } from '../constants'

export const parseNumber = (thisArg, value) => {
  const { precision, usePrecision } = thisArg
  const float = parseFloat(value)

  return usePrecision ? Number(float.toFixed(precision)) : float
}

export const getFontValue = (thisArg, size) => {
  return parseNumber(thisArg, size)
}

export const getFontUnit = (size) => {
  const match = size.match(/px|r?em$/)

  if (!match) {
    throw new Error(
      'Unsupported font unit: Shevy only supports px, em, or rem.'
    )
  }

  return match[0]
}

export const trimArrayToMaxOf6 = (array) => {
  return array.length <= 6 ? array : array.slice(0, 6)
}

export const getFontScale = (fontScale) => {
  if (Array.isArray(fontScale)) {
    return trimArrayToMaxOf6(fontScale)
  }

  if (fontScalePresets[fontScale]) {
    return fontScalePresets[fontScale]
  } else {
    throw new Error(
      `No Font Scale Preset Found for "${fontScale}", the presets available are: "${Object.keys(
        fontScalePresets
      )}"`
    )
  }
}

export function calcHeadingFontSize(thisArg, factor) {
  const { baseFontSize } = thisArg
  const value = getFontValue(thisArg, baseFontSize)
  const unit = getFontUnit(baseFontSize)

  return `${value * factor}${unit}`
}

export function calcHeadingLineHeight(thisArg, factor) {
  const { lineHeightSpacing } = thisArg
  const fontSize = calcHeadingFontSize(thisArg, factor)
  const fontValue = getFontValue(thisArg, fontSize)
  const spacing = lineHeightSpacing()
  const spacingValue = getFontValue(thisArg, spacing)
  let lineHeight = 0
  let multiplier = 1

  if (fontValue <= spacingValue) {
    lineHeight = spacingValue / fontValue
  } else {
    while (getFontValue(thisArg, lineHeightSpacing(multiplier)) < fontValue) {
      multiplier += 0.5
    }

    lineHeight =
      getFontValue(thisArg, lineHeightSpacing(multiplier)) / fontValue
  }

  return parseNumber(thisArg, lineHeight)
}

export function calcHeadingMarginBottom(thisArg, factor, addMarginBottom) {
  if (!addMarginBottom) {
    return undefined
  }

  const { baseSpacing } = thisArg
  const spacing = baseSpacing()
  const spacingUnit = getFontUnit(spacing)

  if (spacingUnit === 'em') {
    const fontSize = calcHeadingFontSize(thisArg, factor)
    const fontValue = getFontValue(thisArg, fontSize)
    const spacingValue = getFontValue(thisArg, spacing)

    return `${parseNumber(thisArg, spacingValue / fontValue)}${spacingUnit}`
  } else {
    return spacing
  }
}
