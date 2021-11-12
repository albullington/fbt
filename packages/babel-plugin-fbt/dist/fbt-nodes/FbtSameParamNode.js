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
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  errorAt
} = require('../FbtUtil');

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  createInstanceFromFbtConstructCallsite,
  tokenNameToTextPattern
} = require('./FbtNodeUtil');

const {
  isStringLiteral
} = require('@babel/types');

const invariant = require('invariant');
/**
 * Represents an <fbt:sameParam> or fbt.sameParam() construct.
 * @see docs/params.md
 */


class FbtSameParamNode extends FbtNode {
  /**
   * Create a new class instance given a BabelNode root node.
   * If that node is incompatible, we'll just return `null`.
   */
  static fromBabelNode({
    moduleName,
    node
  }) {
    return createInstanceFromFbtConstructCallsite(moduleName, node, this);
  }

  getOptions() {
    return null;
  }

  _getTokenName() {
    const [name] = this.getCallNodeArguments() || [];
    !isStringLiteral(name) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected first argument of %s.sameParam to be a string literal, but got `%s`', this.moduleName, name && name.type || 'unknown') : invariant(false) : void 0;
    return name.value;
  }

  getText(_argsList) {
    try {
      // TODO(T79804447): verify that the token name was already defined at the sentence level
      return tokenNameToTextPattern(this._getTokenName());
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getArgsForStringVariationCalc() {
    return [];
  }

  getFbtRuntimeArg() {
    return null;
  }

}

_defineProperty(FbtSameParamNode, "type", FbtNodeType.SameParam);

module.exports = FbtSameParamNode;