"use strict";

var _IntlPunctuation = require("./IntlPunctuation");

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error

/*
 * $FlowFixMe[method-unbinding] Use original method in case the token names contain
 * a 'hasOwnProperty' key too; or if userland code redefined that method.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty; // This pattern finds tokens inside a string: 'string with {token} inside'.
// It also grabs any punctuation that may be present after the token, such as
// brackets, fullstops and elipsis (for various locales too!)

var parameterRegexp = new RegExp('\\{([^}]+)\\}(' + _IntlPunctuation.PUNCT_CHAR_CLASS + '*)', 'g');

// Hack into React internals to avoid key warnings
function markAsSafeForReact(object) {
  if (process.env.NODE_ENV !== "production") {
    // If this looks like a ReactElement, mark it as safe to silence any
    // key warnings.
    // I use a string key to avoid any possible private variable transforms.
    var storeKey = '_store';
    var store = object[storeKey];

    if (object.type != null && object.type != '' && typeof object.props === 'object' && store != null && typeof store === 'object' && typeof store.validated === 'boolean') {
      store.validated = true;
    }
  }

  return object;
}
/**
 * Does the token substitution fbt() but without the string lookup.
 * Used for in-place substitutions in translation mode.
 */


function substituteTokens(template, args) {
  if (args == null) {
    return template;
  }

  !(typeof args === 'object') ? process.env.NODE_ENV !== "production" ? (0, _invariant["default"])(false, 'The 2nd argument must be an object (not a string) for tx(%s, ...)', template) : invariant(false) : void 0; // Splice in the arguments while keeping rich object ones separate.

  var objectPieces = [];
  var argNames = [];
  var stringPieces = template.replace(parameterRegexp, function (_match, parameter, punctuation) {
    if (process.env.NODE_ENV !== "production") {
      !hasOwnProperty.call(args, parameter) ? process.env.NODE_ENV !== "production" ? (0, _invariant["default"])(false, 'Expected fbt parameter names (%s) to also contain `%s`', Object.keys(args).map(function (paramName) {
        return "`".concat(paramName, "`");
      }).join(', '), parameter) : invariant(false) : void 0;
    }

    var argument = args[parameter];

    if (argument != null && typeof argument === 'object') {
      objectPieces.push(argument);
      argNames.push(parameter); // End of Transmission Block sentinel marker

      return '\x17' + punctuation;
    } else if (argument === null) {
      return '';
    }

    return String(argument) + (0, _IntlPunctuation.dedupeStops)(String(argument), punctuation);
  }).split('\x17').map(_IntlPunctuation.applyPhonologicalRules);

  if (stringPieces.length === 1) {
    return stringPieces[0];
  } // Zip together the lists of pieces.
  // We skip adding empty strings from stringPieces since they were
  // injected from translation patterns that only contain tokens. See D20453562


  var pieces = stringPieces[0] !== '' ? [stringPieces[0]] : [];

  for (var i = 0; i < objectPieces.length; i++) {
    pieces.push(markAsSafeForReact(objectPieces[i]));

    if (stringPieces[i + 1] !== '') {
      pieces.push(stringPieces[i + 1]);
    }
  }

  return pieces;
}

module.exports = substituteTokens;