"use strict";

var _assign = require("object-assign");

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var _registrations = {};
var FbtHooksImpl = {
  getErrorListener: function getErrorListener(context) {
    var _registrations$errorL;

    return (_registrations$errorL = _registrations.errorListener) === null || _registrations$errorL === void 0 ? void 0 : _registrations$errorL.call(_registrations, context);
  },
  logImpression: function logImpression(hash) {
    var _registrations$logImp;

    (_registrations$logImp = _registrations.logImpression) === null || _registrations$logImp === void 0 ? void 0 : _registrations$logImp.call(_registrations, hash);
  },
  onTranslationOverride: function onTranslationOverride(hash) {
    var _registrations$onTran;

    (_registrations$onTran = _registrations.onTranslationOverride) === null || _registrations$onTran === void 0 ? void 0 : _registrations$onTran.call(_registrations, hash);
  },
  // TODO: T61015960 - get off `mixed` and onto something more locked down (Fbs)
  getFbsResult: function getFbsResult(input) {
    return _registrations.getFbsResult(input);
  },
  // TODO: T61015960 - get off `mixed` and onto something more locked down (Fbt)
  getFbtResult: function getFbtResult(input) {
    return _registrations.getFbtResult(input);
  },
  getTranslatedInput: function getTranslatedInput(input) {
    var _registrations$getTra, _registrations$getTra2;

    return (_registrations$getTra = (_registrations$getTra2 = _registrations.getTranslatedInput) === null || _registrations$getTra2 === void 0 ? void 0 : _registrations$getTra2.call(_registrations, input)) !== null && _registrations$getTra !== void 0 ? _registrations$getTra : input;
  },
  getViewerContext: function getViewerContext() {
    return _registrations.getViewerContext();
  },
  register: function register(registrations) {
    _assign(_registrations, registrations);
  }
};
module.exports = FbtHooksImpl;