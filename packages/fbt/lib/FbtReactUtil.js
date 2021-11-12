"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
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
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol["for"] && Symbol["for"]('react.element') || 0xeac7;
var canDefineProperty = false;

if (process.env.NODE_ENV !== "production") {
  try {
    Object.defineProperty({}, 'x', {
      // same settings as what we'll use during actual runtime
      configurable: false,
      enumerable: false,
      writable: false,
      value: 'foo'
    });
    canDefineProperty = true;
  } catch (_unused) {// IE will fail on defineProperty
  }
}

var FbtReactUtil = {
  REACT_ELEMENT_TYPE: REACT_ELEMENT_TYPE,
  injectReactShim: function injectReactShim(fbtResult) {
    var reactObj = {
      validated: true
    };

    if (canDefineProperty) {
      Object.defineProperty(fbtResult, '_store', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: reactObj
      });
    } else {
      fbtResult._store = reactObj;
    }
  }
};
module.exports = FbtReactUtil;