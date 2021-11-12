"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error
var IntlVariations = require("./IntlVariations"); // Keep this in sync with IntlViewerContext.js.flow
// It's almost the same except that the `locale` field is optional on www
// and required in the OSS version


var IntlViewerContext = {
  GENDER: IntlVariations.GENDER_UNKNOWN,
  locale: 'en_US'
};
module.exports = IntlViewerContext;