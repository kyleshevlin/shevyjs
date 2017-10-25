(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["shevyjs"] = factory();
	else
		root["shevyjs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontScale = exports.trimArrayToMaxOf6 = exports.getFontUnit = exports.getFontValue = undefined;
exports.calcHeadingFontSize = calcHeadingFontSize;
exports.calcHeadingLineHeight = calcHeadingLineHeight;
exports.calcHeadingMarginBottom = calcHeadingMarginBottom;

var _constants = __webpack_require__(0);

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

var getFontScale = exports.getFontScale = function getFontScale(fontScale) {
  if (Array.isArray(fontScale)) {
    return trimArrayToMaxOf6(fontScale);
  }

  if (_constants.fontScalePresets.hasOwnProperty(fontScale)) {
    return _constants.fontScalePresets[fontScale];
  } else {
    throw new Error('No Font Scale Preset Found for "' + fontScale + '", the presets available are: "' + Object.keys(_constants.fontScalePresets) + '"');
  }
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _utils = __webpack_require__(1);

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

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map