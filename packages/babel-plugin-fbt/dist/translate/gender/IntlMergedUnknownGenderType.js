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

const IntlMergedUnknownGenderType = {
  getFallback() {
    return Gender.MALE;
  },

  getGenderVariations() {
    return [Gender.MALE, Gender.FEMALE];
  }

};
module.exports = IntlMergedUnknownGenderType;