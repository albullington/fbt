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

var IntlCLDRNumberType22 = {
  getVariation: function getVariation(n) {
    if (n % 100 === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n % 100 === 2) {
      return IntlVariations.NUMBER_TWO;
    } else if (n % 100 >= 3 && n % 100 <= 4) {
      return IntlVariations.NUMBER_FEW;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType22;