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
  ValidPronounOptions,
  ValidPronounUsages,
  ValidPronounUsagesKeys
} = require('../FbtConstants');

const {
  collectOptionsFromFbtConstruct,
  createFbtRuntimeArgCallExpression,
  enforceBabelNodeCallExpressionArg,
  enforceBoolean,
  enforceStringEnum,
  errorAt,
  varDump
} = require('../FbtUtil');

const Gender = require('../Gender');

const {
  GENDER_ANY
} = require('../translate/IntlVariations');

const {
  GenderStringVariationArg
} = require('./FbtArguments');

const FbtNode = require('./FbtNode');

const FbtNodeType = require('./FbtNodeType');

const {
  createInstanceFromFbtConstructCallsite
} = require('./FbtNodeUtil');

const {
  identifier,
  isStringLiteral,
  numericLiteral,
  objectExpression,
  objectProperty
} = require('@babel/types');

const forEachObject = require('fbjs/lib/forEachObject');

const invariant = require('invariant');

const nullthrows = require('nullthrows');

const {
  GENDER_CONST
} = Gender;
const candidatePronounGenders = consolidatedPronounGenders();
const HUMAN_OPTION = 'human';
/**
 * Represents an <fbt:pronoun> or fbt.pronoun() construct.
 * @see docs/pronouns.md
 */

class FbtPronounNode extends FbtNode {
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
    const {
      moduleName
    } = this;
    const rawOptions = collectOptionsFromFbtConstruct(moduleName, this.node, ValidPronounOptions);

    try {
      const args = this.getCallNodeArguments() || [];
      const [usageArg, genderArg] = args;
      !isStringLiteral(usageArg) ? process.env.NODE_ENV !== "production" ? invariant(false, '`usage`, the first argument of %s.pronoun() must be a `StringLiteral` but we got `%s`', moduleName, (usageArg === null || usageArg === void 0 ? void 0 : usageArg.type) || 'unknown') : invariant(false) : void 0;
      const type = enforceStringEnum(usageArg.value, ValidPronounUsages, `\`usage\`, the first argument of ${moduleName}.pronoun()`);
      const gender = enforceBabelNodeCallExpressionArg(genderArg, '`gender`, the second argument');
      const mergedOptions = nullthrows(rawOptions);
      return {
        capitalize: enforceBoolean.orNull(mergedOptions.capitalize),
        gender,
        human: enforceBoolean.orNull(mergedOptions.human),
        type
      };
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  initCheck() {
    const args = this.getCallNodeArguments();
    !(args && (args.length === 2 || args.length === 3) || !args) ? process.env.NODE_ENV !== "production" ? invariant(false, "Expected '(usage, gender [, options])' arguments to %s.pronoun()", this.moduleName) : invariant(false) : void 0;
  }

  getText(argsMap) {
    try {
      const svArg = argsMap.get(this);
      const svArgValue = nullthrows(svArg.value);
      const {
        options
      } = this;
      const word = Gender.getData(svArgValue === GENDER_ANY ? GENDER_CONST.UNKNOWN_PLURAL : // $FlowExpectedError(incompatible-cast) We type-checked for `GENDER_ANY` just above
      svArgValue, options.type);
      !(typeof word === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected pronoun word to be a string but we got %s', varDump(word)) : invariant(false) : void 0;
      return options.capitalize ? word.charAt(0).toUpperCase() + word.substr(1) : word;
    } catch (error) {
      throw errorAt(this.node, error);
    }
  }

  getArgsForStringVariationCalc() {
    const {
      options
    } = this;
    const candidates = new Set();

    for (const gender of candidatePronounGenders) {
      if (options.human === true && gender === GENDER_CONST.NOT_A_PERSON) {
        continue;
      }

      const resolvedGender = getPronounGenderKey(options.type, gender);
      candidates.add(resolvedGender === GENDER_CONST.UNKNOWN_PLURAL ? GENDER_ANY : resolvedGender);
    }

    return [new GenderStringVariationArg(this, options.gender, Array.from(candidates))];
  }

  getFbtRuntimeArg() {
    const {
      gender,
      human,
      type
    } = this.options;
    const numericUsageExpr = numericLiteral(ValidPronounUsages[type]);
    const pronounArgs = [numericUsageExpr, gender];

    if (human) {
      pronounArgs.push(objectExpression([objectProperty(identifier(HUMAN_OPTION), numericLiteral(1))]));
    }

    return createFbtRuntimeArgCallExpression(this, pronounArgs);
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    return {
      gender: this.options.gender
    };
  }

}
/**
 * Must match implementation from fbt.js
 * @see (FB) https://fburl.com/diffusion/3gbcj3aq
 * @see (OSS) https://github.com/facebook/fbt/blob/19531133625dab1d38995dcf578dcfdfa0b09048/runtime/shared/fbt.js#L316-L348
 */


_defineProperty(FbtPronounNode, "type", FbtNodeType.Pronoun);

function getPronounGenderKey(usage, gender) {
  switch (gender) {
    case GENDER_CONST.NOT_A_PERSON:
      return usage === ValidPronounUsagesKeys.object || usage === ValidPronounUsagesKeys.reflexive ? GENDER_CONST.NOT_A_PERSON : GENDER_CONST.UNKNOWN_PLURAL;

    case GENDER_CONST.FEMALE_SINGULAR:
    case GENDER_CONST.FEMALE_SINGULAR_GUESS:
      return GENDER_CONST.FEMALE_SINGULAR;

    case GENDER_CONST.MALE_SINGULAR:
    case GENDER_CONST.MALE_SINGULAR_GUESS:
      return GENDER_CONST.MALE_SINGULAR;

    case GENDER_CONST.MIXED_UNKNOWN:
    case GENDER_CONST.FEMALE_PLURAL:
    case GENDER_CONST.MALE_PLURAL:
    case GENDER_CONST.NEUTER_PLURAL:
    case GENDER_CONST.UNKNOWN_PLURAL:
      return GENDER_CONST.UNKNOWN_PLURAL;

    case GENDER_CONST.NEUTER_SINGULAR:
    case GENDER_CONST.UNKNOWN_SINGULAR:
      return usage === ValidPronounUsagesKeys.reflexive ? GENDER_CONST.NOT_A_PERSON : GENDER_CONST.UNKNOWN_PLURAL;
  }

  !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unknown GENDER_CONST value: %s', varDump(gender)) : invariant(false) : void 0;
} // Prepare the list of genders actually used by the pronoun construct


function consolidatedPronounGenders() {
  const set = new Set();
  forEachObject(GENDER_CONST, gender => {
    forEachObject(ValidPronounUsagesKeys, usage => {
      set.add(getPronounGenderKey(usage, gender));
    });
  });
  return Array.from(set).sort((left, right) => left - right);
}

module.exports = FbtPronounNode;