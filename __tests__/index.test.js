import Shevy from '../src'

describe('Shevy', () => {
  it('is defined', () => {
    const shevy = new Shevy()
    expect(shevy).toBeDefined()
  })

  describe('Default settings', () => {
    const shevy = new Shevy()

    it('baseFontSize is 16px', () => {
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

    describe('Headings', () => {
      const { h1, h2, h3, h4, h5, h6 } = shevy

      it('h1', () => { expect(h1.fontSize).toEqual(48) })
      it('h2', () => { expect(h2.fontSize).toEqual(40) })
      it('h3', () => { expect(h3.fontSize).toEqual(32) })
      it('h4', () => { expect(h4.fontSize).toEqual(24) })
      it('h5', () => { expect(h5.fontSize).toEqual(20) })
      it('h6', () => { expect(h6.fontSize).toEqual(16) })
    })

    describe('Base Spacing', () => {
      const { baseSpacing, bs } = shevy

      it('baseSpacing is defined', () => { expect(baseSpacing).toBeDefined() })
      it('bs is defined', () => { expect(bs).toBeDefined() })
      it('baseSpacing equals 24px', () => {
        expect(baseSpacing()).toEqual(24)
      })
      it('bs equals 24px', () => {
        expect(bs()).toEqual(24)
      })
    })
  })

  describe('Custom settings', () => {
    describe('unit: em', () => {
      const customOptions = { baseFontSize: '1em' }
      const shevy = new Shevy(customOptions)
      const { h1, h2, h3, h4, h5, h6 } = shevy

      it('h1', () => { expect(h1.fontSize).toEqual('3em') })
      it('h2', () => { expect(h2.fontSize).toEqual('2.5em') })
      it('h3', () => { expect(h3.fontSize).toEqual('2em') })
      it('h4', () => { expect(h4.fontSize).toEqual('1.5em') })
      it('h5', () => { expect(h5.fontSize).toEqual('1.25em') })
      it('h6', () => { expect(h6.fontSize).toEqual('1em') })
    })

    describe('unit: rem', () => {
      const customOptions = { baseFontSize: '1rem' }
      const shevy = new Shevy(customOptions)
      const { h1, h2, h3, h4, h5, h6 } = shevy

      it('h1', () => { expect(h1.fontSize).toEqual('3rem') })
      it('h2', () => { expect(h2.fontSize).toEqual('2.5rem') })
      it('h3', () => { expect(h3.fontSize).toEqual('2rem') })
      it('h4', () => { expect(h4.fontSize).toEqual('1.5rem') })
      it('h5', () => { expect(h5.fontSize).toEqual('1.25rem') })
      it('h6', () => { expect(h6.fontSize).toEqual('1rem') })
    })
  })
})
