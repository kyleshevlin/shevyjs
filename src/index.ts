import { FontScalePresets } from './constants'
import { getFontScale, getFontUnit, getNumber } from './utils'

type ShevyOptions = {
  baseFontSize?: string
  baseLineHeight?: number
  fontScale?: Array<number> | keyof FontScalePresets
  includeMarginBottom?: boolean
  proximity?: null | number
  precision?: null | number
}

type ShevyStyles = {
  fontSize?: string
  lineHeight?: number | string
  marginBottom?: string
}

type Shevy = {
  baseSpacing: (factor?: number) => string
  lineHeightSpacing: (factor?: number) => string
  body: ShevyStyles
  content: ShevyStyles
  h1: ShevyStyles
  h2: ShevyStyles
  h3: ShevyStyles
  h4: ShevyStyles
  h5: ShevyStyles
  h6: ShevyStyles
}

const defaultOptions = {
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  fontScale: [3, 2.5, 2, 1.5, 1.25, 1],
  includeMarginBottom: true,
  proximity: null,
  precision: null,
}

const UNDEFINED_STYLE = {
  fontSize: undefined,
  lineHeight: undefined,
  marginBottom: undefined,
}

/**
 * Factory function that returns a Shevy object
 */
export function createShevy(options: ShevyOptions = {}): Shevy {
  const config = { ...defaultOptions, ...options }
  const {
    baseFontSize,
    baseLineHeight,
    fontScale,
    includeMarginBottom,
    precision,
    proximity,
  } = config
  const scaleValues = getFontScale(fontScale)
  const fontUnit = getFontUnit(baseFontSize)

  function applyPrecision(num: number): number {
    return precision ? Number(num.toFixed(precision)) : num
  }

  function getSpacing(factor: number): number {
    const value = getNumber(baseFontSize)
    const spacing = value * baseLineHeight * factor

    return spacing
  }

  function applyProximity(size: number): number {
    if (proximity === null) return size
    return size * proximity
  }

  function applyUnit(size: number): string {
    return `${size}${fontUnit}`
  }

  function getBaseSpacing(factor: number) {
    return applyUnit(applyPrecision(applyProximity(getSpacing(factor))))
  }

  function getHeadingStyle(factor: number | undefined) {
    if (factor === undefined) return UNDEFINED_STYLE

    return {
      fontSize: calculateHeadingFontSize(factor),
      lineHeight: calculateHeadingLineHeight(factor),
      marginBottom: includeMarginBottom
        ? calculateHeadingMarginBottom(factor)
        : undefined,
    }
  }

  function calculateHeadingFontSize(factor: number) {
    const fontValue = factor * getNumber(baseFontSize)
    const fontSize = applyUnit(fontValue)

    return fontSize
  }

  /**
   * Contains the algorithm for determining the line height for headings.
   *
   * Typically, a vertical rhythm would not allow for half-spacings, but
   * this algorithm makes use of them.
   *
   * Only allowing whole-spacings can result in rather large line heights
   * for headings that are _just_ greater than the base spacing.
   *
   * Example: a heading fontSize of 50px but a base spacing of 48px would
   * result in a line height of 1.92.
   *
   * I have found it more aesthetically pleasing to keep the line heights
   * tighter to the font size, and thus increment a half-spacing at a time.
   */
  function calculateHeadingLineHeight(factor: number) {
    const fontValue = factor * getNumber(baseFontSize)
    let spacing = getSpacing(1)

    if (fontValue <= spacing) {
      return applyPrecision(spacing / fontValue)
    }

    let multiplier = 1
    do {
      multiplier += 0.5
      spacing = getSpacing(multiplier)
    } while (spacing < fontValue)

    return applyPrecision(spacing / fontValue)
  }

  function calculateHeadingMarginBottom(factor: number) {
    let margin = applyProximity(getSpacing(1))

    if (fontUnit === 'em') {
      const fontSize = calculateHeadingFontSize(factor)
      const fontValue = getNumber(fontSize)

      margin = margin / fontValue
    }

    return applyUnit(margin)
  }

  const body = {
    fontSize: baseFontSize,
    lineHeight: baseLineHeight,
  }

  const content = {
    fontSize: baseFontSize,
    lineHeight: baseLineHeight,
    marginBottom: includeMarginBottom ? getBaseSpacing(1) : undefined,
  }

  return {
    baseSpacing(factor: number = 1) {
      return getBaseSpacing(factor)
    },

    lineHeightSpacing(factor: number = 1) {
      return applyUnit(applyPrecision(getSpacing(factor)))
    },

    body,
    content,
    h1: getHeadingStyle(scaleValues[0]),
    h2: getHeadingStyle(scaleValues[1]),
    h3: getHeadingStyle(scaleValues[2]),
    h4: getHeadingStyle(scaleValues[3]),
    h5: getHeadingStyle(scaleValues[4]),
    h6: getHeadingStyle(scaleValues[5]),
  }
}
