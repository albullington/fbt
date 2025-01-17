/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */

/* eslint no-bitwise: 0 */
'use strict';

const fbtJenkinsHash = require('./fbtJenkinsHash');

const BaseNSymbols = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Compute the baseN string for a given unsigned integer.

function uintToBaseN(numberArg, base) {
  let number = numberArg;

  if (base < 2 || base > 62 || number < 0) {
    return '';
  }

  let output = '';

  do {
    output = BaseNSymbols.charAt(number % base).concat(output);
    number = Math.floor(number / base);
  } while (number > 0);

  return output;
}

function fbtHashKey(jsfbt) {
  return uintToBaseN(fbtJenkinsHash(jsfbt), 62);
}

module.exports = fbtHashKey;