"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated
 * @emails oncall+i18n_fbt_js
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error
module.exports = Object.freeze({
  equivalencies: {
    '.': ["\u0964", "\u104B", "\u3002"],
    "\u2026": ["\u0E2F", "\u0EAF", "\u1801"],
    '!': ["\uFF01"],
    '?': ["\uFF1F"]
  },
  redundancies: {
    '?': ['?', '.', '!', "\u2026"],
    '!': ['!', '?', '.'],
    '.': ['.', '!'],
    "\u2026": ["\u2026", '.', '!']
  }
});