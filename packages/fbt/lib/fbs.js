"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * Wrapper module for fbt.js (the implementation)
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtHooks = require("./FbtHooks");

var FbtPureStringResult = require("./FbtPureStringResult");

var fbt = require("./fbt");

var invariant = require("invariant");

var FbsImpl = _objectSpread({}, fbt, {
  /**
   * @see fbt._param()
   */
  _param: function _param(label, value, variations) {
    !(typeof value === 'string' || value instanceof FbtPureStringResult) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected fbs parameter value to be the result of fbs(), <fbs/>, or a string; ' + 'instead we got `%s` (type: %s)', value, typeof value) : invariant(false) : void 0; // $FlowFixMe[incompatible-call] TODO(T36305131) Add accurate flow types to fbt.js

    return fbt._param(label, value, variations);
  },

  /**
   * @see fbt._plural()
   */
  _plural: function _plural(count, label, value) {
    !(value == null || typeof value === 'string' || value instanceof FbtPureStringResult) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected fbs plural UI value to be nullish or the result of fbs(), <fbs/>, or a string; ' + 'instead we got `%s` (type: %s)', value, typeof value) : invariant(false) : void 0; // $FlowFixMe[incompatible-call] TODO(T36305131) Add accurate flow types to fbt.js

    return fbt._plural(count, label, value);
  },
  _wrapContent: function _wrapContent(fbtContent, translation, hash) {
    var contents = typeof fbtContent === 'string' ? [fbtContent] : fbtContent;
    var errorListener = FbtHooks.getErrorListener({
      hash: hash,
      translation: translation
    }); // $FlowFixMe[incompatible-return] T61015960 FbtHooks.getFbsResult returns mixed for now

    return FbtHooks.getFbsResult({
      contents: contents,
      errorListener: errorListener,
      patternHash: hash,
      patternString: translation
    });
  }
}); // Use $-FlowFixMe instead of $-FlowExpectedError since fbsource doesn't use the latter


module.exports = FbsImpl;