/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Corresponds to IntlJSTranslatationDataEntry in Hack
 */
class TranslationData {
  constructor(tokens, types, translations) {
    _defineProperty(this, "tokens", void 0);

    _defineProperty(this, "types", void 0);

    _defineProperty(this, "translations", void 0);

    _defineProperty(this, "_defaultTranslation", void 0);

    this.tokens = tokens;
    this.types = types;
    this.translations = translations;
  }

  hasTranslation() {
    return this.translations.length > 0;
  } // Makes a best effort attempt at finding the default translation.


  getDefaultTranslation(config) {
    if (this._defaultTranslation === undefined) {
      for (let i = 0; i < this.translations.length; ++i) {
        const trans = this.translations[i];
        let isDefault = true;

        for (const v in trans.variations) {
          if (!config.isDefaultVariation(trans.variations[v])) {
            isDefault = false;
            break;
          }
        }

        if (isDefault) {
          return this._defaultTranslation = trans.translation;
        }
      }

      this._defaultTranslation = null;
    }

    return this._defaultTranslation;
  }

}

_defineProperty(TranslationData, "fromJSON", json => {
  if (json == null) {
    // Hash key is logged to stderr in `processTranslations`
    return null;
  }

  return new TranslationData(json.tokens, json.types, json.translations);
});

module.exports = TranslationData;