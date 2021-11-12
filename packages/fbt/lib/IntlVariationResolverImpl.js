"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtHooks = require("./FbtHooks");

var IntlNumberType = require("./IntlNumberType");

var IntlVariations = require("./IntlVariations");

var invariant = require("invariant");

var EXACTLY_ONE = '_1';
var IntlVariationResolverImpl = {
  EXACTLY_ONE: EXACTLY_ONE,

  /**
   * Wrapper around FbtNumberType.getVariation that special cases our EXACTLY_ONE
   * value to accommodate the singular form of fbt:plural
   */
  getNumberVariations: function getNumberVariations(number) {
    var numType = IntlNumberType.get(FbtHooks.getViewerContext().locale).getVariation(number);
    !( // eslint-disable-next-line no-bitwise
    numType & IntlVariations.BITMASK_NUMBER) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Invalid number provided: %s (%s)', numType, typeof numType) : invariant(false) : void 0;
    return number === 1 ? [EXACTLY_ONE, numType, '*'] : [numType, '*'];
  },

  /**
   * Wrapper to validate gender.
   */
  getGenderVariations: function getGenderVariations(gender) {
    !( // eslint-disable-next-line no-bitwise
    gender & IntlVariations.BITMASK_GENDER) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Invalid gender provided: %s (%s)', gender, typeof gender) : invariant(false) : void 0;
    return [gender, '*'];
  }
};
module.exports = IntlVariationResolverImpl;