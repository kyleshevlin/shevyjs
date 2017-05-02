import Shevy from '../src'

describe('Shevy', () => {
  it('exists', () => {
    const shevy = new Shevy()
    expect(shevy).toBeDefined()
  })

  describe('default settings', () => {
    const shevy = new Shevy()

    it('baseFontSize is 16', () => {
      expect(shevy.baseFontSize).toEqual('16px')
    })

    it('baseLineHeight is 1.5', () => {
      expect(shevy.baseLineHeight).toEqual(1.5)
    })

    it('baseFontScale is an array of default values', () => {
      const expectedScale = [3, 2.5, 2, 1.5, 1.25, 1]
      expect(shevy.baseFontScale).toEqual(expectedScale)
    })

    it('addMarginBottom is true', () => {
      expect(shevy.addMarginBottom).toEqual(true)
    })

    it('proximity is false', () => {
      expect(shevy.proximity).toEqual(false)
    })

    it('proximityFactor is .85', () => {
      expect(shevy.proximityFactor).toEqual(.85)
    })
  })
})
