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
  PLURAL_PARAM_TOKEN,
  ShowCountKeys,
  ValidPluralOptions
} = require('../FbtConstants');

const {
  collectOptionsFromFbtConstruct,
  createFbtRuntimeArgCallExpression,
  enforceBabelNodeCallExpressionArg,
  enforceString,
  enforceStringEnum,
  errorAt,
  varDump
} = require('../FbtUtil');

const {
  EXACTLY_ONE,
  NUMBER_ANY
} = require('../translate/IntlVariations');

const {
  NumberStringVariationArg
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

const nullthrows = require('nullthrows');

/**
 * Represents an <fbt:plural> or fbt.plural() construct.
 * @see docs/plurals.md
 */
class FbtPluralNode extends FbtNode {
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
    const rawOptions = collectOptionsFromFbtConstruct(this.moduleName, this.node, ValidPluralOptions);

    try {
      const [_, countArg] = this.getCallNodeArguments() || [];
      const count = enforceBabelNodeCallExpressionArg(countArg, '`count`, the second function argument');
      const showCount = enforceStringEnum.orNull(rawOptions.showCount, ValidPluralOptions.showCount, '`showCount` option') || ShowCountKeys.no;
      const name = enforceString.orNull(rawOptions.name, '`name` option') || (showCount !== ShowCountKeys.no ? PLURAL_PARAM_TOKEN : null);
      return {
        count,
        many: enforceString.orNull(rawOptions.many, '`many` option'),
        name,
        showCount,
        value: enforceBabelNodeCallExpressionArg.orNull(rawOptions.value, '`value` option')
      };
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  _branchByNumberVariation(argsMap, scenario) {
    const svArg = argsMap.get(this);
    const svArgValue = nullthrows(svArg.value);

    switch (svArgValue) {
      case EXACTLY_ONE:
        {
          return scenario.exactlyOne();
        }

      case NUMBER_ANY:
        {
          return scenario.anyNumber();
        }

      default:
        !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unsupported string variation value: %s', varDump(svArgValue)) : invariant(false) : void 0;
    }
  }

  _getStaticTokenName() {
    return nullthrows(this.options.name);
  }

  getTokenName(argsMap) {
    return this._branchByNumberVariation(argsMap, {
      exactlyOne: () => null,
      anyNumber: () => {
        return this.options.showCount !== ShowCountKeys.no ? this._getStaticTokenName() : null;
      }
    });
  }

  getText(argsMap) {
    try {
      const {
        showCount
      } = this.options;
      return this._branchByNumberVariation(argsMap, {
        exactlyOne: () => (showCount === ShowCountKeys.yes ? '1 ' : '') + this._getSingularText(),
        anyNumber: () => {
          var _this$options$many;

          const many = (_this$options$many = this.options.many) !== null && _this$options$many !== void 0 ? _this$options$many : this._getSingularText() + 's';
          return showCount !== ShowCountKeys.no ? tokenNameToTextPattern(this._getStaticTokenName()) + ' ' + many : many;
        }
      });
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  _getSingularText() {
    const callArg0 = nullthrows((this.getCallNodeArguments() || [])[0]);
    !isStringLiteral(callArg0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected a StringLiteral but got "%s" instead', callArg0.type) : invariant(false) : void 0;
    return callArg0.value;
  }

  _getValueNode() {
    throw errorAt(this.node, 'not implemented yet');
  }

  _getCountNode() {
    throw errorAt(this.node, 'not implemented yet');
  }

  getArgsForStringVariationCalc() {
    return [new NumberStringVariationArg(this, this.options.count, [NUMBER_ANY, EXACTLY_ONE])];
  }

  getFbtRuntimeArg() {
    const {
      count,
      name,
      showCount,
      value
    } = this.options;
    const pluralArgs = [count];

    if (showCount !== ShowCountKeys.no) {
      !(name != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'name must be defined when showCount=%s', showCount) : invariant(false) : void 0;
      pluralArgs.push(stringLiteral(name));

      if (value) {
        pluralArgs.push(value);
      }
    }

    return createFbtRuntimeArgCallExpression(this, pluralArgs);
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    return {
      count: this.options.count
    };
  }

}

_defineProperty(FbtPluralNode, "type", FbtNodeType.Plural);

module.exports = FbtPluralNode;