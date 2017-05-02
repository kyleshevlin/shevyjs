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

  describe('Headings', () => {
    const shevy = new Shevy()
    const { h1, h2, h3, h4, h5, h6 } = shevy

    it('h1', () => {
      expect(h1).toBeDefined()
      expect(h1.fontSize).toEqual(48)
    })

    it('h2', () => {
      expect(h2).toBeDefined()
      expect(h2.fontSize).toEqual(40)
    })

    it('h3', () => {
      expect(h3).toBeDefined()
      expect(h3.fontSize).toEqual(32)
    })

    it('h4', () => {
      expect(h4).toBeDefined()
      expect(h4.fontSize).toEqual(24)
    })

    it('h5', () => {
      expect(h5).toBeDefined()
      expect(h5.fontSize).toEqual(20)
    })

    it('h6', () => {
      expect(h6).toBeDefined()
      expect(h6.fontSize).toEqual(16)
    })
  })
})
