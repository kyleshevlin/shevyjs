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

      it('proximityFactor is 0.85', () => {
        expect(shevy.proximityFactor).toEqual(0.85)
      })
    })

    describe('Headings', () => {
      const { h1, h2, h3, h4, h5, h6 } = shevy

      describe('h1', () => {
        it('fontSize is 48px', () => { expect(h1.fontSize).toEqual('48px') })
        it('lineHeight is 1', () => { expect(h1.lineHeight).toEqual(1) })
        it('marginBottom is 24px', () => { expect(h1.marginBottom).toEqual('24px') })
      })

      describe('h2', () => {
        it('fontSize is 40px', () => { expect(h2.fontSize).toEqual('40px') })
        it('lineHeight is 1.2', () => { expect(h2.lineHeight).toEqual(1.2) })
        it('marginBottom is 24px', () => { expect(h2.marginBottom).toEqual('24px') })
      })

      describe('h3', () => {
        it('fontSize is 32px', () => { expect(h3.fontSize).toEqual('32px') })
        it('lineHeight is 1.125', () => { expect(h3.lineHeight).toEqual(1.125) })
        it('marginBottom is 24px', () => { expect(h3.marginBottom).toEqual('24px') })
      })

      describe('h4', () => {
        it('fontSize is 24px', () => { expect(h4.fontSize).toEqual('24px') })
        it('lineHeight is 1', () => { expect(h4.lineHeight).toEqual(1) })
        it('marginBottom is 24px', () => { expect(h4.marginBottom).toEqual('24px') })
      })

      describe('h5', () => {
        it('fontSize is 20px', () => { expect(h5.fontSize).toEqual('20px') })
        it('lineHeight is 1.2', () => { expect(h5.lineHeight).toEqual(1.2) })
        it('marginBottom is 24px', () => { expect(h5.marginBottom).toEqual('24px') })
      })

      describe('h6', () => {
        it('fontSize is 16px', () => { expect(h6.fontSize).toEqual('16px') })
        it('lineHeight is 1.5', () => { expect(h6.lineHeight).toEqual(1.5) })
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
      const shevy = new Shevy({
        baseFontSize: '1em'
      })

      describe('Property Values', () => {
        it('baseFontSize is 1em', () => {
          expect(shevy.baseFontSize).toEqual('1em')
        })

        it('baseFontUnit is em', () => {
          expect(shevy.baseFontUnit).toEqual('em')
        })
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        describe('h1', () => {
          it('fontSize is 3em', () => { expect(h1.fontSize).toEqual('3em') })
          it('lineHeight is 1', () => { expect(h1.lineHeight).toEqual(1) })
          it('marginBottom is 0.5em', () => { expect(h1.marginBottom).toEqual('0.5em') })
        })

        describe('h2', () => {
          it('fontSize is 2.5em', () => { expect(h2.fontSize).toEqual('2.5em') })
          it('lineHeight is 1.2', () => { expect(h2.lineHeight).toEqual(1.2) })
          it('marginBottom is 0.6em', () => { expect(h2.marginBottom).toEqual('0.6em') })
        })

        describe('h3', () => {
          it('fontSize is 2em', () => { expect(h3.fontSize).toEqual('2em') })
          it('lineHeight is 1.125', () => { expect(h3.lineHeight).toEqual(1.125) })
          it('marginBottom is 0.75em', () => { expect(h3.marginBottom).toEqual('0.75em') })
        })

        describe('h4', () => {
          it('fontSize is 1.5em', () => { expect(h4.fontSize).toEqual('1.5em') })
          it('lineHeight is 1', () => { expect(h4.lineHeight).toEqual(1) })
          it('marginBottom is 1em', () => { expect(h4.marginBottom).toEqual('1em') })
        })

        describe('h5', () => {
          it('fontSize is 1.25em', () => { expect(h5.fontSize).toEqual('1.25em') })
          it('lineHeight is 1.2', () => { expect(h5.lineHeight).toEqual(1.2) })
          it('marginBottom is 1.2em', () => { expect(h5.marginBottom).toEqual('1.2em') })
        })

        describe('h6', () => {
          it('fontSize is 1em', () => { expect(h6.fontSize).toEqual('1em') })
          it('lineHeight is 1.5', () => { expect(h6.lineHeight).toEqual(1.5) })
          it('marginBottom is 1.5em', () => { expect(h6.marginBottom).toEqual('1.5em') })
        })
      })

      describe('Body', () => {
        const { body } = shevy

        it('fontSize is 1em', () => {
          expect(body.fontSize).toEqual('1em')
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('fontSize is 1em', () => {
          expect(content.fontSize).toEqual('1em')
        })
      })

      describe('Methods', () => {
        it('lineHeightSpacing returns 1.5em', () => {
          expect(shevy.lineHeightSpacing()).toEqual('1.5em')
        })

        it('baseSpacing returns 1.5em', () => {
          expect(shevy.baseSpacing()).toEqual('1.5em')
        })
      })
    })

    describe('unit: rem', () => {
      const shevy = new Shevy({
        baseFontSize: '1rem'
      })

      describe('Property Values', () => {
        it('baseFontSize is 1rem', () => {
          expect(shevy.baseFontSize).toEqual('1rem')
        })

        it('baseFontUnit is rem', () => {
          expect(shevy.baseFontUnit).toEqual('rem')
        })
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        describe('h1', () => {
          it('fontSize is 3rem', () => { expect(h1.fontSize).toEqual('3rem') })
          it('lineHeight is 1', () => { expect(h1.lineHeight).toEqual(1) })
          it('marginBottom is 1.5rem', () => { expect(h1.marginBottom).toEqual('1.5rem') })
        })

        describe('h2', () => {
          it('fontSize is 2.5rem', () => { expect(h2.fontSize).toEqual('2.5rem') })
          it('lineHeight is 1.2', () => { expect(h2.lineHeight).toEqual(1.2) })
          it('marginBottom is 1.5rem', () => { expect(h2.marginBottom).toEqual('1.5rem') })
        })

        describe('h3', () => {
          it('fontSize is 2rem', () => { expect(h3.fontSize).toEqual('2rem') })
          it('lineHeight is 1.125', () => { expect(h3.lineHeight).toEqual(1.125) })
          it('marginBottom is 1.5rem', () => { expect(h3.marginBottom).toEqual('1.5rem') })
        })

        describe('h4', () => {
          it('fontSize is 1.5rem', () => { expect(h4.fontSize).toEqual('1.5rem') })
          it('lineHeight is 1', () => { expect(h4.lineHeight).toEqual(1) })
          it('marginBottom is 1.5rem', () => { expect(h4.marginBottom).toEqual('1.5rem') })
        })

        describe('h5', () => {
          it('fontSize is 1.25rem', () => { expect(h5.fontSize).toEqual('1.25rem') })
          it('lineHeight is 1.2', () => { expect(h5.lineHeight).toEqual(1.2) })
          it('marginBottom is 1.5rem', () => { expect(h5.marginBottom).toEqual('1.5rem') })
        })

        describe('h6', () => {
          it('fontSize is 1rem', () => { expect(h6.fontSize).toEqual('1rem') })
          it('lineHeight is 1.5', () => { expect(h6.lineHeight).toEqual(1.5) })
          it('marginBottom is 1.5rem', () => { expect(h6.marginBottom).toEqual('1.5rem') })
        })
      })

      describe('Body', () => {
        const { body } = shevy

        it('fontSize is 1rem', () => {
          expect(body.fontSize).toEqual('1rem')
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('fontSize is 1rem', () => {
          expect(content.fontSize).toEqual('1rem')
        })
      })

      describe('Methods', () => {
        it('lineHeightSpacing returns 1.5rem', () => {
          expect(shevy.lineHeightSpacing()).toEqual('1.5rem')
        })

        it('baseSpacing returns 1.5rem', () => {
          expect(shevy.baseSpacing()).toEqual('1.5rem')
        })
      })
    })

    describe('baseLineHeight: 2', () => {
      const shevy = new Shevy({
        baseLineHeight: 2
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        describe('h1', () => {
          it('lineHeight is 1', () => { expect(h1.lineHeight).toEqual(1) })
          it('marginBottom is 32px', () => { expect(h1.marginBottom).toEqual('32px') })
        })

        describe('h2', () => {
          it('lineHeight is 1.2', () => { expect(h2.lineHeight).toEqual(1.2) })
          it('marginBottom is 32px', () => { expect(h2.marginBottom).toEqual('32px') })
        })

        describe('h3', () => {
          it('lineHeight is 1', () => { expect(h3.lineHeight).toEqual(1) })
          it('marginBottom is 32px', () => { expect(h3.marginBottom).toEqual('32px') })
        })

        describe('h4', () => {
          it('lineHeight is 1.3333333333333333', () => {
            expect(h4.lineHeight).toEqual(1.3333333333333333)
          })
          it('marginBottom is 32px', () => { expect(h4.marginBottom).toEqual('32px') })
        })

        describe('h5', () => {
          it('lineHeight is 1.6', () => { expect(h5.lineHeight).toEqual(1.6) })
          it('marginBottom is 32px', () => { expect(h5.marginBottom).toEqual('32px') })
        })

        describe('h6', () => {
          it('lineHeight is 2', () => { expect(h6.lineHeight).toEqual(2) })
          it('marginBottom is 32px', () => { expect(h6.marginBottom).toEqual('32px') })
        })
      })
    })

    describe('baseFontScale', () => {
      describe('has length < 6', () => {
        const shevy = new Shevy({
          baseFontScale: [3, 2, 1]
        })

        describe('Undefined Headings', () => {
          const { h4, h5, h6 } = shevy

          it('h4 is undefined', () => { expect(h4).not.toBeDefined() })
          it('h5 is undefined', () => { expect(h5).not.toBeDefined() })
          it('h6 is undefined', () => { expect(h6).not.toBeDefined() })
        })
      })

      describe('has length > 6', () => {
        const shevy = new Shevy({
          baseFontScale: [7, 6, 5, 4, 3, 2, 1]
        })

        it('should trim array to length of 6, removing from the end', () => {
          const expectedArray = [7, 6, 5, 4, 3, 2]
          expect(shevy.baseFontScale).toEqual(expectedArray)
        })
      })
    })

    describe('addMarginBottom: false', () => {
      const shevy = new Shevy({
        addMarginBottom: false
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('marginBottoms are undefined', () => {
          expect(h1.marginBottom).not.toBeDefined()
          expect(h2.marginBottom).not.toBeDefined()
          expect(h3.marginBottom).not.toBeDefined()
          expect(h4.marginBottom).not.toBeDefined()
          expect(h5.marginBottom).not.toBeDefined()
          expect(h6.marginBottom).not.toBeDefined()
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('marginBottom is undefined', () => {
          expect(content.marginBottom).not.toBeDefined()
        })
      })
    })

    describe('proximity: true', () => {
      const shevy = new Shevy({
        proximity: true
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        it('all marginBottoms are 20.4px', () => {
          expect(h1.marginBottom).toEqual('20.4px')
          expect(h2.marginBottom).toEqual('20.4px')
          expect(h3.marginBottom).toEqual('20.4px')
          expect(h4.marginBottom).toEqual('20.4px')
          expect(h5.marginBottom).toEqual('20.4px')
          expect(h6.marginBottom).toEqual('20.4px')
        })
      })

      describe('Content', () => {
        const { content } = shevy

        it('marginBottom equals 20.4px', () => {
          expect(content.marginBottom).toEqual('20.4px')
        })
      })
    })
  })
})
