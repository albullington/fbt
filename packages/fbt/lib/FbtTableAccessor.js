/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * Provides return values for fbt constructs calls. Here lives the platform
 * specific implementation.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

var FbtTableAccessor = {
  getEnumResult: function getEnumResult(value) {
    return [[value], null];
  },
  getGenderResult: function getGenderResult(variation, substitution, _gender) {
    // value is ignored here which will be used in alternative implementation
    // for different platform
    return [variation, substitution];
  },
  getNumberResult: function getNumberResult(variation, substitution, _numberValue) {
    // value is ignored here which will be used in alternative implementation
    // for different platformf
    return [variation, substitution];
  },
  // For an fbt.param where no gender or plural/number variation exists
  getSubstitution: function getSubstitution(substitution) {
    return [null, substitution];
  },
  getPronounResult: function getPronounResult(genderKey) {
    return [[genderKey, '*'], null];
  }
};
module.exports = FbtTableAccessor;