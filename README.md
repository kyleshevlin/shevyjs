# ShevyJS

> Perfect vertical rhythm for typography and more in CSS-in-JS

ShevyJS takes the concepts of the original [Shevy](https://github.com/kyleshevlin/shevy) and makes them available for CSS-in-JS systems. Shevy will do all the math required to keep your typography (and more) on your design system's baseline.

- [ShevyJS](#shevyjs)
  - [Installation](#installation)
    - [Warning](#warning)
  - [Usage](#usage)
  - [API](#api)
    - [`createShevy`](#createshevy)
  - [Default Options](#default-options)
    - [baseFontSize](#basefontsize)
    - [baseLineHeight](#baselineheight)
    - [fontScale](#fontscale)
    - [includeMarginBottom](#includemarginbottom)
    - [proximity](#proximity)
    - [precision](#precision)
  - [Properties](#properties)
  - [Methods](#methods)
    - [lineHeightSpacing](#lineheightspacing)
    - [baseSpacing](#basespacing)
  - [Upgrade path from v1 to v2](#upgrade-path-from-v1-to-v2)
  - [Example Uses of Shevy Methods](#example-uses-of-shevy-methods)
    - [As Inline Styles](#as-inline-styles)
    - [With Styled Components](#with-styled-components)
    - [With Emotion](#with-emotion)
    - [Recipes](#recipes)

## Installation

Shevy is available as a module from npm:

```
npm install shevyjs
```

Or, with Yarn:

```
yarn add shevyjs
```

### Warning

Be sure that you get the `shevyjs` module, otherwise you might accidentally import the Sass version of this library instead.

## Usage

ShevyJS is not designed for any particular framework or CSS-in-JS solution. It can be used anywhere you can use JavaScript. The following example will use React, but you should be able to apply these concepts to your needs with ease.

```jsx
import React from 'react'
import createShevy from 'shevyjs' // const Shevy = require('shevyjs').default if using CommonJS

const shevy = createShevy() // factory function for creating Shevy objects
const { h1, content } = shevy // Destructures the styles for h1 and content-based tags

const MyComponent = () => (
  <div>
    <h1 style={h1}>ShevyJS</h1>
    <p style={content}>Shevy's not just for Sass anymore.</p>
  </div>
)

export default MyComponent
```

Creating a Shevy object will generate a set of properties that you can use for your styles in your components. Typically, you'll create a single Shevy object and utilize that throughout your application, but it's certainly possible to make localized `shevy`s for your use cases.

## API

### `createShevy`

`createShevy: (options?: ShevyOptions = {}) => Shevy`

`createShevy` is a factory function for creating Shevy objects. Invoking it without `options` will utilize the `defaultOptions` discussed below. `createShevy` can receive an object of `ShevyOptions` to be merged with the defaults.

The most common use would be something like the following:

```javascript
// shevy.js
import createShevy from 'shevyjs'

const shevy = createShevy()
export default shevy

// I like to alias the baseSpacing function to a shorthand for my projects
// since it is commonly used for paddings and margins
export const bs = shevy.baseSpacing
```

## Default Options

ShevyJS comes with a set of defaults that can be easily overwritten. To overwrite any of these options, pass an options object into `Shevy()` at instantiation. Your options object will be merged with the default options, so you can declare as many or as few of the options as you would like.

Here are the defaults:

```javascript
const defaultOptions = {
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  fontScale: [3, 2.5, 2, 1.5, 1.25, 1],
  includeMarginBottom: true,
  proximity: null,
  precision: null,
}
```

Below is a description of what each option does for ShevyJS.

### baseFontSize

`baseFontSize: string`

This is the size you want to base your typography on. Typically, this will be the smallest or default size of your typography. It is possible to use `fontScale`s in a way that would allow for headings to be smaller than your default font size, but it's unlikely you'll use ShevyJS this way.

### baseLineHeight

`baseLineHeight: number`

This is used to determine the line height calculations in Shevy. _It is required that this value be unitless and a number_.

Line heights for your headings will be based on multiples of `baseLineHeight / 2`. Half increments of your `baseLineHeight`, while strictly speaking will shift your rhythm, are typically more aesthetically pleasing that strictly using whole increments. This prevents `fontSizes` slightly larger than a `baseLineHeight` multiple from becoming excessively large.

Example: a `fontSize` of `50px` and a `baseLineHeight` of `48px` doesn't result in a `96px` `lineHeight`, but rather a `72px` `lineHeight` (`48/2` gives us a half increment of `24`. `24*3` is the first size greater than `50`, thus `72px`).

### fontScale

`fontScale: number[]`

This is an array, of max length 6 (any values beyond the 6th will be trimmed), that is used to generate the `h1` through `h6` styles. Each value should be a number, that will be multiplied by the `baseFontSize` to generate the font size for that heading.

Font scale presets are available based on [ModularScale.com](http://www.modularscale.com/). If `baseFontScale` is a string, it will attempt to match one of the following presets by key. **If a match does not exist, an error will be thrown.** The presets are:

```javascript
{
  majorSecond: [1.802, 1.602, 1.424, 1.266, 1.125, 1],
  minorThird: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
  majorThird: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
  perfectFourth: [4.209, 3.157, 2.369, 1.777, 1.333, 1],
  augmentedFourth: [5.653, 3.998, 2.827, 1.999, 1.414, 1]
}
```

You may supply fewer than 6 values to the `fontScale`. Doing so will result in the corresponding `h*` values return objects that look like:

```javascript
{
  fontSize: undefined,
  lineHeight: undefined,
  marginBottom: undefined,
}
```

This API was chosen to ensure type-safety and convenience. `h1` through `h6` will always exist on a `shevy` object. You will not need conditionals to check for their existence. But perhaps your application never uses `h4` through `h6`, and thus it's needless to define them. This gives you that flexibility.

### includeMarginBottom

`includeMarginBottom: boolean`

This determines whether a value will be set for the `marginBottom` of your style objects.

### proximity

`proximity: null | number`

It is often more aesthetically pleasing to make your margins smaller than your baseline would typically warrant. This is due to the fact that line height in CSS is applied above and below the `fontSize`. This results in half the extra line height sitting below the text. Adding spacing beyond this, while mathematically correct, may not be the look you are going for.

By default, `proximity` is set to null, but setting it to a `number` will tweak the spacings by that percentage.

### precision

`precision: null | number`

By default, `precision` is set to `null`, but setting it to a number will result in values that do not exceed that number of places after the decimal. Example: `1.23456` with a precision of `4` becomes `1.2346`.

## Properties

Each Shevy object comes with a set of properties to use for your styles. Each property is a JavaScript object of the following styles:

```javascript
{
  fontSize: string
  lineHeight: number | string
  marginBottom: string
}
```

There are cases (see [fontScale](#fontscale)) where these properties are `undefined`.

Here are the available properties:

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `body`
- `content`

`h1` through `h6` properties map to the results of calculating your options. Here is an example of one of these objects:

```javascript
const shevy = createShevy()

console.log(shevy.h1) // { fontSize: '48px', lineHeight: 1, marginBottom: '24px' }
```

The `body` property is intended to go on the `<body>` tag selector and is ported over from the original Shevy. This may be less necessary in a component based JS system and might be deprecated in the future. Here is an example of the `body` object:

```javascript
const shevy = createShevy()

console.log(shevy.body) // { fontSize: '16px', lineHeight: 1.5 }
```

The `content` tag is intended to be used for any base content level components. In the original Shevy, this was a mixin that directly applied styles to the `<p>`, `<ol>`, `<ul>`, and `<pre>` tags. Now in ShevyJS, you have much more freedom to apply these styles to whatever component you deem fit. Here is an example of the `content` object:

```javascript
const shevy = createShevy()

console.log(shevy.content) // { fontSize: '16px', lineHeight: 1.5, marginBottom: '24px' }
```

## Methods

Shevy has two methods that can be useful in your design system for creating distances that fall in line with your baseline grid.

### lineHeightSpacing

`lineHeightSpacing: (factor?: number = 1) => string`

The `lineHeightSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of the `baseFontSize` multiplied by the `baseLineHeight`.

### baseSpacing

`baseSpacing: (factor?: number = 1) => string`

The `baseSpacing()` method takes one argument, a number (which defaults to 1), and multiplies it with the result of `baseFontSize` multiplied by the `baseLineHeight`. It is additionally multiplies by `proximity` if it is not `null`.

## Upgrade path from v1 to v2

There are a few differences between v1 to v2, so here's how to make those changes.

- The default import is no longer a `Shevy` class constructor. It is the `createShevy` factory function.

```diff
- import Shevy from 'shevyjs'
+ import createShevy from 'shevyjs'
```

- Replace instances of `new Shevy(options)` with `createShevy(options)`

```diff
- const shevy = new Shevy()
+ const shevy = createShevy()
```

- Some `options` properties were renamed:

  - `baseFontScale` is now just `fontScale`
  - `addMarginBottom` is now `includeMarginBottom`

- Some `options` properties were modified

  - `precision` and `usePrecision` are now just `precision`. `precision` is a nullable property now, replacing the need for two options.
  - `proximity` and `proximityFactor` are now just `proximity`. `proximity` is a nullable property now, replacing the need for two options.

```diff
const options = {
-  precision: 4,
-  usePrecision: true,
-  proximity: true,
-  proximityFactor: 0.85
+  precision: 4,
+  proximity: 0.85,
}
```

- Several properties are no longer accessible on the `shevy` object

In v1, `shevy` was an instance of the `Shevy` class. Because of this, certain values were made properties of the class that really didn't need to be. An example would be `this.baseFontScale`. There isn't a good reason for this to need to be on the `Shevy` class.

With the conversion to a simple factory function, it was easy to keep certain values and functions private. This tidies up the exposed API to just the properties for styles, and the methods listed above.

This also improves the types for the project, which will likely improve your editor experience with faster Intellisense for `shevy` objects.

## Example Uses of Shevy Methods

### As Inline Styles

```jsx
import React from 'react'
import createShevy from 'shevyjs'

const shevy = createShevy()
const { lineHeightSpacing: lhs, baseSpacing: bs } = shevy // Destructure and alias methods

const wrap = {
  marginBottom: lhs(2),
}

const box = {
  padding: bs(0.5),
  marginBottom: bs(),
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
import createShevy from 'shevyjs'

const shevy = createShevy()
const {
  baseSpacing: bs,
  h1: { fontSize, lineHeight, marginBottom },
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

### With Emotion

```javascript
import createShevy from 'shevyjs'
import { css } from 'emotion'

const shevy = createShevy()
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

const shevy = createShevy()
const {
  baseSpacing: bs,
  h1: { fontSize, lineHeight, marginBottom },
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

### Recipes

Create a `Spacer` component to use with `shevy` (inspired by [this Max Stoiber article](https://mxstbr.com/thoughts/margin)):

```jsx
import React from 'react'
import createShevy from 'shevyjs'

const shevy = createShevy()
const bs = shevy.baseSpacing

function Spacer({
  children,
  all = 0,
  horz = 0,
  vert = 0,
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
}) {
  const margins = {
    ...(all && { margin: bs(all) }),
    ...(horz && { marginLeft: bs(horz), marginRight: bs(horz) }),
    ...(vert && { marginTop: bs(vert), marginBottom: bs(vert) }),
    ...(top && { marginTop: bs(top) }),
    ...(right && { marginRight: bs(right) }),
    ...(bottom && { marginBottom: bs(bottom) }),
    ...(left && { marginLeft: bs(left) }),
  }

  return <div style={margins}>{children}</div>
}
```
