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

const FbtCommonFunctionCallProcessor = require('./babel-processors/FbtCommonFunctionCallProcessor');

const FbtFunctionCallProcessor = require('./babel-processors/FbtFunctionCallProcessor');

const JSXFbtProcessor = require('./babel-processors/JSXFbtProcessor');

const FbtNodeUtil = require('./fbt-nodes/FbtNodeUtil');

const FbtCommon = require('./FbtCommon');

const {
  JSModuleName: {
    FBT
  },
  ValidFbtOptions
} = require('./FbtConstants');

const FbtEnumRegistrar = require('./FbtEnumRegistrar');

const fbtHashKey = require('./fbtHashKey');

const FbtShiftEnums = require('./FbtShiftEnums');

const FbtUtil = require('./FbtUtil');

const JSFbtUtil = require('./JSFbtUtil');

const {
  RequireCheck: {
    isRequireAlias
  }
} = require('fb-babel-plugin-utils');

const {
  parse: parseDocblock
} = require('jest-docblock');
/**
 * Map of extra fbt options (or JSX attributes) to accept on fbt callsites.
 *
 * We will only accept them at the parsing phase and output them when rendering fbt._() callsites,
 * without doing any further processing on them.
 */


const {
  checkOption,
  objMap
} = FbtUtil;
/**
 * Default options passed from a docblock.
 */

let defaultOptions;
/**
 * An array containing all collected phrases.
 */

let allMetaPhrases;
/**
 * An array containing the child to parent relationships for implicit nodes.
 */

let childToParent;

function FbtTransform(babel) {
  const t = babel.types;
  return {
    pre() {
      // $FlowFixMe[object-this-reference] Babel transforms run with the plugin context by default
      const visitor = this;
      const pluginOptions = visitor.opts;
      pluginOptions.fbtBase64 = pluginOptions.fbtBase64;
      FbtCommon.init(pluginOptions);
      FbtEnumRegistrar.setEnumManifest(getEnumManifest(pluginOptions));
      initExtraOptions(visitor);
      initDefaultOptions(visitor);
      allMetaPhrases = [];
      childToParent = {};
    },

    name: FBT,
    visitor: {
      /**
       * Transform jsx-style <fbt> to fbt() calls.
       */
      JSXElement(path) {
        const root = JSXFbtProcessor.create({
          babelTypes: t,
          path
        });

        if (!root) {
          return;
        }

        root.convertToFbtFunctionCallNode(allMetaPhrases.length);
      },

      /**
       * Register enum imports
       */
      ImportDeclaration(path) {
        FbtEnumRegistrar.registerImportIfApplicable(path);
      },

      /**
       * Transform fbt("text", "desc", {project: "project"}) to semantically:
       *
       * fbt._(
       *   fbtSentinel +
       *   JSON.stringify({
       *     type: "text",
       *     texts: ["text"],
       *     desc: "desc",
       *     project: "project",
       *   }) +
       *   fbtSentinel
       * );
       */
      CallExpression(path) {
        // $FlowFixMe[object-this-reference] Babel transforms run with the plugin context by default
        const visitor = this;
        const fileSource = visitor.file.code;
        const pluginOptions = visitor.opts;
        let root = FbtCommonFunctionCallProcessor.create({
          babelTypes: t,
          path
        });

        if (root) {
          path.replaceWith(root.convertToNormalCall());
          return;
        }

        if (isRequireAlias(path.parentPath)) {
          FbtEnumRegistrar.registerRequireIfApplicable(path);
          return;
        }

        root = FbtFunctionCallProcessor.create({
          babelTypes: t,
          defaultFbtOptions: defaultOptions,
          fileSource,
          path,
          pluginOptions
        });

        if (!root) {
          return;
        }

        const {
          callNode,
          metaPhrases
        } = root.convertToFbtRuntimeCall();
        path.replaceWith(callNode);

        if (pluginOptions.collectFbt) {
          const initialPhraseCount = allMetaPhrases.length;
          metaPhrases.forEach((metaPhrase, index) => {
            if (metaPhrase.phrase.doNotExtract) {
              return;
            }

            addMetaPhrase(metaPhrase, pluginOptions);

            if (metaPhrase.parentIndex != null) {
              addEnclosingString(index + initialPhraseCount, metaPhrase.parentIndex + initialPhraseCount);
            }
          });
        }
      } // CallExpression


    } // visitor

  }; // babel plugin return
}

FbtTransform.getExtractedStrings = () => allMetaPhrases.map(metaPhrase => metaPhrase.phrase);

FbtTransform.getChildToParentRelationships = () => childToParent || {};

FbtTransform.getFbtElementNodes = () => {
  const FbtElementNode = require('./fbt-nodes/FbtElementNode');

  const phraseToIndexMap = new Map(allMetaPhrases.map((metaPhrase, index) => [metaPhrase.fbtNode, index]));
  return allMetaPhrases.map(({
    fbtNode
  }) => fbtNode instanceof FbtElementNode ? FbtNodeUtil.toPlainFbtNodeTree(fbtNode, phraseToIndexMap) : null).filter(Boolean);
};

function initExtraOptions(state) {
  Object.assign(ValidFbtOptions, state.opts.extraOptions || {});
}

function initDefaultOptions(state) {
  defaultOptions = {};
  const comment = state.file.ast.comments[0];
  const docblock = comment && comment.value || '';
  const fbtDocblockOptions = parseDocblock(docblock).fbt;

  if (fbtDocblockOptions) {
    defaultOptions = JSON.parse(fbtDocblockOptions);
    Object.keys(defaultOptions).forEach(o => checkOption(o, ValidFbtOptions));
  }

  if (!defaultOptions.project) {
    defaultOptions.project = '';
  }
}

function addMetaPhrase(metaPhrase, pluginOptions) {
  const {
    fbtNode
  } = metaPhrase;
  allMetaPhrases.push({ ...metaPhrase,
    phrase: {
      filepath: pluginOptions.filename,
      // $FlowFixMe `start` property might be null
      line_beg: fbtNode.node.loc.start.line,
      // $FlowFixMe `start` property might be null
      col_beg: fbtNode.node.loc.start.column,
      // $FlowFixMe `end` property might be null
      line_end: fbtNode.node.loc.end.line,
      // $FlowFixMe `end` property might be null
      col_end: fbtNode.node.loc.end.column,
      ...metaPhrase.phrase
    }
  });
}

function addEnclosingString(childIdx, parentIdx) {
  childToParent[childIdx] = parentIdx;
}

function getEnumManifest(opts) {
  const {
    fbtEnumManifest,
    fbtEnumPath,
    fbtEnumToPath
  } = opts;

  if (fbtEnumManifest != null) {
    return fbtEnumManifest;
  } else if (fbtEnumPath != null) {
    // $FlowExpectedError node.js require() needs to be dynamic
    return require(fbtEnumPath);
  } else if (fbtEnumToPath != null) {
    const loadEnum = opts.fbtEnumLoader ? // $FlowExpectedError node.js require() needs to be dynamic
    require(opts.fbtEnumLoader) : require;
    return objMap(fbtEnumToPath, loadEnum);
  }

  return null;
}

FbtTransform.fbtHashKey = fbtHashKey;
FbtTransform.FbtShiftEnums = FbtShiftEnums;
FbtTransform.JSFbtUtil = JSFbtUtil;
FbtTransform.FbtUtil = FbtUtil;
FbtTransform.FbtNodeUtil = FbtNodeUtil;
module.exports = FbtTransform;