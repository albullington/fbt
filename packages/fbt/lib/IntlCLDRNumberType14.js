/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * 
 * Generated by LanguageCLDRGenScript
 *
 * @generated
 * @emails oncall+i18n_fbt_js
 * @noformat
 * @nogrep
 */
'use strict';

var IntlVariations = require("./IntlVariations");

var IntlCLDRNumberType14 = {
  getVariation: function getVariation(n) {
    if (n % 10 === 0 || n % 100 >= 11 && n % 100 <= 19) {
      return IntlVariations.NUMBER_ZERO;
    } else if (n % 10 === 1 && n % 100 !== 11) {
      return IntlVariations.NUMBER_ONE;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType14;