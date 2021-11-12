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
  ValidParamOptions
} = require('../FbtConstants');

const {
  collectOptionsFromFbtConstruct,
  createFbtRuntimeArgCallExpression,
  enforceBabelNodeExpression,
  errorAt,
  varDump
} = require('../FbtUtil');

const {
  GENDER_ANY,
  NUMBER_ANY
} = require('../translate/IntlVariations');

const {
  GenderStringVariationArg,
  NumberStringVariationArg
} = require('./FbtArguments');

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  createInstanceFromFbtConstructCallsite,
  tokenNameToTextPattern
} = require('./FbtNodeUtil');

const {
  arrayExpression,
  isExpression,
  isStringLiteral,
  numericLiteral,
  stringLiteral
} = require('@babel/types');

const invariant = require('invariant');

const nullthrows = require('nullthrows');

/**
 * Variations.
 */
const ParamVariation = {
  number: 0,
  gender: 1
};
/**
 * Represents an <fbt:param> or fbt.param() construct.
 * @see docs/params.md
 */

class FbtParamNode extends FbtNode {
  getOptions() {
    try {
      const rawOptions = collectOptionsFromFbtConstruct(this.moduleName, this.node, ValidParamOptions);
      const [arg0, arg1] = this.getCallNodeArguments() || [];
      const gender = enforceBabelNodeExpression.orNull(rawOptions.gender);
      const number = typeof rawOptions.number === 'boolean' ? rawOptions.number : enforceBabelNodeExpression.orNull(rawOptions.number);
      !(number !== false) ? process.env.NODE_ENV !== "production" ? invariant(false, '`number` option must be an expression or `true`') : invariant(false) : void 0;
      !(!gender || !number) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Gender and number options must not be set at the same time') : invariant(false) : void 0;
      let name = typeof rawOptions.name === 'string' ? rawOptions.name : null;

      if (!name) {
        !isStringLiteral(arg0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'First function argument must be a string literal') : invariant(false) : void 0;
        name = arg0.value;
      }

      !name.length ? process.env.NODE_ENV !== "production" ? invariant(false, 'Token name string must not be empty') : invariant(false) : void 0;
      const value = nullthrows(arg1, 'The second function argument must not be null');
      return {
        gender,
        name,
        number,
        value
      };
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }
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

  getArgsForStringVariationCalc() {
    const {
      gender,
      number
    } = this.options;
    const ret = [];
    !(!gender || !number) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Gender and number options must not be set at the same time') : invariant(false) : void 0;

    if (gender) {
      ret.push(new GenderStringVariationArg(this, gender, [GENDER_ANY]));
    } else if (number) {
      ret.push(new NumberStringVariationArg(this, number === true ? null : number, [NUMBER_ANY]));
    }

    return ret;
  }

  getTokenName(_argsMap) {
    return this.options.name;
  }

  getText(argsMap) {
    try {
      this.getArgsForStringVariationCalc().forEach(expectedArg => {
        const svArg = argsMap.get(this);
        !( // $FlowExpectedError[method-unbinding] We're just comparing methods by reference
        svArg.constructor === expectedArg.constructor) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected SVArgument instance of %s but got %s instead: %s', expectedArg.constructor.name || 'unknown', svArg.constructor.name || 'unknown', varDump(svArg)) : invariant(false) : void 0;
      });
      return tokenNameToTextPattern(this.getTokenName(argsMap));
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getFbtRuntimeArg() {
    const {
      gender,
      name,
      number,
      value
    } = this.options;
    let variationValues;

    if (number != null) {
      variationValues = [numericLiteral(ParamVariation.number)];

      if (number !== true) {
        // For number="true" we don't pass additional value.
        variationValues.push(number);
      }
    } else if (gender != null) {
      variationValues = [numericLiteral(ParamVariation.gender), gender];
    }

    return createFbtRuntimeArgCallExpression(this, [stringLiteral(name), value, variationValues ? arrayExpression(variationValues) : null].filter(Boolean));
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    const {
      gender,
      number
    } = this.options;

    if (gender != null) {
      return {
        gender
      };
    }

    return isExpression(number) ? {
      number
    } : {};
  }

}

_defineProperty(FbtParamNode, "type", FbtNodeType.Param);

module.exports = FbtParamNode;