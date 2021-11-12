/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * 
 * Run `phps GenderGenScript` to regenerate this file.
 *
 * @generated
 * 
 * @emails oncall+i18n_fbt_js
 * @noformat
 * @nogrep
 */
'use strict';

const FBLocaleToLang = require('../FBLocaleToLang');

const IntlDefaultGenderType = require('./IntlDefaultGenderType');

const IntlMergedUnknownGenderType = require('./IntlMergedUnknownGenderType');

const _mergedLocales = {
  "ar_AR": 1,
  "ht_HT": 1,
  "ks_IN": 1,
  "lv_LV": 1,
  "qk_DZ": 1,
  "qs_DE": 1,
  "qv_IT": 1
};
const _mergedLangs = {
  "ar": 1,
  "ht": 1,
  "ks": 1,
  "lv": 1,
  "kab": 1,
  "dsb": 1,
  "vec": 1
};
const IntlGenderType = {
  forLanguage(lang) {
    if (_mergedLangs[lang]) {
      return IntlMergedUnknownGenderType;
    }

    return IntlDefaultGenderType;
  },

  forLocale(locale) {
    if (_mergedLocales[locale]) {
      return IntlMergedUnknownGenderType;
    }

    return IntlGenderType.forLanguage(FBLocaleToLang.get(locale));
  }

};
module.exports = IntlGenderType;