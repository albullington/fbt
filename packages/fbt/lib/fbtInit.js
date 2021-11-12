"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtHooks = require("./FbtHooks");

var FbtResult = require("./FbtResult");

var FbtTranslations = require("./FbtTranslations");

var IntlViewerContext = require("./IntlViewerContext"); // default VC


var getFbsResult = require("./getFbsResult");

// Using "auto-bind" to avoid Flow "method-unbinding" issue
var getFbtResult = FbtResult.get.bind(FbtResult);

function fbtInit(input) {
  var _input$hooks;

  FbtTranslations.registerTranslations(input.translations); // Hookup default implementations

  var hooks = (_input$hooks = input.hooks) !== null && _input$hooks !== void 0 ? _input$hooks : {};

  if (hooks.getFbtResult == null) {
    hooks.getFbtResult = getFbtResult;
  }

  if (hooks.getFbsResult == null) {
    hooks.getFbsResult = getFbsResult;
  }

  if (hooks.getTranslatedInput == null) {
    hooks.getTranslatedInput = FbtTranslations.getTranslatedInput;
  }

  if (hooks.getViewerContext == null) {
    hooks.getViewerContext = function () {
      return IntlViewerContext;
    };
  }

  FbtHooks.register(hooks);
}

module.exports = fbtInit;