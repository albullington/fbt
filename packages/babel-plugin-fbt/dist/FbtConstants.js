/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * Same set of 'usage' values as in :fbt:pronoun::type. Must match
 * PRONOUN_USAGE in fbt.js.
 * NOTE: Using 'usage' here, whereas :fbt:pronoun uses 'type'. It's confusing,
 * but fbt() already uses 'type' as the tag within the fbt table data for the
 * to-be-localized text.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */

/*eslint max-len: ["error", 100]*/
const keyMirror = require('fbjs/lib/keyMirror');

const SENTINEL = '__FBT__';
const PluralRequiredAttributes = {
  count: true
};
const ShowCount = {
  yes: true,
  no: true,
  ifMany: true
};
const ShowCountKeys = keyMirror(ShowCount);
const PluralOptions = {
  value: true,
  // optional value to replace token (rather than count)
  showCount: ShowCount,
  name: true,
  // token
  many: true
};
const ValidPluralOptions = { ...PluralOptions,
  ...PluralRequiredAttributes
};
const ValidPronounUsages = {
  object: 0,
  possessive: 1,
  reflexive: 2,
  subject: 3
};
const ValidPronounUsagesKeys = keyMirror(ValidPronounUsages);
const ValidPronounOptions = {
  human: {
    true: true,
    false: true
  },
  capitalize: {
    true: true,
    false: true
  }
};
const PronounRequiredAttributes = {
  type: true,
  // See ValidPronounUsages for valid strings
  gender: true
};
/**
 * Valid options allowed in the fbt(...) calls.
 */

const ValidFbtOptions = {
  author: true,
  common: true,
  doNotExtract: true,
  preserveWhitespace: true,
  project: true,
  subject: true
};
const FbtBooleanOptions = {
  preserveWhitespace: true,
  doNotExtract: true
};
const CommonOption = 'common';
const FbtCallMustHaveAtLeastOneOfTheseAttributes = ['desc', CommonOption];
const FbtRequiredAttributes = {
  desc: true
};
const PLURAL_PARAM_TOKEN = 'number';
const RequiredParamOptions = {
  name: true
};
const ValidParamOptions = {
  number: true,
  gender: true,
  ...RequiredParamOptions
};
const FbtType = {
  TABLE: 'table',
  TEXT: 'text'
};
const JSModuleName = {
  FBT: 'fbt',
  REACT_FBT: 'Fbt',
  FBS: 'fbs'
}; // Used to help detect the usage of the JS fbt/fbs API inside a JS file
// Closely matches the Grep regexp in https://fburl.com/code/y1yt6slg

const ModuleNameRegExp = /<[Ff]b[st]\b|fb[st](\.c)?\s*\(/;
const FBT_ENUM_MODULE_SUFFIX = '$FbtEnum';
module.exports = {
  CommonOption,
  FBT_ENUM_MODULE_SUFFIX,
  FbtBooleanOptions,
  FbtCallMustHaveAtLeastOneOfTheseAttributes,
  FbtRequiredAttributes,
  FbtType,
  JSModuleName,
  ModuleNameRegExp,
  PLURAL_PARAM_TOKEN,
  PluralOptions,
  PluralRequiredAttributes,
  PronounRequiredAttributes,
  RequiredParamOptions,
  SENTINEL,
  ShowCountKeys,
  ValidFbtOptions,
  ValidParamOptions,
  ValidPluralOptions,
  ValidPronounOptions,
  ValidPronounUsages,
  ValidPronounUsagesKeys
};