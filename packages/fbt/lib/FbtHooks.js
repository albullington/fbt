"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
var FbtEnv = require("./FbtEnv");

var FbtHooksImpl = require("./FbtHooksImpl"); // TODO T61557741: Move these types to fbt.js when it's flow strict


module.exports = FbtHooksImpl;
FbtEnv.setupOnce();