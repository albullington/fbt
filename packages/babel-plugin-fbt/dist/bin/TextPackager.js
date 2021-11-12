function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */

/*eslint max-len: ["error", 100]*/
const {
  onEachLeaf
} = require('../JSFbtUtil');

/**
 * TextPackager massages the data to handle multiple texts in fbt payloads (like
 * enum branches) and hashes each individual text.  It stores this mapping in a
 * stripped down phrase
 */
class TextPackager {
  constructor(hash) {
    _defineProperty(this, "_hash", void 0);

    this._hash = hash;
  }

  pack(phrases) {
    return phrases.map(phrase => {
      const hashToLeaf = {};
      onEachLeaf(phrase, ({
        desc,
        text
      }) => {
        hashToLeaf[this._hash(text, desc)] = {
          text,
          desc
        };
      });
      return {
        hashToLeaf,
        ...phrase
      };
    });
  }

}

module.exports = TextPackager;