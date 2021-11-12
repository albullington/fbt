"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 * 
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --local ~/www
 *
 * @typechecks
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error
var FbtHooks = require("./FbtHooks");

var NumberFormatConsts = require("./NumberFormatConsts");

var escapeRegex = require("./escapeRegex");

var DEFAULT_GROUPING_SIZE = 3;
var CURRENCIES_WITH_DOTS = ["\u0433\u0440\u043D.", "\u0434\u0435\u043D.", "\u043B\u0432.", "\u043C\u0430\u043D.", "\u0564\u0580.", "\u062C.\u0645.", "\u062F.\u0625.", "\u062F.\u0627.", "\u062F.\u0628.", "\u062F.\u062A.", "\u062F.\u062C.", "\u062F.\u0639.", "\u062F.\u0643.", "\u062F.\u0644.", "\u062F.\u0645.", "\u0631.\u0633.", "\u0631.\u0639.", "\u0631.\u0642.", "\u0631.\u064A.", "\u0644.\u0633.", "\u0644.\u0644.", "\u0783.", 'B/.', 'Bs.', 'Fr.', 'kr.', 'L.', 'p.', 'S/.'];
var _regexCache = {};

function _buildRegex(pattern) {
  if (!_regexCache[pattern]) {
    _regexCache[pattern] = new RegExp(pattern, 'i');
  }

  return _regexCache[pattern];
}

var matchCurrenciesWithDots = _buildRegex(CURRENCIES_WITH_DOTS.reduce(function (regex, representation, index) {
  return regex + (index ? '|' : '') + '(' + escapeRegex(representation) + ')';
}, ''));
/**
 * Format a number for string output.
 *
 * Calling this function directly is discouraged, unless you know
 * exactly what you're doing. Consider using `formatNumber` or
 * `formatNumberWithThousandDelimiters` below.
 */


function formatNumberRaw(value, decimals) {
  var thousandDelimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var decimalDelimiter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  var minDigitsForThousandDelimiter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var standardPatternInfo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
    primaryGroupSize: DEFAULT_GROUPING_SIZE,
    secondaryGroupSize: DEFAULT_GROUPING_SIZE
  };
  var numberingSystemData = arguments.length > 6 ? arguments[6] : undefined;
  var primaryGroupingSize = standardPatternInfo.primaryGroupSize || DEFAULT_GROUPING_SIZE;
  var secondaryGroupingSize = standardPatternInfo.secondaryGroupSize || primaryGroupingSize;
  var digits = numberingSystemData && numberingSystemData.digits;
  var v;

  if (decimals == null) {
    v = value.toString();
  } else if (typeof value === 'string') {
    v = truncateLongNumber(value, decimals);
  } else {
    v = _roundNumber(value, decimals);
  }

  var valueParts = v.split('.');
  var wholeNumber = valueParts[0];
  var decimal = valueParts[1];

  if (Math.abs(parseInt(wholeNumber, 10)).toString().length >= minDigitsForThousandDelimiter) {
    var replaced = '';
    var replaceWith = '$1' + thousandDelimiter + '$2$3';
    var primaryPattern = '(\\d)(\\d{' + (primaryGroupingSize - 0) + '})($|\\D)';
    replaced = wholeNumber.replace(_buildRegex(primaryPattern), replaceWith);

    if (replaced != wholeNumber) {
      wholeNumber = replaced;
      var secondaryPatternString = '(\\d)(\\d{' + (secondaryGroupingSize - 0) + '})(' + escapeRegex(thousandDelimiter) + ')';

      var secondaryPattern = _buildRegex(secondaryPatternString);

      while ((replaced = wholeNumber.replace(secondaryPattern, replaceWith)) != wholeNumber) {
        wholeNumber = replaced;
      }
    }
  }

  if (digits != null) {
    wholeNumber = _replaceWithNativeDigits(wholeNumber, digits);
    decimal = decimal && _replaceWithNativeDigits(decimal, digits);
  }

  var result = wholeNumber;

  if (decimal) {
    result += decimalDelimiter + decimal;
  }

  return result;
}

function _replaceWithNativeDigits(number, digits) {
  var result = '';

  for (var ii = 0; ii < number.length; ++ii) {
    var d = digits[number.charCodeAt(ii) - 48];
    /* 48 === '0' */

    result += d !== undefined ? d : number[ii];
  }

  return result;
}
/**
 * Format a number for string output.
 *
 * This will format a given number according to the user's locale.
 * Thousand delimiters will NOT be added, use
 * `formatNumberWithThousandDelimiters` if you want them to be added.
 *
 * You may optionally specify the number of decimal places that should
 * be displayed. For instance, pass `0` to round to the nearest
 * integer, `2` to round to nearest cent when displaying currency, etc.
 */


function formatNumber(value, decimals) {
  var NumberFormatConfig = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return formatNumberRaw(value, decimals, '', NumberFormatConfig.decimalSeparator, NumberFormatConfig.minDigitsForThousandsSeparator, NumberFormatConfig.standardDecimalPatternInfo, NumberFormatConfig.numberingSystemData);
}
/**
 * Format a number for string output.
 *
 * This will format a given number according to the user's locale.
 * Thousand delimiters will be added. Use `formatNumber` if you don't
 * want them to be added.
 *
 * You may optionally specify the number of decimal places that should
 * be displayed. For instance, pass `0` to round to the nearest
 * integer, `2` to round to nearest cent when displaying currency, etc.
 */


function formatNumberWithThousandDelimiters(value, decimals) {
  var NumberFormatConfig = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return formatNumberRaw(value, decimals, NumberFormatConfig.numberDelimiter, NumberFormatConfig.decimalSeparator, NumberFormatConfig.minDigitsForThousandsSeparator, NumberFormatConfig.standardDecimalPatternInfo, NumberFormatConfig.numberingSystemData);
}
/**
 * Calculate how many powers of 10 there are in a given number
 * I.e. 1.23 has 0, 100 and 999 have 2, and 1000 has 3.
 * Used in the inflation and rounding calculations below.
 */


function _getNumberOfPowersOfTen(value) {
  return value && Math.floor(Math.log10(Math.abs(value)));
}
/**
 * Format a number for string output.
 *
 * This will format a given number according to the specified significant
 * figures.
 *
 * Also, specify the number of decimal places that should
 * be displayed. For instance, pass `0` to round to the nearest
 * integer, `2` to round to nearest cent when displaying currency, etc.
 *
 * Example:
 * > formatNumberWithLimitedSigFig(123456789, 0, 2)
 * "120,000,000"
 * > formatNumberWithLimitedSigFig(1.23456789, 2, 2)
 * "1.20"
 */


function formatNumberWithLimitedSigFig(value, decimals, numSigFigs) {
  // First make the number sufficiently integer-like.
  var power = _getNumberOfPowersOfTen(value);

  var inflatedValue = value;

  if (power < numSigFigs) {
    inflatedValue = value * Math.pow(10, -power + numSigFigs);
  } // Now that we have a large enough integer, round to cut off some digits.


  var roundTo = Math.pow(10, _getNumberOfPowersOfTen(inflatedValue) - numSigFigs + 1);
  var truncatedValue = Math.round(inflatedValue / roundTo) * roundTo; // Bring it back to whatever the number's magnitude was before.

  if (power < numSigFigs) {
    truncatedValue /= Math.pow(10, -power + numSigFigs); // Determine number of decimals based on sig figs

    if (decimals == null) {
      return formatNumberWithThousandDelimiters(truncatedValue, numSigFigs - power - 1);
    }
  } // Decimals


  return formatNumberWithThousandDelimiters(truncatedValue, decimals);
}

function _roundNumber(valueParam, decimalsParam) {
  var decimals = decimalsParam == null ? 0 : decimalsParam;
  var pow = Math.pow(10, decimals);
  var value = valueParam;
  value = Math.round(value * pow) / pow;
  value += '';

  if (!decimals) {
    return value;
  } // if value is small and
  // was converted to scientific notation, don't append anything
  // as we are already done


  if (value.indexOf('e-') !== -1) {
    return value;
  }

  var pos = value.indexOf('.');
  var zeros = 0;

  if (pos == -1) {
    value += '.';
    zeros = decimals;
  } else {
    zeros = decimals - (value.length - pos - 1);
  }

  for (var i = 0, l = zeros; i < l; i++) {
    value += '0';
  }

  return value;
}

var addZeros = function addZeros(x, count) {
  var result = x;

  for (var i = 0; i < count; i++) {
    result += '0';
  }

  return result;
};

function truncateLongNumber(number, decimals) {
  var pos = number.indexOf('.');
  var dividend = pos === -1 ? number : number.slice(0, pos);
  var remainder = pos === -1 ? '' : number.slice(pos + 1);
  return decimals != null ? dividend + '.' + addZeros(remainder.slice(0, decimals), decimals - remainder.length) : dividend;
}
/**
 * Parse a number.
 *
 * If the number is preceded or followed by a currency symbol or other
 * letters, they will be ignored.
 *
 * A decimal delimiter should be passed to respect the user's locale.
 *
 * Calling this function directly is discouraged, unless you know
 * exactly what you're doing. Consider using `parseNumber` below.
 */


function parseNumberRaw(text, decimalDelimiter) {
  var numberDelimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  // Replace numerals based on current locale data
  var digitsMap = _getNativeDigitsMap();

  var _text = text;

  if (digitsMap) {
    _text = text.split('').map(function (
    /*string*/
    character) {
      return digitsMap[character] || character;
    }).join('').trim();
  }

  _text = _text.replace(/^[^\d]*\-/, "\x02"); // preserve negative sign

  _text = _text.replace(matchCurrenciesWithDots, ''); // remove some currencies

  var decimalExp = escapeRegex(decimalDelimiter);
  var numberExp = escapeRegex(numberDelimiter);

  var isThereADecimalSeparatorInBetween = _buildRegex('^[^\\d]*\\d.*' + decimalExp + '.*\\d[^\\d]*$');

  if (!isThereADecimalSeparatorInBetween.test(_text)) {
    var isValidWithDecimalBeforeHand = _buildRegex('(^[^\\d]*)' + decimalExp + '(\\d*[^\\d]*$)');

    if (isValidWithDecimalBeforeHand.test(_text)) {
      _text = _text.replace(isValidWithDecimalBeforeHand, "$1\x01$2");
      return _parseCodifiedNumber(_text);
    }

    var isValidWithoutDecimal = _buildRegex('^[^\\d]*[\\d ' + escapeRegex(numberExp) + ']*[^\\d]*$');

    if (!isValidWithoutDecimal.test(_text)) {
      _text = '';
    }

    return _parseCodifiedNumber(_text);
  }

  var isValid = _buildRegex('(^[^\\d]*[\\d ' + numberExp + ']*)' + decimalExp + '(\\d*[^\\d]*$)');

  _text = isValid.test(_text) ? _text.replace(isValid, "$1\x01$2") : '';
  return _parseCodifiedNumber(_text);
}
/**
 * A codified number has \u0001 in the place of a decimal separator and a
 * \u0002 in the place of a negative sign.
 */


function _parseCodifiedNumber(text) {
  var _text = text.replace(/[^0-9\u0001\u0002]/g, '') // remove everything but numbers,
  // decimal separator and negative sign
  .replace("\x01", '.') // restore decimal separator
  .replace("\x02", '-'); // restore negative sign


  var value = Number(_text);
  return _text === '' || isNaN(value) ? null : value;
}

function _getNativeDigitsMap() {
  var NumberFormatConfig = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  var nativeDigitMap = {};
  var digits = NumberFormatConfig.numberingSystemData && NumberFormatConfig.numberingSystemData.digits;

  if (digits == null) {
    return null;
  }

  for (var i = 0; i < digits.length; i++) {
    nativeDigitMap[digits.charAt(i)] = i.toString();
  }

  return nativeDigitMap;
}

function parseNumber(text) {
  var NumberFormatConfig = NumberFormatConsts.get(FbtHooks.getViewerContext().locale);
  return parseNumberRaw(text, NumberFormatConfig.decimalSeparator || '.', NumberFormatConfig.numberDelimiter);
}

var intlNumUtils = {
  formatNumber: formatNumber,
  formatNumberRaw: formatNumberRaw,
  formatNumberWithThousandDelimiters: formatNumberWithThousandDelimiters,
  formatNumberWithLimitedSigFig: formatNumberWithLimitedSigFig,
  parseNumber: parseNumber,
  parseNumberRaw: parseNumberRaw,
  truncateLongNumber: truncateLongNumber,

  /**
   * Converts a float into a prettified string. e.g. 1000.5 => "1,000.5"
   *
   * @deprecated Use `intlNumber.formatNumberWithThousandDelimiters(num)`
   * instead. It automatically handles decimal and thousand delimiters and
   * gets edge cases for Norwegian and Spanish right.
   *
   */
  getFloatString: function getFloatString(num, thousandDelimiter, decimalDelimiter) {
    var str = String(num);
    var pieces = str.split('.');
    var intPart = intlNumUtils.getIntegerString(pieces[0], thousandDelimiter);

    if (pieces.length === 1) {
      return intPart;
    }

    return intPart + decimalDelimiter + pieces[1];
  },

  /**
   * Converts an integer into a prettified string. e.g. 1000 => "1,000"
   *
   * @deprecated Use `intlNumber.formatNumberWithThousandDelimiters(num, 0)`
   * instead. It automatically handles decimal thousand delimiters and gets
   * edge cases for Norwegian and Spanish right.
   *
   */
  getIntegerString: function getIntegerString(num, thousandDelimiter) {
    var delim = thousandDelimiter;

    if (delim === '') {
      if (process.env.NODE_ENV !== "production") {
        throw new Error('thousandDelimiter cannot be empty string!');
      }

      delim = ',';
    }

    var str = String(num);
    var regex = /(\d+)(\d{3})/;

    while (regex.test(str)) {
      str = str.replace(regex, '$1' + delim + '$2');
    }

    return str;
  }
};
module.exports = intlNumUtils;