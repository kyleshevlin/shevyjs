import { defaultOptions, headings } from './constants'

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
    this.baseLineHeight = baseLineHeight
    this.baseFontScale = baseFontScale
    this.addMarginBottom = addMarginBottom
    this.proximity = proximity
    this.proximityFactor = proximityFactor

    // Binding methods
    this.calcFontSize = this.calcFontSize.bind(this)
    this.baseSpacing = this.baseSpacing.bind(this)
    this.bs = this.bs.bind(this)

    // Set headings
    baseFontScale.forEach((factor, index) => {
      const heading = headings[index]
      this[heading] = {
        fontSize: this.calcFontSize(factor)
      }
    })
  }

  calcFontSize (factor) {
    const fontValue = parseFloat(this.baseFontSize)
    const fontUnit = this.baseFontSize.match(/(em)|(rem)/)

    return fontUnit
      ? `${fontValue * factor}${fontUnit[0]}`
      : fontValue * factor
  }

  baseSpacing (factor = 1) {
    const {
      baseFontSize,
      baseLineHeight,
      proximity,
      proximityFactor
    } = this
    const spacing = parseFloat(baseFontSize) * baseLineHeight * factor

    return proximity ? (spacing * proximityFactor) : spacing
  }

  bs (factor = 1) {
    return this.baseSpacing(factor)
  }
}
