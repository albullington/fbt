"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPhonologicalRules = applyPhonologicalRules;
exports.dedupeStops = dedupeStops;
exports.PUNCT_CHAR_CLASS = void 0;

var _FbtHooks = _interopRequireDefault(require("./FbtHooks"));

var _IntlPhonologicalRewrites = _interopRequireDefault(require("./IntlPhonologicalRewrites"));

var _IntlRedundantStops = _interopRequireDefault(require("./IntlRedundantStops"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Regular expression snippet containing all the characters that we
 * count as sentence-final punctuation.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var PUNCT_CHAR_CLASS = '[.!?' + "\u3002" + // Chinese/Japanese period
"\uFF01" + // Fullwidth exclamation point
"\uFF1F" + // Fullwidth question mark
"\u0964" + // Hindi "full stop"
"\u2026" + // Chinese ellipsis
"\u0EAF" + // Laotian ellipsis
"\u1801" + // Mongolian ellipsis
"\u0E2F" + // Thai ellipsis
"\uFF0E" + // Fullwidth full stop
']';
exports.PUNCT_CHAR_CLASS = PUNCT_CHAR_CLASS;
var rulesPerLocale = {};

function _getMemoizedRules(localeArg) {
  var locale = localeArg !== null && localeArg !== void 0 ? localeArg : '';
  var rules = rulesPerLocale[locale];

  if (rules == null) {
    rules = rulesPerLocale[locale] = _getRules(localeArg);
  }

  return rules;
}

function _getRules(locale) {
  var rules = [];

  var rewrites = _IntlPhonologicalRewrites["default"].get(locale); // Process the patterns and replacements by applying metaclasses.


  for (var pattern in rewrites.patterns) {
    var replacement = rewrites.patterns[pattern]; // "Metaclasses" are shorthand for larger character classes. For example,
    // _C may refer to consonants and _V to vowels for a locale.

    for (var metaclass in rewrites.meta) {
      var metaclassRegexp = new RegExp(metaclass.slice(1, -1), 'g');
      var characterClass = rewrites.meta[metaclass];
      pattern = pattern.replace(metaclassRegexp, characterClass);
      replacement = replacement.replace(metaclassRegexp, characterClass);
    }

    if (replacement === 'javascript') {
      replacement = function replacement(match) {
        return match.slice(1).toLowerCase();
      };
    }

    rules.push([new RegExp(pattern.slice(1, -1), 'g'), replacement]);
  }

  return rules;
}
/**
 * Applies phonological rules (appropriate to the locale)
 * at the morpheme boundary when tokens are replaced with values.
 * For languages like Turkish, we allow translators to use shorthand
 * for a pattern of inflection (a suffix like '(y)i becomes 'i or 'yi or 'a or
 * 'ye, etc. depending on context).
 *
 * Input: Translated string with each {token} substituted with
 *        "\x01value\x01" (e.g., "\x01Ozgur\x01(y)i..." which was
 *        "{name}(y)i...")
 * Returns: String with phonological rules applied (e.g., "Ozguri...")
 */


function applyPhonologicalRules(text) {
  var rules = _getMemoizedRules(_FbtHooks["default"].getViewerContext().locale);

  var result = text;

  for (var i = 0; i < rules.length; i++) {
    var _rules$i = rules[i],
        regexp = _rules$i[0],
        replacement = _rules$i[1];
    result = result.replace(regexp, replacement);
  } // If we have no rules (or if we already applied them), remove the delimiters.


  return result.replace(/\x01/g, '');
}
/**
 * Map all equivalencies to the normalized key for the stop category.  These
 * are the entries in the redundancy mapping
 */


var _normalizedStops = new Map();

for (var norm in _IntlRedundantStops["default"].equivalencies) {
  var _iterator = _createForOfIteratorHelper([norm].concat(_IntlRedundantStops["default"].equivalencies[norm])),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var eq = _step.value;

      _normalizedStops.set(eq, norm);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var _redundancies = new Map();

for (var prefix in _IntlRedundantStops["default"].redundancies) {
  _redundancies.set(prefix, new Set(_IntlRedundantStops["default"].redundancies[prefix]));
}

function isRedundant(rawPrefix, rawSuffix) {
  var _redundancies$get;

  var prefix = _normalizedStops.get(rawPrefix);

  var suffix = _normalizedStops.get(rawSuffix);

  return ((_redundancies$get = _redundancies.get(prefix)) === null || _redundancies$get === void 0 ? void 0 : _redundancies$get.has(suffix)) === true;
}
/**
 * If suffix is redundant with prefix (as determined by the redundancy map),
 * return the empty string, otherwise return suffix.
 */


function dedupeStops(prefix, suffix) {
  // We can naively grab the last "character" (a general Unicode "no-no") from
  // our string because we know our set of stops we test against have no
  // diacritics nor lie outside the BMP
  return isRedundant(prefix[prefix.length - 1], suffix) ? '' : suffix;
}