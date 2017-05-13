import * as utils from '../../src/utils'

describe('Utils', () => {
  describe('getFontValue', () => {
    const { getFontValue } = utils

    it('returns a number of correct value', () => {
      const size = '16px'
      const value = getFontValue(size)

      expect(typeof value).toEqual('number')
      expect(value).toEqual(16)
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
      expect(() => { getFontUnit('1vw') }).toThrow()
    })
  })

  describe('trimArrayToMaxOf6', () => {
    const { trimArrayToMaxOf6 } = utils

    describe('array.length < 6', () => {
      const array = [1, 2, 3]

      it('returns array without modification', () => {
        expect(trimArrayToMaxOf6(array)).toEqual(array)
      })
    })

    describe('array.length === 6', () => {
      const array = [1, 2, 3, 4, 5, 6]

      it('returns array without modification', () => {
        expect(trimArrayToMaxOf6(array)).toEqual(array)
      })
    })

    describe('array.length > 6', () => {
      const array = [1, 2, 3, 4, 5, 6, 7]

      it('returns array with length === 6 and values removed from the end', () => {
        const trimmedArray = trimArrayToMaxOf6(array)
        const expectedArray = [1, 2, 3, 4, 5, 6]

        expect(trimmedArray.length).toEqual(6)
        expect(trimmedArray).toEqual(expectedArray)
      })
    })
  })
})
