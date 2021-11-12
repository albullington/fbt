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
  FbtVariationType,
  Mask
} = require('./IntlVariations');

/**
 * Represents a fbt() or <fbt /> source data from a callsite and all
 * the information necessary to produce the translated payload.  It is
 * used primarily by TranslationBuilder for this process.
 *
 * FbtSiteBase defines the necessary methods required by TranslationBuilder to build
 * translated payload. Implementation of these methods could vary between different
 * types of FbtSiteBase depending on the structure of source data they represent.
 */
class FbtSiteBase {
  constructor(hashToLeaf, table, metadata, project) {
    _defineProperty(this, "hashToLeaf", void 0);

    _defineProperty(this, "project", void 0);

    _defineProperty(this, "table", void 0);

    _defineProperty(this, "metadata", void 0);

    this.hashToLeaf = hashToLeaf;
    this.table = table;
    this.metadata = metadata;
    this.project = project;
  }

  getProject() {
    return this.project;
  }

  getHashToLeaf() {
    return this.hashToLeaf;
  }
  /**
   * For a string with variations, this looks something like:
   *
   * {
   *   "*": {
   *     ... { "*": <HASH> }
   *   }
   * }
   * For a string without variation, this is simply the HASH
   */


  getTableOrHash() {
    return this.table;
  }

  getMetadata() {
    return this.metadata;
  }

}
/**
 * Represents a metadata entry in a <fbt> source data. An entry could result
 * in string variations during the translation process depending on the
 * locale we are translating the string for.
 */


class FbtSiteMetaEntryBase {
  constructor(type, token) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "token", void 0);

    this.type = type;
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  hasVariationMask() {
    throw new Error('This method must be implemented in a child class');
  }

  getVariationMask() {
    throw new Error('This method must be implemented in a child class');
  }

}

function getVariationMaskFromType(type) {
  switch (type) {
    case FbtVariationType.GENDER:
      return Mask.GENDER;

    case FbtVariationType.NUMBER:
      return Mask.NUMBER;
  }

  return null;
}

module.exports = {
  FbtSiteBase,
  FbtSiteMetaEntryBase,
  getVariationMaskFromType
};