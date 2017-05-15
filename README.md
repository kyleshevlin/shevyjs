# ShevyJS

> Perfect vertical rhythm for typography in CSS-in-JS

ShevyJS takes the concepts of the original [Shevy](https://github.com/kyleshevlin/shevy) and makes them available for CSS-in-JS systems. Shevy will do all the math required to keep your typography on your design systems baseline.

## Installation

Shevy is available as a module from npm:

```
npm install shevyjs --save-dev
```

Or, with Yarn:

```
yarn add shevyjs -D
```

Be sure that you get the `shevyjs` module, otherwise you might accidentally import the Sass version of this library instead.

## Usage

ShevyJS is not designed for any particular framework or CSS-in-JS solution. It's built with plain JavaScript and can be used anywhere you can use JavaScript. The following example will use React, but you should be able to apply these concepts to your needs with ease.

```jsx
import React from 'react'
import Shevy from 'shevyjs'

const shevy = new Shevy() // creates a new Shevy instance with the default options
const { h1, content } = shevy // Destructures the styles for h1 and content-based tags

const MyComponent = () => (
  <div>
    <h1 style={h1}>ShevyJS</h1>
    <p style={content}>Shevy's not just for Sass anymore.</p>
  </div>
)

export default MyComponent
```

## Default Options

ShevyJS comes with a set of defaults that can be easily overwritten. To overwrite any of these options, pass an options object into `Shevy()` at instantiation.

```javascript
const defaultOptions = {
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  baseFontScale: [3, 2.5, 2, 1.5, 1.25, 1],
  addMarginBottom: true,
  proximity: false,
  proximityFactor: 0.85
}
```

### baseFontSize

This is the size you want to base your typography on. Typically, this will be the smallest or default size of your typography. It is possible to use `baseFontScale`s in a way that would allow for headings to be smaller than your default font size, but it's unlikely you'll use ShevyJS this way.

### baseLineHeight

This is used to determine the line height calculations in Shevy. Each line height calculated will be a multiple or dividend of this value. _It is required that this value be unitless and a number_.

### baseFontScale

This is an array of max length 6 (any values beyond the 6th will be trimmed) that is used to generate the `h1` through `h6` styles. Each value should be a number, that will be multiplied by the `baseFontSize` to generate the font size for that heading

### addMarginBottom

This determines whether a bottom margin will be added to your style objects.

### proximity

It is often more aesthetically pleasing to bring your margins closer than your baseline would typically warrant. Setting this to true will enable the `proximityFactor` option which will allow you to modify the size of your margins.

### proximityFactor

This value will be multiplied against the base spacing determined by ShevyJS's mathematics, and will either increase or decrease the margin bottoms by this factor.

## Methods

Shevy has two methods that can be useful in your design system for creating distances that fall in line with your baseline grid.

### lineHeightSpacing

The `lineHeightSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of the `baseFontSize` multiplied by the `baseLineHeight`.

### baseSpacing

The `baseSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of `baseFontSize` multiplied by the `baseLineHeight` and the `proximityFactor` if `proximity` is `true`.

## Example Uses of Shevy Methods

```jsx
import React from 'react'
import Shevy from 'shevyjs'

const shevy = new Shevy()
const {
  lineHeightSpacing: lhs,
  baseSpacing: bs
} = shevy // Destructure and alias methods

const wrap = {
  marginBottom: lhs(2)
}

const box = {
  padding: bs(.5),
  marginBottom: bs()
}

const MyComponent = () => (
  <div style={wrap}>
    <div style={box}>Box 1</div>
    <div style={box}>Box 2</div>
  </div>
)
```
