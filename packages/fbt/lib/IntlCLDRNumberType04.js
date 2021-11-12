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

var IntlCLDRNumberType04 = {
  getVariation: function getVariation(n) {
    if (n >= 0 && n <= 1) {
      return IntlVariations.NUMBER_ONE;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType04;