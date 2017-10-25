# ShevyJS

[![Build Status](https://travis-ci.org/kyleshevlin/shevyjs.svg?branch=master)](https://travis-ci.org/kyleshevlin/shevyjs)
[![codecov](https://codecov.io/gh/kyleshevlin/shevyjs/branch/master/graph/badge.svg)](https://codecov.io/gh/kyleshevlin/shevyjs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Perfect vertical rhythm for typography in CSS-in-JS

ShevyJS takes the concepts of the original [Shevy](https://github.com/kyleshevlin/shevy) and makes them available for CSS-in-JS systems. Shevy will do all the math required to keep your typography (and more) on your design system's baseline.

## Installation

Shevy is available as a module from npm:

```
npm install shevyjs --save-dev
```

Or, with Yarn:

```
yarn add shevyjs -D
```

### Warning

Be sure that you get the `shevyjs` module, otherwise you might accidentally import the Sass version of this library instead.

## Usage

ShevyJS is not designed for any particular framework or CSS-in-JS solution. It can be used anywhere you can use JavaScript. The following example will use React, but you should be able to apply these concepts to your needs with ease.

```jsx
import React from 'react'
import Shevy from 'shevyjs' // const Shevy = require('shevyjs').default if using CommonJS

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

Creating a new instance of Shevy will generate a set of properties that you can use for your styles in your components. You could create one instance that you export around the various parts of your application so that you use the same settings throughout your project.

## Default Options

ShevyJS comes with a set of defaults that can be easily overwritten. To overwrite any of these options, pass an options object into `Shevy()` at instantiation. Your options object will be merged with the default options, so you can declare as many or as few of the options as you would like.

Here are the defaults:

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

Below is a description of what each option does for ShevyJS.

### baseFontSize

This is the size you want to base your typography on. Typically, this will be the smallest or default size of your typography. It is possible to use `baseFontScale`s in a way that would allow for headings to be smaller than your default font size, but it's unlikely you'll use ShevyJS this way.

### baseLineHeight

This is used to determine the line height calculations in Shevy. Each line height calculated will be a multiple or dividend of this value. _It is required that this value be unitless and a number_.

### baseFontScale

This is an array of max length 6 (any values beyond the 6th will be trimmed) that is used to generate the `h1` through `h6` styles. Each value should be a number, that will be multiplied by the `baseFontSize` to generate the font size for that heading. 

Font Scale Presets are available based [ModularScale.com](http://www.modularscale.com/). If `baseFontScale` is a string it will be used to match by key to the following presets:

```javascript
{
  majorSecond: [1.802, 1.602, 1.424, 1.266, 1.125, 1],
  minorThird: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
  majorThird: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
  perfectFourth: [4.209, 3.157, 2.369, 1.777, 1.333, 1],
  augmentedFourth: [5.653, 3.998, 2.827, 1.999, 1.414, 1]
}
```

**Note** An error will be thrown if string is not a preset.

### addMarginBottom

This determines whether a bottom margin will be added to your style objects.

### proximity

It is often more aesthetically pleasing to make your margins smaller than your baseline would typically warrant. This is due to the fact that line height in CSS is applied above and below the font size. This results in half the extra line height sitting below the text. Adding spacing beyond this, while mathematically correct, may not be the look you are going for. Setting `proximity` to true will enable the `proximityFactor` option which will allow you to modify the size of your margins.

### proximityFactor

This value will be multiplied against the base spacing determined by ShevyJS's mathematics, and will either increase or decrease the margin bottoms by this factor.

## Properties

Each instance of Shevy exposes a set of properties to use for your styles. Each property is a JavaScript object of styles. Here are the available properties:

* h1, h2, h3, h4, h5, h6 (assuming `baseFontScale` has a length of 6, fewer if the length is less)
* body
* content

`h1` through `h6` properties map to the results of calculating your options. Here is an example of one of these objects:

```javascript
const shevy = new Shevy()

console.log(shevy.h1) // { fontSize: '48px', lineHeight: 1, marginBottom: '24px' }
```

The `body` property is intended to go on the `<body>` tag selector and is ported over from the original Shevy. This may be less necessary in a component based JS system and might be deprecated in the future. Here is an example of the `body` object:

```javascript
const shevy = new Shevy()

console.log(shevy.body) // { fontSize: '16px', lineHeight: 1.5 }
```

The `content` tag is intended to be used for any base content level components. In the original Shevy, this was a mixin that directly applied styles to the `<p>`, `<ol>`, `<ul>`, and `<pre>` tags. Now in ShevyJS, you have much more freedom to apply these styles to whatever component you deem fit. Here is an example of the `content` object:

```javascript
const shevy = new Shevy()

console.log(shevy.content) // { fontSize: '16px', lineHeight: 1.5, marginBottom: '24px' }
```

## Methods

Shevy has two methods that can be useful in your design system for creating distances that fall in line with your baseline grid.

### lineHeightSpacing

The `lineHeightSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of the `baseFontSize` multiplied by the `baseLineHeight`.

### baseSpacing

The `baseSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of `baseFontSize` multiplied by the `baseLineHeight` and the `proximityFactor` if `proximity` is `true`.

## Example Uses of Shevy Methods

### As Inline Styles

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

### With Styled Components

```jsx
import React from 'react'
import styled from 'styled-components'
import Shevy from 'shevyjs'

const shevy = new Shevy()
const {
  baseSpacing: bs,
  h1: {
    fontSize,
    lineHeight,
    marginBottom
  }
} = shevy

const Wrap = styled.div`
  padding: ${bs()};
  margin-bottom: ${bs(2)};
`

const Heading = styled.h1`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  margin-bottom: ${marginBottom};
`

const MyComponent = () => (
  <Wrap>
    <Heading>Shevy with Styled Components!</Heading>
  </Wrap>
)
```

### With Glamorous

```jsx
import React from 'react'
import glamorous from 'glamorous'
import Shevy from 'shevyjs'

const shevy = new Shevy()
const {
  baseSpacing: bs,
  h1
} = shevy

const Wrap = glamorous.div({
  padding: bs(),
  marginBottom: bs(2)
})

const Heading = glamorous.h1(h1)

const MyComponent = () => (
  <Wrap>
    <Heading>Shevy with Glamorous!</Heading>
  </Wrap>
)
```

You can also do something like this with Glamorous:

```jsx
import React from 'react'
import glamorous from 'glamorous'
import Shevy from 'shevyjs'

const shevy = new Shevy()
const {
  baseSpacing: bs,
  h1
} = shevy
const { Div, H1 } = glamorous

const MyComponent = () => (
  <Div padding={bs()}>
    <H1 {...h1}>Shevy with Glamorous!</H1>
  </Div>
)
```

### With Emotion

```javascript
import shevy from 'shevyjs'
import { css } from 'emotion'

const shevy = new Shevy()
const { content } = shevy
const app = document.getElementById('root')
const myStyle = css`
  color: rebeccapurple;
  font-size: ${content.fontSize};
`
app.classList.add(myStyle)
```

And Emotion with React:

```jsx
import React from 'react'
import styled, { css } from 'emotion'
import Shevy from 'shevyjs'

const shevy = new Shevy()
const {
  baseSpacing: bs,
  h1: {
    fontSize,
    lineHeight,
    marginBottom
  }
} = shevy

const Wrap = styled('div')`
  padding: ${bs()};
  margin-bottom: ${bs(2)};
`

const Heading = styled('h1')`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  margin-bottom: ${marginBottom};
`

const MyComponent = () => (
  <Wrap>
    <Heading>Shevy with Emotion and React!</Heading>
  </Wrap>
)
```
