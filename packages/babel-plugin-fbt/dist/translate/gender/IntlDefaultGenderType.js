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

const {
  Gender
} = require('../IntlVariations');

const IntlDefaultGenderType = {
  getFallback() {
    return Gender.UNKNOWN;
  },

  getGenderVariations() {
    return [Gender.UNKNOWN, Gender.MALE, Gender.FEMALE];
  }

};
module.exports = IntlDefaultGenderType;