'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcHeadingFontSize = calcHeadingFontSize;
exports.calcHeadingLineHeight = calcHeadingLineHeight;
exports.calcHeadingMarginBottom = calcHeadingMarginBottom;
var getFontValue = exports.getFontValue = function getFontValue(size) {
  return parseFloat(size);
};

var getFontUnit = exports.getFontUnit = function getFontUnit(size) {
  var match = size.match(/px|r?em$/);

  if (!match) {
    throw new Error('Unsupported font unit: Shevy only supports px, em, or rem.');
  }

  return match[0];
};

var trimArrayToMaxOf6 = exports.trimArrayToMaxOf6 = function trimArrayToMaxOf6(array) {
  return array.length <= 6 ? array : array.slice(0, 6);
};

function calcHeadingFontSize(thisArg, factor) {
  var baseFontSize = thisArg.baseFontSize;

  var value = getFontValue(baseFontSize);
  var unit = getFontUnit(baseFontSize);

  return '' + value * factor + unit;
}

function calcHeadingLineHeight(thisArg, factor) {
  var lineHeightSpacing = thisArg.lineHeightSpacing;

  var fontSize = calcHeadingFontSize(thisArg, factor);
  var fontValue = getFontValue(fontSize);
  var spacing = lineHeightSpacing();
  var spacingValue = getFontValue(spacing);
  var lineHeight = 0;
  var multiplier = 1;

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

  var baseSpacing = thisArg.baseSpacing;

  var spacing = baseSpacing();
  var spacingUnit = getFontUnit(spacing);

  if (spacingUnit === 'em') {
    var fontSize = calcHeadingFontSize(thisArg, factor);
    var fontValue = getFontValue(fontSize);
    var spacingValue = getFontValue(spacing);

    return '' + spacingValue / fontValue + spacingUnit;
  } else {
    return spacing;
  }
}