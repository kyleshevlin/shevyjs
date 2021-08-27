import * as utils from '../src/utils'
import { fontScalePresets } from '../src/constants'

describe('getNumber', () => {
  const { getNumber } = utils

  it('should pass through a number', () => {
    expect(getNumber(6)).toEqual(6)
    expect(getNumber(6.67)).toEqual(6.67)
  })

  it('should convert string to float', () => {
    expect(getNumber('16px')).toEqual(16)
    expect(getNumber('1.25em')).toEqual(1.25)
  })
})

describe('getFontUnit', () => {
  const { getFontUnit } = utils

  describe('returns a string of correct unit type', () => {
    it('for px', () => {
      const unit = getFontUnit('16px')
      expect(unit).toEqual('px')
    })

    it('for em', () => {
      const unit = getFontUnit('1em')
      expect(unit).toEqual('em')
    })

    it('for rem', () => {
      const unit = getFontUnit('1rem')
      expect(unit).toEqual('rem')
    })
  })

  it('throws error for unsupported unit', () => {
    expect(() => {
      getFontUnit('1vw')
    }).toThrow()
  })
})

describe('getFontScale', () => {
  const { getFontScale } = utils

  describe('baseFontScale as an array', () => {
    const baseFontScaleAsArray = [1, 2, 3, 4, 5, 6]

    it('returns array without modification', () => {
      expect(getFontScale(baseFontScaleAsArray)).toEqual(baseFontScaleAsArray)
    })
  })

  describe('baseFontScale as a string', () => {
    const baseFontScaleAsString = 'perfectFourth'

    it('returns an array from fontScalePresets matching key', () => {
      expect(getFontScale(baseFontScaleAsString)).toEqual(
        fontScalePresets.perfectFourth
      )
    })

    it('throws an error if key is not found', () => {
      expect(() => {
        // @ts-expect-error
        getFontScale('not_a_preset')
      }).toThrow(/No Font Scale Preset Found/)
    })
  })
})

describe('toMax6', () => {
  const { toMax6 } = utils

  expect(toMax6([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
  expect(toMax6([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5, 6])
  expect(toMax6([1, 2])).toEqual([1, 2])
})
