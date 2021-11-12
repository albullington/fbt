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

const FbtCommon = require('../FbtCommon');

const {
  CommonOption
} = require('../FbtConstants');

const FbtNodeChecker = require('../FbtNodeChecker');

const {
  errorAt,
  expandStringConcat,
  normalizeSpaces
} = require('../FbtUtil');
/**
 * This class provides utility methods to process the babel node of the fbt common function call.
 * I.e. `fbt.c(...)`
 */


class FbtCommonFunctionCallProcessor {
  constructor({
    babelTypes,
    moduleName,
    path
  }) {
    _defineProperty(this, "moduleName", void 0);

    _defineProperty(this, "node", void 0);

    _defineProperty(this, "path", void 0);

    _defineProperty(this, "t", void 0);

    this.moduleName = moduleName;
    this.node = path.node;
    this.path = path;
    this.t = babelTypes;
  }

  static create({
    babelTypes,
    path
  }) {
    const nodeChecker = FbtNodeChecker.forFbtCommonFunctionCall(path.node);
    return nodeChecker != null ? new FbtCommonFunctionCallProcessor({
      babelTypes,
      moduleName: nodeChecker.moduleName,
      path
    }) : null;
  }
  /**
   * Converts an Fbt common call of the form `fbt.c(text)` to the basic form `fbt(text, desc)`
   */


  convertToNormalCall() {
    const {
      moduleName,
      node,
      t
    } = this;

    if (node.arguments.length !== 1) {
      throw errorAt(node, `Expected ${moduleName}.c to have exactly 1 argument. ${node.arguments.length} was given.`);
    }

    const text = normalizeSpaces(expandStringConcat(moduleName, node.arguments[0]).value).trim();
    const desc = FbtCommon.getDesc(text);

    if (!desc) {
      throw errorAt(node, FbtCommon.getUnknownCommonStringErrorMessage(moduleName, text));
    }

    const callNode = t.callExpression(t.identifier(moduleName), [t.stringLiteral(text), t.stringLiteral(desc), t.objectExpression([t.objectProperty(t.identifier(CommonOption), t.booleanLiteral(true))])]);
    callNode.loc = node.loc;
    return callNode;
  }

}

module.exports = FbtCommonFunctionCallProcessor;