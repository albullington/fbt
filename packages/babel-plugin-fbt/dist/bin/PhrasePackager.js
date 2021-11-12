/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */

/* eslint max-len: ["warn", 100] */
const fbtHashKey = require('../fbtHashKey');

const jenkinsHash = require('../fbtJenkinsHash');
/**
 * PhrasePackager differs from TextPackager in that it hashes the
 * entire payload for identification
 */


class PhrasePackager {
  pack(phrases) {
    return phrases.map(phrase => {
      return {
        hash_key: fbtHashKey(phrase.jsfbt.t),
        hash_code: jenkinsHash(phrase.jsfbt.t),
        ...phrase
      };
    });
  }

}

module.exports = PhrasePackager;