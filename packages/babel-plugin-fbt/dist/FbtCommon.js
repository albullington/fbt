/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
'use strict'; // flowlint ambiguous-object-type:error

const path = require('path');

const textToDesc = {};
const FbtCommon = {
  init(opts = {}) {
    if (opts.fbtCommon) {
      Object.assign(textToDesc, opts.fbtCommon);
    }

    if (opts.fbtCommonPath != null) {
      let fbtCommonData;

      try {
        // $FlowFixMe - dynamic require
        fbtCommonData = require(path.resolve(opts.fbtCommonPath));
      } catch (error) {
        error.message += `\nopts.fbtCommonPath: ${opts.fbtCommonPath}`;
        error.message += `\nCurrent path: ${process.cwd()}`;
        throw error;
      }

      Object.assign(textToDesc, fbtCommonData);
    }
  },

  getDesc(text) {
    return textToDesc[text];
  },

  getUnknownCommonStringErrorMessage(moduleName, text) {
    return `Unknown string "${text}" for <${moduleName} common={true}>`;
  }

};
module.exports = FbtCommon;