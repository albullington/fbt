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

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  isJSXText,
  isStringLiteral
} = require('@babel/types');
/**
 * Represents the text literals present within <fbt> or fbt() callsites.
 *
 * I.e.
 *
 *  fbt(
 *    'Hello', // <-- FbtTextNode
 *    'description',
 *  )
 */


class FbtTextNode extends FbtNode {
  /**
   * Create a new class instance given a BabelNode root node.
   * If that node is incompatible, we'll just return `null`.
   */
  static fromBabelNode({
    moduleName,
    node
  }) {
    return isJSXText(node) || isStringLiteral(node) ? new FbtTextNode({
      moduleName,
      node
    }) : null;
  }

  getOptions() {
    return null;
  }

  getArgsForStringVariationCalc() {
    return [];
  }

  getText(_argsList) {
    return this.node.value;
  }

  getFbtRuntimeArg() {
    return null;
  }

}

_defineProperty(FbtTextNode, "type", FbtNodeType.Text);

module.exports = FbtTextNode;