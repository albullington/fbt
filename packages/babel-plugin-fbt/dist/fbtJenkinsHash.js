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

const jenkinsHash = require('./jenkinsHash');

const {
  mapLeaves
} = require('./JSFbtUtil');

function fbtJenkinsHash(jsfbt) {
  // Strip leaves of metadata keys and only keep `text` and `desc` key.
  // This will give us the flexibility of modifying metadata without updating hashes.
  const hashInputTree = mapLeaves(jsfbt, leaf => {
    return {
      desc: leaf.desc,
      text: leaf.text
    };
  });
  return jenkinsHash(JSON.stringify(hashInputTree));
}

module.exports = fbtJenkinsHash;