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

const FbtNodeChecker = require('../FbtNodeChecker');

const {
  errorAt,
  normalizeSpaces,
  varDump
} = require('../FbtUtil');

const invariant = require('invariant');

function createInstanceFromFbtConstructCallsite(moduleName, node, Constructor) {
  const checker = FbtNodeChecker.forModule(moduleName);
  const constructName = checker.getFbtConstructNameFromFunctionCall(node);
  return constructName === Constructor.type ? new Constructor({
    moduleName,
    node
  }) : null;
}
/**
 * Returns the closest ancestor node of type: FbtElementNode | FbtImplicitParamNode
 */


function getClosestElementOrImplicitParamNodeAncestor(startNode) {
  const ret = startNode.getFirstAncestorOfType(require('./FbtImplicitParamNode')) || startNode.getFirstAncestorOfType(require('./FbtElementNode'));
  !(ret != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unable to find closest ancestor of type FbtElementNode or FbtImplicitParamNode for node: %s', varDump(startNode)) : invariant(false) : void 0;
  return ret;
}

function runOnNestedChildren(node, callback) {
  for (const child of node.children) {
    callback(child);

    if (child.children.length) {
      runOnNestedChildren(child, callback);
    }
  }
}

function toPlainFbtNodeTree(fbtNode, phraseToIndexMap) {
  var _ret$children;

  const ret = {
    phraseIndex: phraseToIndexMap.get(fbtNode),
    children: fbtNode.children.map(child => child != null ? toPlainFbtNodeTree(child, phraseToIndexMap) : null).filter(Boolean),
    ...fbtNode.toPlainFbtNode()
  };

  if (ret.phraseIndex == null) {
    delete ret.phraseIndex;
  }

  if (((_ret$children = ret.children) === null || _ret$children === void 0 ? void 0 : _ret$children.length) === 0) {
    delete ret.children;
  }

  return ret;
}
/**
 * Convert input text to a token name.
 *
 * It's using a naive way to replace curly brackets present inside the text to square brackets.
 *
 * It's good enough for now because we currently:
 *   - don't protect/encode curly brackets provided in the source text
 *   - don't prevent token names to contain curly brackets from userland
 *
 * @example `convertToTokenName('Hello {name}') === '=Hello [name]'`
 */


function convertToTokenName(text) {
  return `=${text.replace(/[{}]/g, m => m === '{' ? '[' : ']')}`;
}

function tokenNameToTextPattern(tokenName) {
  return `{${tokenName}}`;
}
/**
 * We define an FbtImplicitParamNode's outer token alias to be
 * string concatenation of '=m' + the FbtImplicitParamNode's index in its siblings array.
 *
 * @example For string <fbt> hello <a>world</a></fbt>,
 *          the outer token alias of <a>world</a> will be '=m1'.
 */


function convertIndexInSiblingsArrayToOuterTokenAlias(index) {
  return convertToTokenName(`m${index}`);
}
/**
 * Collect and normalize text output from a tree of fbt nodes.
 * @param subject Babel node of the subject's gender of the sentence
 * @param getChildNodeText Callback responsible for returning the text of an FbtChildNode
 */


function getTextFromFbtNodeTree(instance, argsMap, subject, preserveWhitespace, getChildNodeText) {
  try {
    if (subject) {
      argsMap.mustHave(instance);
    }

    const texts = instance.children.map(getChildNodeText.bind(null, argsMap));
    return normalizeSpaces(texts.join(''), {
      preserveWhitespace
    }).trim();
  } catch (error) {
    throw errorAt(instance.node, error);
  }
}

function getChildNodeText(argsMap, child) {
  const FbtImplicitParamNode = require('./FbtImplicitParamNode');

  return child instanceof FbtImplicitParamNode ? tokenNameToTextPattern(child.getTokenName(argsMap)) : child.getText(argsMap);
}

function getTokenAliasesFromFbtNodeTree(instance, argsMap) {
  const childrentokenAliases = instance.children.map((node, tokenIndex) => getChildNodeTokenAliases(argsMap, node, tokenIndex));
  const tokenAliases = Object.assign({}, ...childrentokenAliases);
  return Object.keys(tokenAliases).length ? tokenAliases : null;
}

function getChildNodeTokenAliases(argsMap, child, tokenIndex) {
  const FbtImplicitParamNode = require('./FbtImplicitParamNode');

  if (child instanceof FbtImplicitParamNode) {
    const childToken = child.getTokenName(argsMap);
    !(childToken != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'The token of FbtImplicitParamNode %s is expected to be non-null', varDump(child)) : invariant(false) : void 0;
    return {
      [childToken]: convertIndexInSiblingsArrayToOuterTokenAlias(tokenIndex)
    };
  }

  return {};
}

function getChildNodeTextForDescription(targetFbtNode, argsMap, child) {
  const FbtImplicitParamNode = require('./FbtImplicitParamNode');

  if (child instanceof FbtImplicitParamNode) {
    return child === targetFbtNode || !child.isAncestorOf(targetFbtNode) ? tokenNameToTextPattern(child.getTokenName(argsMap)) : child.getTextForDescription(argsMap, targetFbtNode);
  } else {
    return child.getText(argsMap);
  }
}

module.exports = {
  convertToTokenName,
  convertIndexInSiblingsArrayToOuterTokenAlias,
  createInstanceFromFbtConstructCallsite,
  getChildNodeText,
  getChildNodeTextForDescription,
  getClosestElementOrImplicitParamNodeAncestor,
  getTextFromFbtNodeTree,
  getTokenAliasesFromFbtNodeTree,
  runOnNestedChildren,
  tokenNameToTextPattern,
  toPlainFbtNodeTree
};