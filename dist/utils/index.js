"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHeadingFontSize = calcHeadingFontSize;
exports.calcHeadingLineHeight = calcHeadingLineHeight;
exports.calcHeadingMarginBottom = calcHeadingMarginBottom;
exports.getFontScale = exports.trimArrayToMaxOf6 = exports.getFontUnit = exports.getFontValue = void 0;

var _constants = require("../constants");

const getFontValue = size => {
  return parseFloat(size);
};

exports.getFontValue = getFontValue;

const getFontUnit = size => {
  const match = size.match(/px|r?em$/);

  if (!match) {
    throw new Error('Unsupported font unit: Shevy only supports px, em, or rem.');
  }

  return match[0];
};

exports.getFontUnit = getFontUnit;

const trimArrayToMaxOf6 = array => {
  return array.length <= 6 ? array : array.slice(0, 6);
};

exports.trimArrayToMaxOf6 = trimArrayToMaxOf6;

const getFontScale = fontScale => {
  if (Array.isArray(fontScale)) {
    return trimArrayToMaxOf6(fontScale);
  }

  if (_constants.fontScalePresets.hasOwnProperty(fontScale)) {
    return _constants.fontScalePresets[fontScale];
  } else {
    throw new Error(`No Font Scale Preset Found for "${fontScale}", the presets available are: "${Object.keys(_constants.fontScalePresets)}"`);
  }
};

exports.getFontScale = getFontScale;

function calcHeadingFontSize(thisArg, factor) {
  const {
    baseFontSize
  } = thisArg;
  const value = getFontValue(baseFontSize);
  const unit = getFontUnit(baseFontSize);
  return `${value * factor}${unit}`;
}

function calcHeadingLineHeight(thisArg, factor) {
  const {
    lineHeightSpacing
  } = thisArg;
  const fontSize = calcHeadingFontSize(thisArg, factor);
  const fontValue = getFontValue(fontSize);
  const spacing = lineHeightSpacing();
  const spacingValue = getFontValue(spacing);
  let lineHeight = 0;
  let multiplier = 1;

  if (fontValue <= spacingValue) {
    lineHeight = spacingValue / fontValue;
  } else {
    while (getFontValue(lineHeightSpacing(multiplier)) < fontValue) {
      multiplier += 0.5;
    }

    lineHeight = getFontValue(lineHeightSpacing(multiplier)) / fontValue;
  }

  return lineHeight;
}

function calcHeadingMarginBottom(thisArg, factor, addMarginBottom) {
  if (!addMarginBottom) {
    return undefined;
  }

  const {
    baseSpacing
  } = thisArg;
  const spacing = baseSpacing();
  const spacingUnit = getFontUnit(spacing);

  if (spacingUnit === 'em') {
    const fontSize = calcHeadingFontSize(thisArg, factor);
    const fontValue = getFontValue(fontSize);
    const spacingValue = getFontValue(spacing);
    return `${spacingValue / fontValue}${spacingUnit}`;
  } else {
    return spacing;
  }
}