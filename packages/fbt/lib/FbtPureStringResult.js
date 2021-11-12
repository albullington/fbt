"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright 2015-present Facebook. All Rights Reserved.
 * 
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 * 
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --local ~/www
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */

/* eslint-disable fb-www/no-commonjs */
var FbtResult = require("./FbtResult");

var FbtPureStringResultImpl = /*#__PURE__*/function (_FbtResult) {
  _inheritsLoose(FbtPureStringResultImpl, _FbtResult);

  function FbtPureStringResultImpl() {
    return _FbtResult.apply(this, arguments) || this;
  }

  return FbtPureStringResultImpl;
}(FbtResult); // $FlowExpectedError Force exported type to match FbtPureStringResult from the fbt.js libdef


module.exports = FbtPureStringResultImpl;