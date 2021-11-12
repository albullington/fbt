/**
 * Copyright (c) Facebook, Inc. and its affiliates.
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
  StringVariationArgsMap
} = require('../fbt-nodes/FbtArguments');

const FbtElementNode = require('../fbt-nodes/FbtElementNode');

const FbtImplicitParamNode = require('../fbt-nodes/FbtImplicitParamNode');

const FbtParamNode = require('../fbt-nodes/FbtParamNode');

const {
  SENTINEL
} = require('../FbtConstants');

const FbtNodeChecker = require('../FbtNodeChecker');

const {
  convertToStringArrayNodeIfNeeded,
  createFbtRuntimeArgCallExpression,
  enforceBoolean,
  enforceString,
  errorAt,
  varDump
} = require('../FbtUtil');

const JSFbtBuilder = require('../JSFbtBuilder');

const addLeafToTree = require('../utils/addLeafToTree');

const {
  arrayExpression,
  assignmentExpression,
  callExpression,
  clone,
  cloneDeep,
  identifier,
  isBlockStatement,
  isProgram,
  jsxExpressionContainer,
  memberExpression,
  sequenceExpression,
  stringLiteral,
  variableDeclaration,
  variableDeclarator
} = require('@babel/types');

const {
  Buffer
} = require('buffer');

const invariant = require('invariant');

const nullthrows = require('nullthrows');

const emptyArgsCombinations = [[]];
const STRING_VARIATION_RUNTIME_ARGUMENT_IDENTIFIER_PREFIX = 'fbt_sv_arg';
/**
 * This class provides utility methods to process the babel node of the standard fbt function call
 * (i.e. `fbt(...)`)
 */

class FbtFunctionCallProcessor {
  constructor({
    babelTypes,
    defaultFbtOptions,
    fileSource,
    nodeChecker,
    path,
    pluginOptions
  }) {
    _defineProperty(this, "defaultFbtOptions", void 0);

    _defineProperty(this, "fileSource", void 0);

    _defineProperty(this, "moduleName", void 0);

    _defineProperty(this, "node", void 0);

    _defineProperty(this, "nodeChecker", void 0);

    _defineProperty(this, "path", void 0);

    _defineProperty(this, "pluginOptions", void 0);

    _defineProperty(this, "t", void 0);

    this.defaultFbtOptions = defaultFbtOptions;
    this.fileSource = fileSource;
    this.moduleName = nodeChecker.moduleName;
    this.node = path.node;
    this.nodeChecker = nodeChecker;
    this.path = path;
    this.pluginOptions = pluginOptions;
    this.t = babelTypes;
  }

  static create({
    babelTypes,
    defaultFbtOptions,
    fileSource,
    path,
    pluginOptions
  }) {
    const nodeChecker = FbtNodeChecker.forFbtFunctionCall(path.node);
    return nodeChecker != null ? new FbtFunctionCallProcessor({
      babelTypes,
      defaultFbtOptions,
      fileSource,
      nodeChecker,
      path,
      pluginOptions
    }) : null;
  }

  _assertJSModuleWasAlreadyRequired() {
    const {
      moduleName,
      path
    } = this;

    if (!this.nodeChecker.isJSModuleBound(path)) {
      throw errorAt(path.node, `${moduleName} is not bound. Did you forget to require('${moduleName}')?`);
    }

    return this;
  }

  _assertHasEnoughArguments() {
    const {
      moduleName,
      node
    } = this;

    if (node.arguments.length < 2) {
      throw errorAt(node, `Expected ${moduleName} calls to have at least two arguments. ` + `Only ${node.arguments.length} was given.`);
    }

    return this;
  }

  _createFbtRuntimeCallForMetaPhrase(metaPhrases, metaPhraseIndex, stringVariationRuntimeArgs) {
    const {
      phrase
    } = metaPhrases[metaPhraseIndex];
    const {
      pluginOptions
    } = this; // $FlowFixMe[speculation-ambiguous] we're deprecating the "type" property soon anyway

    const argsOutput = JSON.stringify({
      jsfbt: phrase.jsfbt,
      project: phrase.project
    });
    const encodedOutput = pluginOptions.fbtBase64 ? Buffer.from(argsOutput).toString('base64') : argsOutput;
    const fbtSentinel = pluginOptions.fbtSentinel || SENTINEL;
    const args = [stringLiteral(fbtSentinel + encodedOutput + fbtSentinel)];

    const fbtRuntimeArgs = this._createFbtRuntimeArgumentsForMetaPhrase(metaPhrases, metaPhraseIndex, stringVariationRuntimeArgs);

    if (fbtRuntimeArgs.length > 0) {
      args.push(arrayExpression(fbtRuntimeArgs));
    }

    return callExpression(memberExpression(identifier(this.moduleName), identifier('_')), args);
  }

  _createRootFbtRuntimeCall(metaPhrases) {
    const stringVariationRuntimeArgs = this._createRuntimeArgsFromStringVariantNodes(metaPhrases[0]);

    if (!this._hasStringVariationAndContainsInnerString(metaPhrases)) {
      return this._createFbtRuntimeCallForMetaPhrase(metaPhrases, 0, stringVariationRuntimeArgs);
    }

    this._throwIfStringVariationArgsMayCauseSideEffects(metaPhrases);

    const stringVariationRuntimeArgIdentifiers = this._generateUniqueIdentifiersForRuntimeArgs(stringVariationRuntimeArgs.length);

    const fbtRuntimeCall = this._createFbtRuntimeCallForMetaPhrase(metaPhrases, 0, stringVariationRuntimeArgIdentifiers);

    this._injectVariableDeclarationsForStringVariationArguments(stringVariationRuntimeArgIdentifiers);

    return this._wrapFbtRuntimeCallInSequenceExpression(stringVariationRuntimeArgs, fbtRuntimeCall, stringVariationRuntimeArgIdentifiers);
  }
  /**
   * String variation arguments are not allowed to contain anything that may
   * cause side-effects. Side-effects are mostly introduced by but not limited to
   * method calls and class instantiations. Please refer to the JSDoc of
   * FbtNode#throwIfAnyArgumentContainsFunctionCallOrClassInstantiation for
   * examples.
   */


  _throwIfStringVariationArgsMayCauseSideEffects(metaPhrases) {
    metaPhrases[0].compactStringVariations.array.map(svArg => svArg.fbtNode.throwIfAnyArgumentContainsFunctionCallOrClassInstantiation(this.path.context.scope));
  }

  _injectVariableDeclarationsForStringVariationArguments(identifiersForStringVariationRuntimeArgs) {
    // Find the first ancestor block statement node or the program root node
    let curPath = this.path;

    while (!isBlockStatement(curPath.node) && !isProgram(curPath.node)) {
      curPath = nullthrows(curPath.parentPath, 'curPath can not be null. Otherwise, it means we reached the root' + ' of Babel AST in the previous iteration and therefore we would have exited the loop.');
    }

    const blockOrProgramPath = curPath;
    const blockOrProgramNode = blockOrProgramPath.node;
    !(isBlockStatement(blockOrProgramNode) || isProgram(blockOrProgramNode)) ? process.env.NODE_ENV !== "production" ? invariant(false, "According to the above loop's condition, " + 'blockOrProgramNode must be either a block statement or a program node ') : invariant(false) : void 0; // Replace the blockStatement/program node with
    // a new blockStatement/program with injected declarations

    const declarations = variableDeclaration('var', identifiersForStringVariationRuntimeArgs.map(identifier => variableDeclarator(identifier)));
    const cloned = clone(blockOrProgramNode);
    cloned.body = [declarations, ...cloned.body];
    blockOrProgramPath.replaceWith(cloned);
  }
  /**
   * Pre-assign those arguments that create string variations to local variables,
   * and use references to these variables in fbt call. Note: Local variables
   * will be auto-declared in sequenceExpression.
   *
   * E.g.
   * Before:
   *   fbt._()
   *
   * After:
   *   (identifier_0 = runtimeArg1, identifier_1 = runtimeArg2, fbt._())
   */


  _wrapFbtRuntimeCallInSequenceExpression(runtimeArgs, fbtRuntimeCall, identifiersForStringVariationRuntimeArgs) {
    !(runtimeArgs.length == identifiersForStringVariationRuntimeArgs.length) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expect exactly one identifier for each string variation runtime argument. ' + 'Instead we get %s identifiers and %s arguments.', identifiersForStringVariationRuntimeArgs.length, runtimeArgs.length) : invariant(false) : void 0;
    const expressions = runtimeArgs.map((runtimeArg, i) => assignmentExpression('=', identifiersForStringVariationRuntimeArgs[i], runtimeArg)).concat(fbtRuntimeCall);
    return sequenceExpression(expressions);
  }

  _hasStringVariationAndContainsInnerString(metaPhrases) {
    const fbtElement = metaPhrases[0].fbtNode;
    !(fbtElement instanceof FbtElementNode) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected a FbtElementNode for top level string but received: %s', varDump(fbtElement)) : invariant(false) : void 0;
    const doesNotContainInnerString = fbtElement.children.every(child => {
      return !(child instanceof FbtImplicitParamNode);
    });

    if (doesNotContainInnerString) {
      return false;
    }

    return metaPhrases[0].compactStringVariations.array.length > 0;
  }

  _generateUniqueIdentifiersForRuntimeArgs(count) {
    const identifiers = [];

    for (let identifierSuffix = 0, numIdentifierCreated = 0; numIdentifierCreated < count; identifierSuffix++) {
      const name = `${STRING_VARIATION_RUNTIME_ARGUMENT_IDENTIFIER_PREFIX}_${identifierSuffix}`;

      if (this.path.context.scope.getBinding(name) == null) {
        identifiers.push(identifier(name));
        numIdentifierCreated++;
      }
    }

    return identifiers;
  }
  /**
   * Consolidate a list of string variation arguments under the following conditions:
   *
   * Enum variation arguments are consolidated to avoid creating duplicates of string variations
   * (from a candidate values POV)
   *
   * Other types of variation arguments are accepted as-is.
   */


  _compactStringVariationArgs(args) {
    const indexMap = [];
    const array = args.filter((arg, i) => {
      if (arg.isCollapsible) {
        return false;
      }

      indexMap.push(i);
      return true;
    });
    return {
      array,
      indexMap
    };
  }

  _getPhraseParentIndex(fbtNode, list) {
    if (fbtNode.parent == null) {
      return null;
    }

    const parentIndex = list.indexOf(fbtNode.parent);
    !(parentIndex > -1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unable to find parent fbt node: node=%s', varDump(fbtNode)) : invariant(false) : void 0;
    return parentIndex;
  }
  /**
   * Generates a list of meta-phrases from a given FbtElement node
   */


  _metaPhrases(fbtElement) {
    const stringVariationArgs = fbtElement.getArgsForStringVariationCalc();
    const jsfbtBuilder = new JSFbtBuilder(this.fileSource, stringVariationArgs, this.pluginOptions.reactNativeMode);
    const argsCombinations = jsfbtBuilder.getStringVariationCombinations();

    const compactStringVariations = this._compactStringVariationArgs(argsCombinations[0] || []);

    const jsfbtMetadata = jsfbtBuilder.buildMetadata(compactStringVariations.array);

    const sharedPhraseOptions = this._getSharedPhraseOptions(fbtElement);

    return [fbtElement, ...fbtElement.getImplicitParamNodes()].map((fbtNode, _index, list) => {
      try {
        const phrase = { ...sharedPhraseOptions,
          jsfbt: {
            // the order of JSFBT props matter for unit tests
            t: {},
            m: jsfbtMetadata
          }
        };
        (argsCombinations.length ? argsCombinations : emptyArgsCombinations).forEach(argsCombination => {
          // collect text/description pairs
          const svArgsMap = new StringVariationArgsMap(argsCombination);
          const argValues = compactStringVariations.indexMap.map(originIndex => {
            var _argsCombination$orig;

            return nullthrows((_argsCombination$orig = argsCombination[originIndex]) === null || _argsCombination$orig === void 0 ? void 0 : _argsCombination$orig.value);
          });
          const leaf = {
            desc: fbtNode.getDescription(svArgsMap),
            text: fbtNode.getText(svArgsMap)
          };
          const tokenAliases = fbtNode.getTokenAliases(svArgsMap);

          if (tokenAliases != null) {
            leaf.tokenAliases = tokenAliases;
          }

          if (this.pluginOptions.generateOuterTokenName && !(fbtNode instanceof FbtElementNode)) {
            leaf.outerTokenName = fbtNode.getTokenName(svArgsMap);
          }

          if (argValues.length) {
            addLeafToTree(phrase.jsfbt.t, argValues, leaf);
          } else {
            // jsfbt only contains one leaf
            phrase.jsfbt.t = leaf;
          }
        });
        return {
          compactStringVariations,
          fbtNode,
          parentIndex: this._getPhraseParentIndex(fbtNode, list),
          phrase
        };
      } catch (error) {
        throw errorAt(fbtNode.node, error);
      }
    });
  }
  /**
   * Process current `fbt()` callsite (BabelNode) to generate:
   * - an `fbt._()` callsite or a sequencExpression that eventually returns an `fbt._()` callsite
   * - a list of meta-phrases describing the collected text strings from this fbt() callsite
   */


  convertToFbtRuntimeCall() {
    const fbtElement = this._convertToFbtNode();

    const metaPhrases = this._metaPhrases(fbtElement);

    const callNode = this._createRootFbtRuntimeCall(metaPhrases);

    return {
      callNode,
      metaPhrases
    };
  }
  /**
   * Converts current fbt() BabelNode to an FbtNode equivalent
   */


  _convertToFbtNode() {
    this._assertJSModuleWasAlreadyRequired();

    this._assertHasEnoughArguments();

    const {
      moduleName,
      node
    } = this;
    const {
      arguments: fbtCallArgs
    } = node;
    const fbtContentsNode = convertToStringArrayNodeIfNeeded(moduleName, fbtCallArgs[0]);
    fbtCallArgs[0] = fbtContentsNode;
    const elementNode = FbtElementNode.fromBabelNode({
      moduleName,
      node
    });

    if (elementNode == null) {
      throw errorAt(node, `${moduleName}: unable to create FbtElementNode from given Babel node`);
    }

    return elementNode;
  }

  _createFbtRuntimeArgumentsForMetaPhrase(metaPhrases, metaPhraseIndex, stringVariationRuntimeArgs) {
    const metaPhrase = metaPhrases[metaPhraseIndex]; // Runtime arguments of a string fall into 3 categories:
    // 1. Each string variation argument must correspond to a runtime argument
    // 2. Non string variation arguments(i.e. those fbt.param() calls that do not
    // have gender or number option) should also be counted as runtime arguments.
    // 3. Each inner string of current string should be associated with a
    // runtime argument

    return [...stringVariationRuntimeArgs, ...this._createRuntimeArgsFromNonStringVariantNodes(metaPhrase.fbtNode), ...this._createRuntimeArgsFromImplicitParamNodes(metaPhrases, metaPhraseIndex, stringVariationRuntimeArgs)];
  }

  _createRuntimeArgsFromStringVariantNodes(metaPhrase) {
    const fbtRuntimeArgs = [];
    const {
      compactStringVariations
    } = metaPhrase;

    for (const stringVariation of compactStringVariations.array) {
      const fbtRuntimeArg = stringVariation.fbtNode.getFbtRuntimeArg();

      if (fbtRuntimeArg) {
        fbtRuntimeArgs.push(fbtRuntimeArg);
      }
    }

    return fbtRuntimeArgs;
  }

  _createRuntimeArgsFromNonStringVariantNodes(fbtNode) {
    const fbtRuntimeArgs = [];

    for (const child of fbtNode.children) {
      if (child instanceof FbtParamNode && child.options.gender == null && child.options.number == null) {
        fbtRuntimeArgs.push(child.getFbtRuntimeArg());
      }
    }

    return fbtRuntimeArgs;
  }

  _createRuntimeArgsFromImplicitParamNodes(metaPhrases, metaPhraseIndex, runtimeArgsFromStringVariationNodes) {
    const fbtRuntimeArgs = [];

    for (const [innerMetaPhraseIndex, innerMetaPhrase] of metaPhrases.entries()) {
      if (innerMetaPhrase.parentIndex != metaPhraseIndex) {
        continue;
      }

      const innerMetaPhraseFbtNode = innerMetaPhrase.fbtNode;
      !(innerMetaPhraseFbtNode instanceof FbtImplicitParamNode) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected the inner meta phrase to be associated with a FbtImplicitParamNode instead of %s', varDump(innerMetaPhraseFbtNode)) : invariant(false) : void 0;
      const babelNode = cloneDeep(innerMetaPhraseFbtNode.node);
      babelNode.children = [jsxExpressionContainer(this._createFbtRuntimeCallForMetaPhrase(metaPhrases, innerMetaPhraseIndex, runtimeArgsFromStringVariationNodes))];
      const fbtParamRuntimeArg = createFbtRuntimeArgCallExpression(innerMetaPhraseFbtNode, [stringLiteral(innerMetaPhraseFbtNode.getOuterTokenAlias()), babelNode]);
      fbtRuntimeArgs.push(fbtParamRuntimeArg);
    }

    return fbtRuntimeArgs;
  }
  /**
   * Combine options of the fbt element level with default options
   * @returns only options that are considered "defined".
   * I.e. Options whose value is `false` or nullish will be skipped.
   */


  _getSharedPhraseOptions({
    options: fbtElementOptions
  }) {
    var _fbtElementOptions$au, _fbtElementOptions$co, _fbtElementOptions$do, _fbtElementOptions$lo, _fbtElementOptions$pr;

    const {
      defaultFbtOptions
    } = this;
    const ret = {
      author: ((_fbtElementOptions$au = fbtElementOptions.author) !== null && _fbtElementOptions$au !== void 0 ? _fbtElementOptions$au : enforceString.orNull(defaultFbtOptions.author)) || null,
      common: ((_fbtElementOptions$co = fbtElementOptions.common) !== null && _fbtElementOptions$co !== void 0 ? _fbtElementOptions$co : enforceBoolean.orNull(defaultFbtOptions.common)) || null,
      doNotExtract: ((_fbtElementOptions$do = fbtElementOptions.doNotExtract) !== null && _fbtElementOptions$do !== void 0 ? _fbtElementOptions$do : enforceBoolean.orNull(defaultFbtOptions.doNotExtract)) || null,
      locale: ((_fbtElementOptions$lo = fbtElementOptions.locale) !== null && _fbtElementOptions$lo !== void 0 ? _fbtElementOptions$lo : enforceString.orNull(defaultFbtOptions.locale)) || null,
      preserveWhitespace: ((_fbtElementOptions$pr = fbtElementOptions.preserveWhitespace) !== null && _fbtElementOptions$pr !== void 0 ? _fbtElementOptions$pr : enforceBoolean.orNull(defaultFbtOptions.preserveWhitespace)) || null,
      subject: fbtElementOptions.subject,
      project: fbtElementOptions.project || enforceString(defaultFbtOptions.project)
    }; // delete nullish options

    for (const k in ret) {
      if (ret[k] == null) {
        delete ret[k];
      }
    }

    return ret;
  }

}

module.exports = FbtFunctionCallProcessor;