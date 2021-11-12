/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * Dummy class on www. Fetches translations from language packs on RN/CS.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

var _assign = require("object-assign");

var FbtHooks = require("./FbtHooks");

var translatedFbts = {};
var DEFAULT_SRC_LOCALE = 'en_US';
var FbtTranslations = {
  getTranslatedInput: function getTranslatedInput(input, userInputLocale) {
    var args = input.args,
        options = input.options;
    var hashKey = options === null || options === void 0 ? void 0 : options.hk;
    var locale = userInputLocale || FbtHooks.getViewerContext().locale;
    var table = translatedFbts[locale];

    if (process.env.NODE_ENV !== "production") {
      if (!table && locale !== DEFAULT_SRC_LOCALE) {
        console.warn('Translations have not been provided');
      }
    }

    if (hashKey == null || (table === null || table === void 0 ? void 0 : table[hashKey]) == null) {
      return null;
    }

    return {
      table: table[hashKey],
      args: args
    };
  },
  registerTranslations: function registerTranslations(translations) {
    translatedFbts = translations;
  },
  getRegisteredTranslations: function getRegisteredTranslations() {
    return translatedFbts;
  },
  mergeTranslations: function mergeTranslations(newTranslations) {
    Object.keys(newTranslations).forEach(function (locale) {
      var _translatedFbts$local;

      translatedFbts[locale] = _assign((_translatedFbts$local = translatedFbts[locale]) !== null && _translatedFbts$local !== void 0 ? _translatedFbts$local : {}, newTranslations[locale]);
    });
  }
};
module.exports = FbtTranslations;