import { defaultOptions, headings } from './constants'

const emOrRemRegex = /r?em$/

const getFontValue = size => {
  return parseFloat(size)
}

const getFontUnit = size => {
  const match = size.match(emOrRemRegex)
  return match ? match[0] : 'px'
}

const trimArrayTo6 = array => {
  return array.length <= 6 ? array : array.slice(0, 6)
}

export default class Shevy {
  constructor(options) {
    const mergedOptions = { ...defaultOptions, ...options }
    const {
      baseFontSize,
      baseLineHeight,
      baseFontScale,
      addMarginBottom,
      proximity,
      proximityFactor
    } = mergedOptions

    this.baseFontSize = baseFontSize
    this.baseFontUnit = getFontUnit(baseFontSize)
    this.baseLineHeight = baseLineHeight
    this.baseFontScale = trimArrayTo6(baseFontScale)
    this.addMarginBottom = addMarginBottom
    this.proximity = proximity
    this.proximityFactor = proximityFactor

    // Binding methods
    this.calcHeadingFontSize = this.calcHeadingFontSize.bind(this)
    this.calcHeadingLineHeight = this.calcHeadingLineHeight.bind(this)
    this.calcHeadingMarginBottom = this.calcHeadingMarginBottom.bind(this)
    this.lineHeightSpacing = this.lineHeightSpacing.bind(this)
    this.baseSpacing = this.baseSpacing.bind(this)

    // Set headings
    baseFontScale.forEach((factor, index) => {
      const heading = headings[index]
      this[heading] = {
        fontSize: this.calcHeadingFontSize(factor),
        lineHeight: this.calcHeadingLineHeight(factor),
        marginBottom: this.calcHeadingMarginBottom(factor, addMarginBottom)
      }
    })

    // Set Body
    this.body = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight
    }

    // Set Content Elements
    this.content = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight,
      marginBottom: addMarginBottom ? this.baseSpacing() : undefined
    }
  }

  calcHeadingFontSize (factor) {
    const { baseFontSize } = this
    const value = getFontValue(baseFontSize)
    const unit = getFontUnit(baseFontSize)

    return `${value * factor}${unit}`
  }

  calcHeadingLineHeight (factor) {
    const {
      calcHeadingFontSize,
      lineHeightSpacing
    } = this
    const fontSize = calcHeadingFontSize(factor)
    const fontValue = getFontValue(fontSize)
    const spacing = lineHeightSpacing()
    const spacingValue = getFontValue(spacing)
    let lineHeight = 0
    let multiplier = 1

    if (fontValue <= spacingValue) {
      lineHeight = spacingValue / fontValue
    } else {
      while (getFontValue(lineHeightSpacing(multiplier)) < fontValue) {
        multiplier += .5
      }

      lineHeight = getFontValue(lineHeightSpacing(multiplier)) / fontValue
    }

    return lineHeight
  }

  calcHeadingMarginBottom (factor, addMarginBottom) {
    if (!addMarginBottom) {
      return undefined
    }

    const spacing = this.baseSpacing()
    const spacingUnit = getFontUnit(spacing)

    if (spacingUnit === 'em') {
      const fontSize = this.calcHeadingFontSize(factor)
      const fontValue = getFontValue(fontSize)
      const spacingValue = getFontValue(spacing)

      return `${spacingValue / fontValue}${spacingUnit}`
    } else {
      return spacing
    }
  }

  lineHeightSpacing (factor = 1) {
    const { baseFontSize, baseLineHeight } = this
    const value = getFontValue(baseFontSize)
    const unit = getFontUnit(baseFontSize)

    return `${value * baseLineHeight * factor}${unit}`
  }

  baseSpacing (factor = 1) {
    const {
      baseFontSize,
      baseLineHeight,
      proximity,
      proximityFactor
    } = this
    const value = getFontValue(baseFontSize)
    const unit = getFontUnit(baseFontSize)
    let spacing = value * baseLineHeight * factor

    if (proximity) {
      spacing = spacing * proximityFactor
    }

    return `${spacing}${unit}`
  }
}
