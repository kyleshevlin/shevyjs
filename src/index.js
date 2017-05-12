import { defaultOptions, headings } from './constants'

const emOrRemRegex = /(em)|(rem)/

const getFontValue = size => {
  return parseFloat(size)
}

const getFontUnit = size => {
  const match = size.match(emOrRemRegex)
  return match ? match[0] : 'px'
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
    this.baseFontScale = baseFontScale
    this.addMarginBottom = addMarginBottom
    this.proximity = proximity
    this.proximityFactor = proximityFactor

    // Binding methods
    this.calcHeadingFontSize = this.calcHeadingFontSize.bind(this)
    this.lineHeightSpacing = this.lineHeightSpacing.bind(this)
    this.baseSpacing = this.baseSpacing.bind(this)

    // Set headings
    baseFontScale.forEach((factor, index) => {
      const heading = headings[index]
      this[heading] = {
        fontSize: this.calcHeadingFontSize(factor)
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
