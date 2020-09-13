"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _utils = require("./utils");

class Shevy {
  constructor(options) {
    const mergedOptions = { ..._constants.defaultOptions,
      ...options
    };
    const {
      baseFontSize,
      baseLineHeight,
      baseFontScale,
      addMarginBottom,
      proximity,
      proximityFactor,
      precision,
      usePrecision
    } = mergedOptions;
    this.baseFontSize = baseFontSize;
    this.baseFontUnit = (0, _utils.getFontUnit)(baseFontSize);
    this.baseLineHeight = baseLineHeight;
    this.baseFontScale = (0, _utils.getFontScale)(baseFontScale);
    this.addMarginBottom = addMarginBottom;
    this.proximity = proximity;
    this.proximityFactor = proximityFactor;
    this.precision = precision;
    this.usePrecision = usePrecision; // Binding methods

    this.lineHeightSpacing = this.lineHeightSpacing.bind(this);
    this.baseSpacing = this.baseSpacing.bind(this); // Set headings

    this.baseFontScale.forEach((factor, index) => {
      const heading = _constants.headings[index];
      this[heading] = {
        fontSize: (0, _utils.calcHeadingFontSize)(this, factor),
        lineHeight: (0, _utils.calcHeadingLineHeight)(this, factor),
        marginBottom: (0, _utils.calcHeadingMarginBottom)(this, factor, addMarginBottom)
      };
    }); // Set Body

    this.body = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight
    }; // Set Content

    this.content = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight,
      marginBottom: addMarginBottom ? this.baseSpacing() : undefined
    };
  }

  lineHeightSpacing(factor = 1) {
    const {
      baseFontSize,
      baseLineHeight
    } = this;
    const value = (0, _utils.getFontValue)(this, baseFontSize);
    const spacing = (0, _utils.parseNumber)(this, value * baseLineHeight * factor);
    const unit = (0, _utils.getFontUnit)(baseFontSize);
    return `${spacing}${unit}`;
  }

  baseSpacing(factor = 1) {
    const {
      baseFontSize,
      baseLineHeight,
      proximity,
      proximityFactor
    } = this;
    const value = (0, _utils.getFontValue)(this, baseFontSize);
    const unit = (0, _utils.getFontUnit)(baseFontSize);
    let spacing = value * baseLineHeight * factor;

    if (proximity) {
      spacing = spacing * proximityFactor;
    }

    return `${(0, _utils.parseNumber)(this, spacing)}${unit}`;
  }

}

exports.default = Shevy;