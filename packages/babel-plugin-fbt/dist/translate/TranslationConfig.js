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

const IntlNumberType = require('./CLDR/IntlNumberType');

const IntlGenderType = require('./gender/IntlGenderType');

const {
  EXACTLY_ONE,
  FbtVariationType
} = require('./IntlVariations');
/**
 * Represents a given locale's variation (number/gender) configuration.
 * i.e. which variations we should default to when unknown
 */


class TranslationConfig {
  constructor(numberType, genderType) {
    _defineProperty(this, "numberType", void 0);

    _defineProperty(this, "genderType", void 0);

    this.numberType = numberType;
    this.genderType = genderType;
  }

  getTypesFromMask(mask) {
    if (mask === FbtVariationType.NUMBER) {
      return [EXACTLY_ONE].concat(this.numberType.getNumberVariations());
    }

    return this.genderType.getGenderVariations();
  }

  isDefaultVariation(variation) {
    // variation could be "*", or it could be number variation or
    // gender variation value in either string or number type.
    // $FlowFixMe[incompatible-call] Allow `variation` to be any type so that existing translations still work
    const value = Number.parseInt(variation, 10);

    if (Number.isNaN(value)) {
      return false;
    }

    return value === this.numberType.getFallback() || value === this.genderType.getFallback();
  }

  static fromFBLocale(locale) {
    return new TranslationConfig(IntlNumberType.forLocale(locale), IntlGenderType.forLocale(locale));
  }

}

module.exports = TranslationConfig;