"use strict";

var _assign = require("object-assign");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * Flow doesn't know about the transformations of fbt() calls into tables, so
 * all it sees is that callers are adding strings and arrays, which isn't
 * allowed so flow for this file is ignored in .flowconfig.
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

/* eslint max-len: ["warn", 120] */
require("./FbtEnv").setupOnce();

var FbtHooks = require("./FbtHooks");

var _require = require("./FbtQTOverrides"),
    overrides = _require.overrides;

var FbtResultBase = require("./FbtResultBase");

var FbtTable = require("./FbtTable");

var FbtTableAccessor = require("./FbtTableAccessor");

var GenderConst = require("./GenderConst");

var _require2 = require("./IntlVariationResolver"),
    getGenderVariations = _require2.getGenderVariations,
    getNumberVariations = _require2.getNumberVariations;

var intlNumUtils = require("./intlNumUtils");

var invariant = require("invariant");

var substituteTokens = require("./substituteTokens");

var jsonExportMode = false; // Used only in React Native

var ARG = FbtTable.ARG;
var ParamVariation = {
  number: 0,
  gender: 1
};
var ValidPronounUsages = {
  object: 0,
  possessive: 1,
  reflexive: 2,
  subject: 3
};
var cachedFbtResults = {};
/**
 * fbt._() iterates through all indices provided in `args` and accesses
 * the relevant entry in the `table` resulting in the appropriate
 * pattern string.  It then substitutes all relevant substitutions.
 *
 * @param inputTable - Example: {
 *   "singular": "You have a cat in a photo album named {title}",
 *   "plural": "You have cats in a photo album named {title}"
 * }
 * -or-
 * {
 *   "singular": ["You have a cat in a photo album named {title}", <hash>],
 *   "plural": ["You have cats in a photo album named {title}", <hash>]
 * }
 *
 * or table can simply be a pattern string:
 *   "You have a cat in a photo album named {title}"
 * -or-
 *    ["You have a cat in a photo album named {title}", <hash>]
 *
 * @param inputArgs - arguments from which to pull substitutions
 *    Example: [["singular", null], [null, {title: "felines!"}]]
 *
 * @param options - options for runtime
 * translation dictionary access. hk stands for hash key which is used to look
 * up translated payload in React Native. ehk stands for enum hash key which
 * contains a structured enums to hash keys map which will later be traversed
 * to look up enum-less translated payload.
 */

function fbtCallsite(inputTable, inputArgs, options) {
  // TODO T61652022: Remove this when no longer used in fbsource
  if (((options === null || options === void 0 ? void 0 : options.hk) || (options === null || options === void 0 ? void 0 : options.ehk)) && jsonExportMode) {
    /* $FlowFixMe[incompatible-return] : breaking typing because this should
     * never happen */
    return {
      text: inputTable,
      fbt: true,
      hashKey: options.hk
    };
  } // Adapt the input payload to the translated table and arguments we expect
  //
  // WWW: The payload is ready, as-is, and is pre-translated UNLESS we detect
  //      the magic BINAST string which needs to be stripped if it exists.
  //
  // RN: we look up our translated table via the hash key (options.hk) and
  //     flattened enum hash key (options.ehk), which partially resolves the
  //     translation for the enums (should they exist).
  //
  // OSS: The table is the English payload, and, by default, we lookup the
  //      translated payload via FbtTranslations


  var _FbtHooks$getTranslat = FbtHooks.getTranslatedInput({
    table: inputTable,
    args: inputArgs,
    options: options
  }),
      pattern = _FbtHooks$getTranslat.table,
      args = _FbtHooks$getTranslat.args; // [fbt_impressions]
  // If this is a string literal (no tokens to substitute) then 'args' is empty
  // and the logic will skip the table traversal.
  // [table traversal]
  // At this point we assume that table is a hash (possibly nested) that we
  // need to traverse in order to pick the correct string, based on the
  // args that follow.


  var allSubstitutions = {};

  if (pattern.__vcg != null) {
    args = args || [];

    var _FbtHooks$getViewerCo = FbtHooks.getViewerContext(),
        GENDER = _FbtHooks$getViewerCo.GENDER;

    var variation = getGenderVariations(GENDER);
    args.unshift(FbtTableAccessor.getGenderResult(variation, null, GENDER));
  }

  if (args) {
    if (typeof pattern !== 'string') {
      // On mobile, table can be accessed at the native layer when fetching
      // translations. If pattern is not a string here, table has not been accessed
      pattern = FbtTable.access(pattern, args, 0);
    }

    allSubstitutions = _assign.apply(Object, [{}].concat(args.map(function (arg) {
      return arg[ARG.SUBSTITUTION] || {};
    })));
    !(pattern !== null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Table access failed') : invariant(false) : void 0;
  }

  var patternString, patternHash;

  if (Array.isArray(pattern)) {
    // [fbt_impressions]
    // When logging of string impressions is enabled, the string and its hash
    // are packaged in an array. We want to log the hash
    patternString = pattern[0];
    patternHash = pattern[1]; // Append '1_' for appid's prepended to our i18n hash
    // (see intl_get_application_id)

    var stringID = '1_' + patternHash;

    if (overrides[stringID] != null && overrides[stringID] !== '') {
      patternString = overrides[stringID];
      FbtHooks.onTranslationOverride(patternHash);
    }

    FbtHooks.logImpression(patternHash);
  } else if (typeof pattern === 'string') {
    patternString = pattern;
  } else {
    throw new Error('Table access did not result in string: ' + (pattern === undefined ? 'undefined' : JSON.stringify(pattern)) + ', Type: ' + typeof pattern);
  }

  var cachedFbt = cachedFbtResults[patternString];

  var hasSubstitutions = _hasKeys(allSubstitutions);

  if (cachedFbt && !hasSubstitutions) {
    return cachedFbt;
  } else {
    var fbtContent = substituteTokens(patternString, allSubstitutions); // Use this._wrapContent voluntarily so that it can be overwritten in fbs.js

    var result = this._wrapContent(fbtContent, patternString, patternHash);

    if (!hasSubstitutions) {
      cachedFbtResults[patternString] = result;
    }

    return result;
  }
}
/**
 * _hasKeys takes an object and returns whether it has any keys. It purposefully
 * avoids creating the temporary arrays incurred by calling Object.keys(o)
 * @param {Object} o - Example: "allSubstitutions"
 */


function _hasKeys(o) {
  for (var k in o) {
    return true;
  }

  return false;
}
/**
 * fbt._enum() takes an enum value and returns a tuple in the format:
 * [value, null]
 * @param value - Example: "id1"
 * @param range - Example: {"id1": "groups", "id2": "videos", ...}
 */


function fbtEnum(value, range) {
  if (process.env.NODE_ENV !== "production") {
    !(value in range) ? process.env.NODE_ENV !== "production" ? invariant(false, 'invalid value: %s', value) : invariant(false) : void 0;
  }

  return FbtTableAccessor.getEnumResult(value);
}
/**
 * fbt._subject() takes a gender value and returns a tuple in the format:
 * [variation, null]
 * @param value - Example: "16777216"
 */


function fbtSubject(value) {
  return FbtTableAccessor.getGenderResult(getGenderVariations(value), null, value);
}
/**
 * fbt._param() takes a `label` and `value` returns a tuple in the format:
 * [?variation, {label: "replaces {label} in pattern string"}]
 * @param label - Example: "label"
 * @param value
 *   - E.g. 'replaces {label} in pattern'
 * @param variations Variation type and variation value (if explicitly provided)
 *   E.g.
 *   number: `[0]`, `[0, count]`, or `[0, foo.someNumber() + 1]`
 *   gender: `[1, someGender]`
 */


function fbtParam(label, value, variations) {
  var substitution = _defineProperty({}, label, value);

  if (variations) {
    if (variations[0] === ParamVariation.number) {
      var number = variations.length > 1 ? variations[1] : value;
      !(typeof number === 'number') ? process.env.NODE_ENV !== "production" ? invariant(false, 'fbt.param expected number') : invariant(false) : void 0;
      var variation = getNumberVariations(number); // this will throw if `number` is invalid

      if (typeof value === 'number') {
        substitution[label] = intlNumUtils.formatNumberWithThousandDelimiters(value);
      }

      return FbtTableAccessor.getNumberResult(variation, substitution, number);
    } else if (variations[0] === ParamVariation.gender) {
      var gender = variations[1];
      !(gender != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'expected gender value') : invariant(false) : void 0;
      return FbtTableAccessor.getGenderResult(getGenderVariations(gender), substitution, gender);
    } else {
      !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unknown invariant mask') : invariant(false) : void 0;
    }
  } else {
    return FbtTableAccessor.getSubstitution(substitution);
  }
}
/**
 * fbt._implicitParam() behaves like fbt._param()
 */


function fbtImplicitParam(label, value, variations) {
  return this._param(label, value, variations);
}
/**
 * fbt._plural() takes a `count` and 2 optional params: `label` and `value`.
 * It returns a tuple in the format:
 * [?variation, {label: "replaces {label} in pattern string"}]
 * @param count - Example: 2
 * @param label
 *   - E.g. 'replaces {number} in pattern'
 * @param value
 *   - The value to use (instead of count) for replacing {label}
 */


function fbtPlural(count, label, value) {
  var variation = getNumberVariations(count);
  var substitution = {}; // $FlowFixMe[sketchy-null-string]

  if (label) {
    if (typeof value === 'number') {
      substitution[label] = intlNumUtils.formatNumberWithThousandDelimiters(value);
    } else {
      substitution[label] = // $FlowFixMe[sketchy-null-mixed]
      value || intlNumUtils.formatNumberWithThousandDelimiters(count);
    }
  }

  return FbtTableAccessor.getNumberResult(variation, substitution, count);
}
/**
 * fbt._pronoun() takes a 'usage' string and a GenderConst value and returns a tuple in the format:
 * [variations, null]
 * @param usage - Example: PronounUsage.object.
 * @param gender - Example: GenderConst.MALE_SINGULAR
 * @param options - Example: { human: 1 }
 */


function fbtPronoun(usage, gender, options) {
  !(gender !== GenderConst.NOT_A_PERSON || !options || !options.human) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Gender cannot be GenderConst.NOT_A_PERSON if you set "human" to true') : invariant(false) : void 0;
  var genderKey = getPronounGenderKey(usage, gender);
  return FbtTableAccessor.getPronounResult(genderKey);
}
/**
 * Must match implementation from babel-plugin-fbt/src/fbt-nodes/FbtPronounNode.js
 */


function getPronounGenderKey(usage, gender) {
  switch (gender) {
    case GenderConst.NOT_A_PERSON:
      return usage === ValidPronounUsages.object || usage === ValidPronounUsages.reflexive ? GenderConst.NOT_A_PERSON : GenderConst.UNKNOWN_PLURAL;

    case GenderConst.FEMALE_SINGULAR:
    case GenderConst.FEMALE_SINGULAR_GUESS:
      return GenderConst.FEMALE_SINGULAR;

    case GenderConst.MALE_SINGULAR:
    case GenderConst.MALE_SINGULAR_GUESS:
      return GenderConst.MALE_SINGULAR;

    case GenderConst.MIXED_UNKNOWN:
    case GenderConst.FEMALE_PLURAL:
    case GenderConst.MALE_PLURAL:
    case GenderConst.NEUTER_PLURAL:
    case GenderConst.UNKNOWN_PLURAL:
      return GenderConst.UNKNOWN_PLURAL;

    case GenderConst.NEUTER_SINGULAR:
    case GenderConst.UNKNOWN_SINGULAR:
      return usage === ValidPronounUsages.reflexive ? GenderConst.NOT_A_PERSON : GenderConst.UNKNOWN_PLURAL;
  } // Mirrors the behavior of :fbt:pronoun when an unknown gender value is given.


  return GenderConst.NOT_A_PERSON;
}
/**
 * fbt.name() takes a `label`, `value`, and `gender` and
 * returns a tuple in the format:
 * [gender, {label: "replaces {label} in pattern string"}]
 * @param label - Example: "label"
 * @param value
 *   - E.g. 'replaces {label} in pattern'
 * @param gender - Example: "IntlVariations.GENDER_FEMALE"
 */


function fbtName(label, value, gender) {
  var variation = getGenderVariations(gender);
  var substitution = {};
  substitution[label] = value;
  return FbtTableAccessor.getGenderResult(variation, substitution, gender);
}

function wrapContent(fbtContent, translation, hash) {
  var contents = typeof fbtContent === 'string' ? [fbtContent] : fbtContent;
  var errorListener = FbtHooks.getErrorListener({
    translation: translation,
    hash: hash
  });
  var result = FbtHooks.getFbtResult({
    contents: contents,
    errorListener: errorListener,
    patternHash: hash,
    patternString: translation
  }); // $FlowFixMe[incompatible-return] FbtHooks.getFbtResult returns mixed.

  return result;
}

function enableJsonExportMode() {
  jsonExportMode = true;
}

function disableJsonExportMode() {
  jsonExportMode = false;
} // Must define this as a standalone function
// because Flow doesn't support %check on as a class static method


function isFbtInstance(value) {
  return value instanceof FbtResultBase;
}

var fbt = function fbt() {};

fbt._ = fbtCallsite;
fbt._enum = fbtEnum;
fbt._implicitParam = fbtImplicitParam;
fbt._name = fbtName;
fbt._param = fbtParam;
fbt._plural = fbtPlural;
fbt._pronoun = fbtPronoun;
fbt._subject = fbtSubject;
fbt._wrapContent = wrapContent;
fbt.disableJsonExportMode = disableJsonExportMode;
fbt.enableJsonExportMode = enableJsonExportMode;
fbt.isFbtInstance = isFbtInstance;

if (process.env.NODE_ENV !== "production") {
  fbt._getCachedFbt = function (s) {
    return cachedFbtResults[s];
  };
} // Use $-FlowFixMe instead of $-FlowExpectedError since fbsource doesn't use the latter


module.exports = fbt;