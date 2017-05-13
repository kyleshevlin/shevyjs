import Shevy from '../src'

describe('Shevy', () => {
  it('is defined', () => {
    const shevy = new Shevy()
    expect(shevy).toBeDefined()
  })

  describe('Defined Properties', () => {
    const shevy = new Shevy()
    const {
      baseFontSize,
      baseFontUnit,
      baseLineHeight,
      baseFontScale,
      addMarginBottom,
      proximity,
      proximityFactor,
      lineHeightSpacing,
      baseSpacing,
      body,
      content
    } = shevy

    it('baseFontSize', () => { expect(baseFontSize).toBeDefined() })
    it('baseFontUnit', () => { expect(baseFontUnit).toBeDefined() })
    it('baseLineHeight', () => { expect(baseLineHeight).toBeDefined() })
    it('baseFontScale', () => { expect(baseFontScale).toBeDefined() })
    it('addMarginBottom', () => { expect(addMarginBottom).toBeDefined() })
    it('addMarginBottom', () => { expect(addMarginBottom).toBeDefined() })
    it('proximity', () => { expect(proximity).toBeDefined() })
    it('proximityFactor', () => { expect(proximityFactor).toBeDefined() })
    it('body', () => { expect(body).toBeDefined() })
    it('content', () => { expect(content).toBeDefined() })
    it('lineHeightSpacing', () => { expect(lineHeightSpacing).toBeDefined() })
    it('baseSpacing', () => { expect(baseSpacing).toBeDefined() })
  })

  describe('Default settings', () => {
    const shevy = new Shevy()

    describe('Property Values', () => {
      it('baseFontSize is 16px', () => {
        expect(shevy.baseFontSize).toEqual('16px')
      })

      it('baseFontUnit is px', () => {
        expect(shevy.baseFontUnit).toEqual('px')
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
      const { h1, h2, h3, h4, h5, h6 } = shevy

      describe('h1', () => {
        it('fontSize is 48px', () => { expect(h1.fontSize).toEqual('48px') })
        it('lineHeight is 60px', () => { expect(h1.lineHeight).toEqual('48px') })
        it('marginBottom is 24px', () => { expect(h1.marginBottom).toEqual('24px') })
      })
      describe('h2', () => {
        it('fontSize is 40px', () => { expect(h2.fontSize).toEqual('40px') })
        it('lineHeight is 48px', () => { expect(h2.lineHeight).toEqual('48px') })
        it('marginBottom is 24px', () => { expect(h2.marginBottom).toEqual('24px') })
      })
      describe('h3', () => {
        it('fontSize is 32px', () => { expect(h3.fontSize).toEqual('32px') })
        it('lineHeight is 36px', () => { expect(h3.lineHeight).toEqual('36px') })
        it('marginBottom is 24px', () => { expect(h3.marginBottom).toEqual('24px') })
      })
      describe('h4', () => {
        it('fontSize is 24px', () => { expect(h4.fontSize).toEqual('24px') })
        it('lineHeight is 24px', () => { expect(h4.lineHeight).toEqual('24px') })
        it('marginBottom is 24px', () => { expect(h4.marginBottom).toEqual('24px') })
      })
      describe('h5', () => {
        it('fontSize is 20px', () => { expect(h5.fontSize).toEqual('20px') })
        it('lineHeight is 24px', () => { expect(h5.lineHeight).toEqual('24px') })
        it('marginBottom is 24px', () => { expect(h5.marginBottom).toEqual('24px') })
      })
      describe('h6', () => {
        it('fontSize is 16px', () => { expect(h6.fontSize).toEqual('16px') })
        it('lineHeight is 24px', () => { expect(h6.lineHeight).toEqual('24px') })
        it('marginBottom is 24px', () => { expect(h6.marginBottom).toEqual('24px') })
      })
    })

    describe('Body', () => {
      const { body } = shevy

      it('fontSize is 16px', () => {
        expect(body.fontSize).toEqual('16px')
      })

      it('lineHeight of 1.5', () => {
        expect(body.lineHeight).toEqual(1.5)
      })
    })

    describe('Content', () => {
      const { content } = shevy

      it('fontSize is 16px', () => {
        expect(content.fontSize).toEqual('16px')
      })

      it('lineHeight is 1.5', () => {
        expect(content.lineHeight).toEqual(1.5)
      })

      it('marginBottom is 24px', () => {
        expect(content.marginBottom).toEqual('24px')
      })
    })

    describe('Methods', () => {
      it('lineHeightSpacing returns 24px', () => {
        expect(shevy.lineHeightSpacing()).toEqual('24px')
      })

      it('baseSpacing returns 24px', () => {
        expect(shevy.baseSpacing()).toEqual('24px')
      })
    })
  })

  describe('Custom settings', () => {
    describe('unit: em', () => {
      const customOptions = {
        baseFontSize: '1em',
        baseLineHeight: 2,
        baseFontScale: [6, 5, 4, 3, 2, 1],
        addMarginBottom: false,
        proximity: true,
        proximityFactor: .5
      }
      const shevy = new Shevy(customOptions)

      describe('Property Values', () => {
        it('baseFontSize is 1em', () => {
          expect(shevy.baseFontSize).toEqual('1em')
        })

        it('baseFontUnit is em', () => {
          expect(shevy.baseFontUnit).toEqual('em')
        })

        it('baseLineHeight is 2', () => {
          expect(shevy.baseLineHeight).toEqual(2)
        })

        it('baseFontScale is an array matching the custom values', () => {
          const expectedScale = [6, 5, 4, 3, 2, 1]
          expect(shevy.baseFontScale).toEqual(expectedScale)
        })

        it('addMarginBottom is false', () => {
          expect(shevy.addMarginBottom).toEqual(false)
        })

        it('proximity is true', () => {
          expect(shevy.proximity).toEqual(true)
        })

        it('proximityFactor is .5', () => {
          expect(shevy.proximityFactor).toEqual(.5)
        })
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('h1', () => { expect(h1.fontSize).toEqual('6em') })
        it('h2', () => { expect(h2.fontSize).toEqual('5em') })
        it('h3', () => { expect(h3.fontSize).toEqual('4em') })
        it('h4', () => { expect(h4.fontSize).toEqual('3em') })
        it('h5', () => { expect(h5.fontSize).toEqual('2em') })
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

        it('marginBottom is undefined', () => {
          expect(content.marginBottom).toEqual(undefined)
        })
      })

      describe('Methods', () => {
        it('lineHeightSpacing returns 2em', () => {
          expect(shevy.lineHeightSpacing()).toEqual('2em')
        })

        it('baseSpacing returns 1em due to proximityFactor', () => {
          expect(shevy.baseSpacing()).toEqual('1em')
        })
      })
    })

    describe('unit: rem', () => {
      const customOptions = {
        baseFontSize: '1rem',
        baseLineHeight: 2,
        baseFontScale: [6, 5, 4, 3, 2, 1],
        addMarginBottom: true,
        proximity: true,
        proximityFactor: 1.5
      }
      const shevy = new Shevy(customOptions)

      describe('Property Values', () => {
        it('baseFontSize is 1rem', () => {
          expect(shevy.baseFontSize).toEqual('1rem')
        })

        it('baseFontUnit is rem', () => {
          expect(shevy.baseFontUnit).toEqual('rem')
        })

        it('baseLineHeight is 2', () => {
          expect(shevy.baseLineHeight).toEqual(2)
        })

        it('baseFontScale is an array matching the custom values', () => {
          const expectedScale = [6, 5, 4, 3, 2, 1]
          expect(shevy.baseFontScale).toEqual(expectedScale)
        })

        it('addMarginBottom is true', () => {
          expect(shevy.addMarginBottom).toEqual(true)
        })

        it('proximity is true', () => {
          expect(shevy.proximity).toEqual(true)
        })

        it('proximityFactor is 1.5', () => {
          expect(shevy.proximityFactor).toEqual(1.5)
        })
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('h1', () => { expect(h1.fontSize).toEqual('6rem') })
        it('h2', () => { expect(h2.fontSize).toEqual('5rem') })
        it('h3', () => { expect(h3.fontSize).toEqual('4rem') })
        it('h4', () => { expect(h4.fontSize).toEqual('3rem') })
        it('h5', () => { expect(h5.fontSize).toEqual('2rem') })
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

        it('marginBottom is 3rem', () => {
          expect(content.marginBottom).toEqual('3rem')
        })
      })

      describe('Methods', () => {
        it('lineHeightSpacing returns 2rem', () => {
          expect(shevy.lineHeightSpacing()).toEqual('2rem')
        })

        it('baseSpacing returns 3rem due to proximityFactor', () => {
          expect(shevy.baseSpacing()).toEqual('3rem')
        })
      })
    })
  })
})
