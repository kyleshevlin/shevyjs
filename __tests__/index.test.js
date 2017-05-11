import Shevy from '../src'

describe('Shevy', () => {
  it('is defined', () => {
    const shevy = new Shevy()
    expect(shevy).toBeDefined()
  })

  describe('Properties', () => {
    const shevy = new Shevy()
    const {
      baseFontSize,
      baseFontUnit,
      baseLineHeight,
      lineHeightSpacing,
      baseSpacing
    } = shevy

    it('baseFontSize', () => { expect(baseFontSize).toBeDefined() })
    it('baseFontUnit', () => { expect(baseFontUnit).toBeDefined() })
    it('baseLineHeight', () => { expect(baseLineHeight).toBeDefined() })
    it('lineHeightSpacing', () => { expect(lineHeightSpacing).toBeDefined() })
    it('baseSpacing', () => { expect(baseSpacing).toBeDefined() })
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

    describe('Body', () => {
      const { body } = shevy

      it('fontSize is 16', () => {
        expect(body.fontSize).toEqual(16)
      })

      it('lineHeight of 1.5', () => {
        expect(body.lineHeight).toEqual(1.5)
      })
    })

    describe('Content', () => {
      const { content } = shevy

      it('fontSize is 16', () => {
        expect(content.fontSize).toEqual(16)
      })

      it('lineHeight is 1.5', () => {
        expect(content.lineHeight).toEqual(1.5)
      })

      it('marginBottom is 24', () => {
        expect(content.marginBottom).toEqual(24)
      })
    })

    describe('Base Font Unit', () => {
      it('should equal px', () => {
        const { baseFontUnit } = shevy
        expect(baseFontUnit()).toEqual('px')
      })
    })

    describe('Base Spacing', () => {
      const { baseSpacing } = shevy

      it('baseSpacing equals 24px', () => {
        expect(baseSpacing()).toEqual(24)
      })
    })
  })

  describe('Custom settings', () => {
    describe('unit: em', () => {
      const customOptions = {
        baseFontSize: '1em',
        baseLineHeight: 2
      }
      const shevy = new Shevy(customOptions)

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('h1', () => { expect(h1.fontSize).toEqual('3em') })
        it('h2', () => { expect(h2.fontSize).toEqual('2.5em') })
        it('h3', () => { expect(h3.fontSize).toEqual('2em') })
        it('h4', () => { expect(h4.fontSize).toEqual('1.5em') })
        it('h5', () => { expect(h5.fontSize).toEqual('1.25em') })
        it('h6', () => { expect(h6.fontSize).toEqual('1em') })
      })

      describe('Body', () => {
        const { body } = shevy

        it('fontSize is 1em', () => {
          expect(body.fontSize).toEqual('1em')
        })

        it('lineHeight of 2', () => {
          expect(body.lineHeight).toEqual(2)
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('fontSize is 1rem', () => {
          expect(content.fontSize).toEqual('1em')
        })

        it('lineHeight is 2', () => {
          expect(content.lineHeight).toEqual(2)
        })

        it('marginBottom is 2em', () => {
          expect(content.marginBottom).toEqual('2em')
        })
      })
    })

    describe('unit: rem', () => {
      const customOptions = {
        baseFontSize: '1rem',
        baseLineHeight: 2
      }
      const shevy = new Shevy(customOptions)

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('h1', () => { expect(h1.fontSize).toEqual('3rem') })
        it('h2', () => { expect(h2.fontSize).toEqual('2.5rem') })
        it('h3', () => { expect(h3.fontSize).toEqual('2rem') })
        it('h4', () => { expect(h4.fontSize).toEqual('1.5rem') })
        it('h5', () => { expect(h5.fontSize).toEqual('1.25rem') })
        it('h6', () => { expect(h6.fontSize).toEqual('1rem') })
      })

      describe('Body', () => {
        const { body } = shevy

        it('fontSize is 1rem', () => {
          expect(body.fontSize).toEqual('1rem')
        })

        it('lineHeight of 2', () => {
          expect(body.lineHeight).toEqual(2)
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('fontSize is 1rem', () => {
          expect(content.fontSize).toEqual('1rem')
        })

        it('lineHeight is 2', () => {
          expect(content.lineHeight).toEqual(2)
        })

        it('marginBottom is 2rem', () => {
          expect(content.marginBottom).toEqual('2rem')
        })
      })
    })
  })
})
