import { defaultOptions, headings } from './constants'
import {
  getFontValue,
  getFontUnit,
  trimArrayTo6,
  calcHeadingFontSize,
  calcHeadingLineHeight,
  calcHeadingMarginBottom
} from './utils'

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
    this.lineHeightSpacing = this.lineHeightSpacing.bind(this)
    this.baseSpacing = this.baseSpacing.bind(this)

    // Set headings
    baseFontScale.forEach((factor, index) => {
      const heading = headings[index]
      this[heading] = {
        fontSize: calcHeadingFontSize(this, factor),
        lineHeight: calcHeadingLineHeight(this, factor),
        marginBottom: calcHeadingMarginBottom(this, factor, addMarginBottom)
      }
    })

    // Set Body
    this.body = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight
    }

    // Set Content
    this.content = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight,
      marginBottom: addMarginBottom ? this.baseSpacing() : undefined
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
