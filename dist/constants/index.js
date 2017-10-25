'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fontScalePresets = exports.fontScalePresets = {
  majorSecond: [1.802, 1.602, 1.424, 1.266, 1.125, 1],
  minorThird: [2.488, 2.074, 1.728, 1.44, 1.2, 1],
  majorThird: [3.052, 2.441, 1.953, 1.563, 1.25, 1],
  perfectFourth: [4.209, 3.157, 2.369, 1.777, 1.333, 1],
  augmentedFourth: [5.653, 3.998, 2.827, 1.999, 1.414, 1]
};

var defaultOptions = exports.defaultOptions = {
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  baseFontScale: [3, 2.5, 2, 1.5, 1.25, 1],
  addMarginBottom: true,
  proximity: false,
  proximityFactor: 0.85
};

var headings = exports.headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];