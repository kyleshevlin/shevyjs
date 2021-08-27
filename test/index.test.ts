import { createShevy } from '../src'

describe('createShevy', () => {
  describe('Default settings', () => {
    const shevy = createShevy()

    test('lineHeightSpacing returns 24px', () => {
      expect(shevy.lineHeightSpacing()).toEqual('24px')
    })

    test('baseSpacing returns 24px', () => {
      expect(shevy.baseSpacing()).toEqual('24px')
    })

    test('body', () => {
      expect(shevy.body).toEqual({
        fontSize: '16px',
        lineHeight: 1.5,
      })
    })

    test('content', () => {
      expect(shevy.content).toEqual({
        fontSize: '16px',
        lineHeight: 1.5,
        marginBottom: '24px',
      })
    })

    describe('headings', () => {
      const { h1, h2, h3, h4, h5, h6 } = shevy

      test('h1', () => {
        expect(h1).toEqual({
          fontSize: '48px',
          lineHeight: 1,
          marginBottom: '24px',
        })
      })

      test('h2', () => {
        expect(h2).toEqual({
          fontSize: '40px',
          lineHeight: 1.2,
          marginBottom: '24px',
        })
      })

      test('h3', () => {
        expect(h3).toEqual({
          fontSize: '32px',
          lineHeight: 1.125,
          marginBottom: '24px',
        })
      })

      test('h4', () => {
        expect(h4).toEqual({
          fontSize: '24px',
          lineHeight: 1,
          marginBottom: '24px',
        })
      })

      test('h5', () => {
        expect(h5).toEqual({
          fontSize: '20px',
          lineHeight: 1.2,
          marginBottom: '24px',
        })
      })

      describe('h6', () => {
        expect(h6).toEqual({
          fontSize: '16px',
          lineHeight: 1.5,
          marginBottom: '24px',
        })
      })
    })
  })

  describe('Custom settings', () => {
    describe('unit: em', () => {
      const shevy = createShevy({
        baseFontSize: '1em',
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        test('h1', () => {
          expect(h1).toEqual({
            fontSize: '3em',
            lineHeight: 1,
            marginBottom: '0.5em',
          })
        })

        test('h2', () => {
          expect(h2).toEqual({
            fontSize: '2.5em',
            lineHeight: 1.2,
            marginBottom: '0.6em',
          })
        })

        test('h3', () => {
          expect(h3).toEqual({
            fontSize: '2em',
            lineHeight: 1.125,
            marginBottom: '0.75em',
          })
        })

        test('h4', () => {
          expect(h4).toEqual({
            fontSize: '1.5em',
            lineHeight: 1,
            marginBottom: '1em',
          })
        })

        test('h5', () => {
          expect(h5).toEqual({
            fontSize: '1.25em',
            lineHeight: 1.2,
            marginBottom: '1.2em',
          })
        })

        test('h6', () => {
          expect(h6).toEqual({
            fontSize: '1em',
            lineHeight: 1.5,
            marginBottom: '1.5em',
          })
        })
      })

      test('body fontSize is 1em', () => {
        expect(shevy.body.fontSize).toEqual('1em')
      })

      test('content fontSize is 1em', () => {
        expect(shevy.content.fontSize).toEqual('1em')
      })

      test('lineHeightSpacing returns 1.5em', () => {
        expect(shevy.lineHeightSpacing()).toEqual('1.5em')
      })

      test('baseSpacing returns 1.5em', () => {
        expect(shevy.baseSpacing()).toEqual('1.5em')
      })
    })

    describe('unit: rem', () => {
      const shevy = createShevy({
        baseFontSize: '1rem',
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        test('h1', () => {
          expect(h1).toEqual({
            fontSize: '3rem',
            lineHeight: 1,
            marginBottom: '1.5rem',
          })
        })

        test('h2', () => {
          expect(h2).toEqual({
            fontSize: '2.5rem',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          })
        })

        test('h3', () => {
          expect(h3).toEqual({
            fontSize: '2rem',
            lineHeight: 1.125,
            marginBottom: '1.5rem',
          })
        })

        test('h4', () => {
          expect(h4).toEqual({
            fontSize: '1.5rem',
            lineHeight: 1,
            marginBottom: '1.5rem',
          })
        })

        test('h5', () => {
          expect(h5).toEqual({
            fontSize: '1.25rem',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          })
        })

        test('h6', () => {
          expect(h6).toEqual({
            fontSize: '1rem',
            lineHeight: 1.5,
            marginBottom: '1.5rem',
          })
        })
      })

      test('body fontSize is 1rem', () => {
        expect(shevy.body.fontSize).toEqual('1rem')
      })

      test('contentfontSize is 1rem', () => {
        expect(shevy.content.fontSize).toEqual('1rem')
      })

      test('lineHeightSpacing returns 1.5rem', () => {
        expect(shevy.lineHeightSpacing()).toEqual('1.5rem')
      })

      test('baseSpacing returns 1.5rem', () => {
        expect(shevy.baseSpacing()).toEqual('1.5rem')
      })
    })

    describe('baseLineHeight: 2', () => {
      const shevy = createShevy({
        baseLineHeight: 2,
      })

      describe('Headings', () => {
        const { h1, h2, h3, h4, h5, h6 } = shevy

        test('h1', () => {
          expect(h1).toMatchObject({
            lineHeight: 1,
            marginBottom: '32px',
          })
        })

        test('h2', () => {
          expect(h2).toMatchObject({
            lineHeight: 1.2,
            marginBottom: '32px',
          })
        })

        test('h3', () => {
          expect(h3).toMatchObject({
            lineHeight: 1,
            marginBottom: '32px',
          })
        })

        test('h4', () => {
          expect(h4).toMatchObject({
            lineHeight: 1.3333333333333333,
            marginBottom: '32px',
          })
        })

        test('h5', () => {
          expect(h5).toMatchObject({
            lineHeight: 1.6,
            marginBottom: '32px',
          })
        })

        test('h6', () => {
          expect(h6).toMatchObject({
            lineHeight: 2,
            marginBottom: '32px',
          })
        })
      })
    })

    describe('fontScale', () => {
      describe('value as an array', () => {
        test('has length < 6', () => {
          const shevy = createShevy({
            fontScale: [3, 2, 1],
          })

          expect(shevy.h4).toEqual({
            fontSize: undefined,
            lineHeight: undefined,
            marginBottom: undefined,
          })
          expect(shevy.h5).toEqual({
            fontSize: undefined,
            lineHeight: undefined,
            marginBottom: undefined,
          })
          expect(shevy.h6).toEqual({
            fontSize: undefined,
            lineHeight: undefined,
            marginBottom: undefined,
          })
        })

        test('has length > 6', () => {
          const shevy = createShevy({
            fontScale: [7, 6, 5, 4, 3, 2, 1],
          })

          // @ts-expect-error
          expect(shevy.h7).not.toBeDefined()
        })
      })

      describe('value as a string', () => {
        test('has valid preset name', () => {
          expect(createShevy({ fontScale: 'perfectFourth' })).toBeDefined()
        })

        test('has an invalid preset name', () => {
          expect(() => {
            // @ts-expect-error
            createShevy({ fontScale: 'not_valid' })
          }).toThrow()
        })
      })
    })

    test('includeMarginBottom: false', () => {
      const shevy = createShevy({
        includeMarginBottom: false,
      })

      const { content, h1, h2, h3, h4, h5, h6 } = shevy

      expect(h1.marginBottom).not.toBeDefined()
      expect(h2.marginBottom).not.toBeDefined()
      expect(h3.marginBottom).not.toBeDefined()
      expect(h4.marginBottom).not.toBeDefined()
      expect(h5.marginBottom).not.toBeDefined()
      expect(h6.marginBottom).not.toBeDefined()
      expect(content.marginBottom).not.toBeDefined()
    })

    test('proximity: 0.85', () => {
      const shevy = createShevy({
        proximity: 0.85,
      })

      const { content, h1, h2, h3, h4, h5, h6 } = shevy

      expect(h1.marginBottom).toEqual('20.4px')
      expect(h2.marginBottom).toEqual('20.4px')
      expect(h3.marginBottom).toEqual('20.4px')
      expect(h4.marginBottom).toEqual('20.4px')
      expect(h5.marginBottom).toEqual('20.4px')
      expect(h6.marginBottom).toEqual('20.4px')
      expect(content.marginBottom).toEqual('20.4px')
    })

    test('precision', () => {
      const baseFontSize = '1.234567rem'
      const fontScale = 'majorThird'
      const shevy1 = createShevy({
        baseFontSize,
        fontScale,
      })

      // Default precision is null
      expect(shevy1.baseSpacing()).toEqual('1.8518504999999998rem')

      const shevy2 = createShevy({
        baseFontSize,
        fontScale,
        precision: 4,
      })

      expect(shevy2.baseSpacing()).toEqual('1.8519rem')
    })
  })
})
