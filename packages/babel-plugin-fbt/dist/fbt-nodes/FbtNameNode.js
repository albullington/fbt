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
'use strict'; /////////////////////////////////////////////////////////////////////
// Planned fbt arguments that will be used by various fbt constructs
// `*` means that it's a static argument (whose value won't change at runtime)
/////////////////////////////////////////////////////////////////////
// name : tokenName*, nameStr, genderValue

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  createFbtRuntimeArgCallExpression,
  enforceBabelNodeCallExpressionArg,
  errorAt
} = require('../FbtUtil');

const {
  GENDER_ANY
} = require('../translate/IntlVariations');

const {
  GenderStringVariationArg
} = require('./FbtArguments');

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  createInstanceFromFbtConstructCallsite,
  tokenNameToTextPattern
} = require('./FbtNodeUtil');

const {
  isStringLiteral,
  stringLiteral
} = require('@babel/types');

const invariant = require('invariant');

/**
 * Represents an <fbt:name> or fbt.name() construct.
 * @see docs/params.md
 */
class FbtNameNode extends FbtNode {
  getOptions() {
    try {
      const {
        moduleName
      } = this;
      let [name, value, gender] = this.getCallNodeArguments() || [];
      !isStringLiteral(name) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected first argument of %s.name to be a string literal, but got %s', moduleName, name && name.type) : invariant(false) : void 0;
      name = name.value;
      value = enforceBabelNodeCallExpressionArg(value, `Second argument of ${moduleName}.name`);
      gender = enforceBabelNodeCallExpressionArg(gender, `Third argument of ${moduleName}.name`);
      return {
        name,
        value,
        gender
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
    return [new GenderStringVariationArg(this, this.options.gender, [GENDER_ANY])];
  }

  getTokenName(_argsMap) {
    return this.options.name;
  }

  getText(argsMap) {
    try {
      argsMap.mustHave(this);
      return tokenNameToTextPattern(this.options.name);
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getFbtRuntimeArg() {
    const {
      gender,
      name,
      value
    } = this.options;
    return createFbtRuntimeArgCallExpression(this, [stringLiteral(name), value, gender].filter(Boolean));
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    return {
      gender: this.options.gender
    };
  }

}

_defineProperty(FbtNameNode, "type", FbtNodeType.Name);

module.exports = FbtNameNode;