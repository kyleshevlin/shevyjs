import { defaultOptions, headings } from './constants'

const emOrRemRegex = /(em)|(rem)/

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
    this.baseFontUnit = this.baseFontUnit.bind(this)
    this.baseSpacing = this.baseSpacing.bind(this)

    // Set headings
    baseFontScale.forEach((factor, index) => {
      const heading = headings[index]
      this[heading] = {
        fontSize: this.calcFontSize(factor)
      }
    })
  }

  calcFontSize (factor) {
    const { baseFontSize } = this
    const fontValue = parseFloat(baseFontSize)
    const fontUnit = baseFontSize.match(emOrRemRegex)

    return fontUnit
      ? `${fontValue * factor}${fontUnit[0]}`
      : fontValue * factor
  }

  baseFontUnit () {
    const emOrRem = this.baseFontSize.match(emOrRemRegex)
    return emOrRem ? emOrRem : 'px'
  }

  lineHeightSpacing (factor = 1) {
    const { baseFontSize, baseLineHeight } = this
    return parseFloat(baseFontSize) * baseLineHeight * factor
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
}
