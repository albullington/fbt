"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtResult = require("./FbtResult");

var FbtTranslations = require("./FbtTranslations");

var GenderConst = require("./GenderConst");

var IntlVariations = require("./IntlVariations");

var fbt = require("./fbt");

var init = require("./fbtInit");
/**
 * fbt's public-facing module.  Intended use:
 * const {fbt, IntlVariations} = require('fbt');
 */


var FbtPublic = {
  __esModule: true,
  "default": fbt,
  fbt: fbt,
  FbtResult: FbtResult,
  FbtTranslations: FbtTranslations,
  GenderConst: GenderConst,
  init: init,
  IntlVariations: IntlVariations
};
module.exports = FbtPublic;