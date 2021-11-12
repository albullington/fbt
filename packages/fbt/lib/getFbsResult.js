"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtPureStringResult = require("./FbtPureStringResult");
/**
 * This factory function lives in standalone and not hanging off of
 * FbtPureStringResult because our libdef definitions are a little
 * convoluted right now.
 */


function getFbsResult(input) {
  return new FbtPureStringResult(input.contents, input.errorListener);
}

module.exports = getFbsResult;