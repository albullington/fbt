/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  objMap
} = require('../FbtUtil');

const {
  coerceToTableJSFBTTreeLeaf,
  onEachLeaf
} = require('../JSFbtUtil');

const {
  FbtSiteBase,
  FbtSiteMetaEntryBase,
  getVariationMaskFromType
} = require('./FbtSiteBase');

const {
  FbtVariationType
} = require('./IntlVariations');

const invariant = require('invariant');

const nullthrows = require('nullthrows');

/**
 * Represents an <fbt>'s data source in the format of `SourceDataJSON`.
 *
 * E.g
 * {
 *  hashToLeaf: {
 *    hash: {text: '', desc: ''},
 *    ...
 *  },
 *  jsfbt: {
 *    t: {
 *      '*': {
 *        text: '',
 *        desc: '',
 *        tokenAliases: {...}
 *      },
 *      ....
 *    },
 *    m: [levelMetadata,...],
 *  }
 * }
 */
class FbtSite extends FbtSiteBase {
  constructor(hashToTextAndDesc, tableData, project, hashToTokenAliases) {
    super(hashToTextAndDesc, tableData.t, FbtSiteMetadata.wrap(tableData.m), project);

    _defineProperty(this, "_hashToTokenAliases", void 0);

    this._hashToTokenAliases = hashToTokenAliases;
  }

  getHashToTokenAliases() {
    return this._hashToTokenAliases;
  }

  static fromScan(json) {
    const textAndDescToHash = {};
    const {
      hashToLeaf,
      jsfbt
    } = json;
    !(hashToLeaf != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected hashToLeaf to be defined') : invariant(false) : void 0;
    !(jsfbt != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expect a non-void jsfbt table') : invariant(false) : void 0;

    for (const hash in hashToLeaf) {
      const textAndDesc = this._serializeTextAndDesc(hashToLeaf[hash].text, hashToLeaf[hash].desc);

      !(textAndDescToHash[textAndDesc] == null) ? process.env.NODE_ENV !== "production" ? invariant(false, "Duplicate text+desc pairs pointing to different hashes shouldn't be possible") : invariant(false) : void 0;
      textAndDescToHash[textAndDesc] = hash;
    }

    const tableData = {
      t: FbtSite._hashifyLeaves(jsfbt.t, textAndDescToHash),
      m: jsfbt.m
    };
    const hashToTokenAliases = {};
    onEachLeaf({
      jsfbt
    }, leaf => {
      const hash = textAndDescToHash[this._serializeTextAndDesc(leaf.text, leaf.desc)];

      if (leaf.tokenAliases != null) {
        hashToTokenAliases[hash] = leaf.tokenAliases;
      }
    });
    return new FbtSite(hashToLeaf, tableData, json.project, hashToTokenAliases);
  }
  /**
   * Replaces leaves in our table with corresponding hashes
   * @param entry Represents a recursive descent into the table
   * @param textAndDescToHash Reverse mapping of hashToLeaf for leaf lookups
   */


  static _hashifyLeaves(entry, textAndDescToHash) {
    const leaf = coerceToTableJSFBTTreeLeaf(entry);
    return leaf != null ? textAndDescToHash[this._serializeTextAndDesc(leaf.text, leaf.desc)] : objMap( // $FlowExpectedError[incompatible-cast] `entry` must be TableJSFBTTreeBranch type
    entry, branch => FbtSite._hashifyLeaves(branch, textAndDescToHash));
  }
  /**
   * Strings with different hashes might have the same text, so we need to use
   * description to uniquely identify a string.
   * For example, in
   *  <fbt>
   *   <fbt:pronoun gender={$ex->getGender()} type="subject" human={true} />
   *   has shared <a href={link}>a photo</a>.
   *  </fbt>
   * `<a href={link}>a photo</a>` generates multiple strings with the same text:
   * {text: 'a photo', desc: 'In the phrase: She has shared {a photo}.'}
   * {text: 'a photo', desc: 'In the phrase: He has shared {a photo}.'}
   * ....
   */


  static _serializeTextAndDesc(text, desc) {
    return JSON.stringify({
      text,
      desc
    });
  }

  serialize() {
    return {
      h2a: this.getHashToTokenAliases(),
      h2t: this.getHashToLeaf(),
      p: this.getProject(),
      _d: {
        t: this.table,
        m: FbtSiteMetadata.unwrap(this.metadata)
      }
    };
  }

  static deserialize(json) {
    return new FbtSite(json.h2t, json._d, json.p, json.h2a);
  }

} // TODO: T92487383 Sync FbtSiteMetaEntry to the FbtSiteBase class.


class FbtSiteMetaEntry extends FbtSiteMetaEntryBase {
  constructor(type, token, range) {
    super(type, token);

    _defineProperty(this, "_range", void 0);

    this._range = range;
  }

  hasVariationMask() {
    return getVariationMaskFromType(this.type) != null;
  }

  getVariationMask() {
    !this.hasVariationMask() ? process.env.NODE_ENV !== "production" ? invariant(false, 'check hasVariationMask to avoid this invariant') : invariant(false) : void 0;
    return nullthrows(getVariationMaskFromType(this.type));
  }

  static wrap(entry) {
    FbtSiteMetaEntry._validate(entry);

    return new this(entry.type || null, entry.token != null ? entry.token : null, entry.range || null);
  }

  unwrap() {
    const {
      token,
      type
    } = this;

    if (type === FbtVariationType.NUMBER) {
      return {
        type: FbtVariationType.NUMBER,
        token: token != null ? token : undefined
      };
    }

    if (type === FbtVariationType.GENDER) {
      !(token != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'token should be specified for gender variation') : invariant(false) : void 0;
      return {
        type: FbtVariationType.GENDER,
        token
      };
    }

    if (type === FbtVariationType.PRONOUN) {
      return {
        type: FbtVariationType.PRONOUN
      };
    }

    !(this._range != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'range should be specified for enum variation') : invariant(false) : void 0;
    return {
      range: this._range
    };
  }

  static _validate(entry) {
    const type = entry.type || null;
    const token = entry.token != null ? entry.token : null;
    const range = entry.range || null;

    if (type === null) {
      !(range !== null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'if no type is provided, this must be enum variation and thus range must be specified ') : invariant(false) : void 0;
    } else {
      if (type === FbtVariationType.GENDER) {
        !(token !== null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'token should be specified for gender variation') : invariant(false) : void 0;
      } else if (type === FbtVariationType.PRONOUN) {
        !(token === null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'token should not be specified for pronoun variation') : invariant(false) : void 0;
      }
    }
  }

}

const FbtSiteMetadata = {
  wrap(rawEntries) {
    return rawEntries.map(entry => entry && FbtSiteMetaEntry.wrap(entry));
  },

  unwrap(metaEntries) {
    return metaEntries.map(entry => entry == null ? null : entry.unwrap());
  }

};
module.exports = {
  FbtSite,
  FbtSiteMetaEntry
};