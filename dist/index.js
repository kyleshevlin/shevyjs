'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shevy = function () {
  function Shevy(options) {
    var _this = this;

    _classCallCheck(this, Shevy);

    var mergedOptions = _extends({}, _constants.defaultOptions, options);
    var baseFontSize = mergedOptions.baseFontSize,
        baseLineHeight = mergedOptions.baseLineHeight,
        baseFontScale = mergedOptions.baseFontScale,
        addMarginBottom = mergedOptions.addMarginBottom,
        proximity = mergedOptions.proximity,
        proximityFactor = mergedOptions.proximityFactor;


    this.baseFontSize = baseFontSize;
    this.baseFontUnit = (0, _utils.getFontUnit)(baseFontSize);
    this.baseLineHeight = baseLineHeight;
    this.baseFontScale = (0, _utils.getFontScale)(baseFontScale);
    this.addMarginBottom = addMarginBottom;
    this.proximity = proximity;
    this.proximityFactor = proximityFactor;

    // Binding methods
    this.lineHeightSpacing = this.lineHeightSpacing.bind(this);
    this.baseSpacing = this.baseSpacing.bind(this);

    // Set headings
    this.baseFontScale.forEach(function (factor, index) {
      var heading = _constants.headings[index];
      _this[heading] = {
        fontSize: (0, _utils.calcHeadingFontSize)(_this, factor),
        lineHeight: (0, _utils.calcHeadingLineHeight)(_this, factor),
        marginBottom: (0, _utils.calcHeadingMarginBottom)(_this, factor, addMarginBottom)
      };
    });

    // Set Body
    this.body = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight
    };

    // Set Content
    this.content = {
      fontSize: this.baseFontSize,
      lineHeight: this.baseLineHeight,
      marginBottom: addMarginBottom ? this.baseSpacing() : undefined
    };
  }

  _createClass(Shevy, [{
    key: 'lineHeightSpacing',
    value: function lineHeightSpacing() {
      var factor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var baseFontSize = this.baseFontSize,
          baseLineHeight = this.baseLineHeight;

      var value = (0, _utils.getFontValue)(baseFontSize);
      var unit = (0, _utils.getFontUnit)(baseFontSize);

      return '' + value * baseLineHeight * factor + unit;
    }
  }, {
    key: 'baseSpacing',
    value: function baseSpacing() {
      var factor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var baseFontSize = this.baseFontSize,
          baseLineHeight = this.baseLineHeight,
          proximity = this.proximity,
          proximityFactor = this.proximityFactor;

      var value = (0, _utils.getFontValue)(baseFontSize);
      var unit = (0, _utils.getFontUnit)(baseFontSize);
      var spacing = value * baseLineHeight * factor;

      if (proximity) {
        spacing = spacing * proximityFactor;
      }

      return '' + spacing + unit;
    }
  }]);

  return Shevy;
}();

exports.default = Shevy;