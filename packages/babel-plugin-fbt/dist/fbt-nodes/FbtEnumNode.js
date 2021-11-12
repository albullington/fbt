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
  FBT_ENUM_MODULE_SUFFIX
} = require('../FbtConstants');

const FbtEnumRegistrar = require('../FbtEnumRegistrar');

const {
  createFbtRuntimeArgCallExpression,
  enforceBabelNode,
  enforceBabelNodeCallExpressionArg,
  errorAt,
  varDump
} = require('../FbtUtil');

const {
  EnumStringVariationArg
} = require('./FbtArguments');

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  createInstanceFromFbtConstructCallsite
} = require('./FbtNodeUtil');

const {
  isArrayExpression,
  isIdentifier,
  isNumericLiteral,
  isObjectExpression,
  isObjectProperty,
  isStringLiteral,
  objectExpression,
  objectProperty,
  stringLiteral
} = require('@babel/types');

const invariant = require('invariant');

const nullthrows = require('nullthrows');

/**
 * Represents an <fbt:enum> or fbt.enum() construct.
 * @see docs/enums.md
 */
class FbtEnumNode extends FbtNode {
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
    const [value, rangeArg] = this.getCallNodeArguments() || [];
    let rangeNode = rangeArg;

    try {
      let range = {};
      rangeNode = enforceBabelNode(rangeNode, '`range`');

      if (isArrayExpression(rangeNode)) {
        !(rangeNode.elements && rangeNode.elements.length) ? process.env.NODE_ENV !== "production" ? invariant(false, 'List of enum entries must not be empty') : invariant(false) : void 0;
        rangeNode.elements.forEach(item => {
          !isStringLiteral(item) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Enum values must be string literals') : invariant(false) : void 0; // $FlowFixMe[cannot-write] Force write here to assemble the range object

          range[item.value] = item.value;
        });
      } else if (isObjectExpression(rangeNode)) {
        rangeNode.properties.forEach(prop => {
          !isObjectProperty(prop) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Enum entries must be standard object properties. ' + 'Method or spread expressions are forbidden') : invariant(false) : void 0;
          const valueNode = prop.value;
          const keyNode = prop.key;
          !isStringLiteral(valueNode) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Enum values must be string literals') : invariant(false) : void 0;

          if (isStringLiteral(keyNode) || isNumericLiteral(keyNode)) {
            // $FlowFixMe[cannot-write] Force write here to assemble the range object
            range[keyNode.value.toString()] = valueNode.value;
          } else {
            !(isIdentifier(keyNode) && prop.computed === false) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Enum keys must be string literals instead of `%s` ' + 'when using an object with computed property names', // $FlowFixMe[incompatible-use] BabelNode child classes have a "type" property
            keyNode.type) : invariant(false) : void 0; // $FlowFixMe[cannot-write] Force write here to assemble the range object

            range[keyNode.name] = valueNode.value;
          }
        });
        !Object.keys(range).length ? process.env.NODE_ENV !== "production" ? invariant(false, 'Map of enum entries must not be empty') : invariant(false) : void 0;
      } else {
        !isIdentifier(rangeNode) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected enum range (second argument) to be an array, object or ' + 'a variable referring to an fbt enum') : invariant(false) : void 0;
        const manifest = nullthrows(FbtEnumRegistrar.getEnum(rangeNode.name), `Fbt Enum \`${rangeNode.name}\` not registered; ensure the enum ` + `was correctly imported and that it has the ${FBT_ENUM_MODULE_SUFFIX} suffix.`);
        range = manifest;
      }

      return {
        range,
        value: enforceBabelNodeCallExpressionArg(value, '`value`')
      };
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getText(argsMap) {
    try {
      const svArg = argsMap.get(this);
      const svArgValue = nullthrows(svArg.value);
      return nullthrows(this.options.range[svArgValue], `Unable to find enum text for key=${varDump(svArgValue)}`);
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getArgsForStringVariationCalc() {
    return [new EnumStringVariationArg(this, this.options.value, Object.keys(this.options.range))];
  }

  getFbtRuntimeArg() {
    const [_, rangeArg] = this.getCallNodeArguments() || [];
    let runtimeRange = null;

    if (isIdentifier(rangeArg)) {
      runtimeRange = rangeArg;
    } else {
      const {
        range
      } = this.options;
      runtimeRange = objectExpression(Object.keys(range).map(key => objectProperty(stringLiteral(key), stringLiteral(range[key]))));
    }

    return createFbtRuntimeArgCallExpression(this, [this.options.value, runtimeRange]);
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    return {
      value: this.options.value
    };
  }

}

_defineProperty(FbtEnumNode, "type", FbtNodeType.Enum);

module.exports = FbtEnumNode;