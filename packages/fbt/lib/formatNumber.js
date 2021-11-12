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
'use strict';

var fbs = require("./fbs");

var intlNumUtils = require("./intlNumUtils");

function formatNumber(value, decimals) {
  return intlNumUtils.formatNumber(value, decimals);
}

function getAtLeastString(maxNumber, decimals) {
  // after we start using CLDR data, it will not be fbt anymore.
  return fbs._({
    "*": "{number}+"
  }, [fbs._param("number", intlNumUtils.formatNumberWithThousandDelimiters(maxNumber, decimals), [0, maxNumber])], {
    hk: "37k2iz"
  });
}

function getLessThanString(minNumber, decimals) {
  // after we start using CLDR data, it will not be fbt anymore.
  return fbs._({
    "*": "<{number}"
  }, [fbs._param("number", intlNumUtils.formatNumberWithThousandDelimiters(minNumber, decimals), [0, minNumber])], {
    hk: "1Q384d"
  });
}

function formatNumberWithMaxLimit(value, maxvalue, decimals) {
  return value > maxvalue ? getAtLeastString(maxvalue, decimals) : intlNumUtils.formatNumberWithThousandDelimiters(value, decimals);
}

function formatNumberWithMinLimit(value, minvalue, decimals) {
  return value < minvalue ? getLessThanString(minvalue, decimals) : intlNumUtils.formatNumberWithThousandDelimiters(value, decimals);
}

formatNumber.withThousandDelimiters = intlNumUtils.formatNumberWithThousandDelimiters;
formatNumber.withMaxLimit = formatNumberWithMaxLimit;
formatNumber.withMinLimit = formatNumberWithMinLimit;
module.exports = formatNumber;