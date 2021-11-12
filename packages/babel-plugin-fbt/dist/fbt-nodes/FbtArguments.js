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
  compactBabelNodeProps,
  getRawSource,
  varDump
} = require('../FbtUtil');

const invariant = require('invariant');

/**
 * Base class representing fbt construct arguments that support dynamic values at runtime.
 *
 * E.g.
 *
 *    <fbt:plural
 *      count={
 *        numParticipants             <-- FbtArgumentBase
 *      }
 *      value={
 *        formatted(numParticipants)  <-- FbtArgumentBase
 *      }
 *      showCount="yes"               <-- hard-coded, so not an FbtArgumentBase
 *    >
 *      challenger
 *    </fbt:plural>
 */
class FbtArgumentBase {
  // Reference of the FbtNode creator of this instance
  // BabelNode representing the value of this argument
  constructor(fbtNode, node) {
    _defineProperty(this, "fbtNode", void 0);

    _defineProperty(this, "node", void 0);

    this.fbtNode = fbtNode;
    this.node = node;
  }
  /**
   * For debugging and unit tests:
   *
   * Since BabelNode objects are pretty deep and filled with low-level properties
   * that we don't really care about, we'll process any BabelNode property of this object so that:
   *
   *   - we convert the property value to a string like `'BabelNode[type=SomeBabelType]'`
   *   - we add a new property like `__*propName*Code` whose value will
   *     be the JS source code of the original BabelNode.
   *
   * See snapshot `fbtFunctional-test.js.snap` to find output examples.
   */


  __toJSONForTestsOnly() {
    const {
      fbtNode
    } = this;
    const ret = compactBabelNodeProps({ ...this,
      fbtNode: fbtNode != null ? fbtNode.constructor.name : fbtNode
    });
    Object.defineProperty(ret, 'constructor', {
      value: this.constructor,
      enumerable: false
    });
    return ret;
  }

  toJSON() {
    return this.__toJSONForTestsOnly();
  }

  getArgCode(code) {
    !!!this.node ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unable to find Babel node object from string variation argument: %s', varDump(this)) : invariant(false) : void 0;
    return getRawSource(code, this.node);
  }

}
/**
 * Special fbt argument that does NOT produce string variations.
 *
 * E.g.
 *
 *    <fbt:plural
 *      count={
 *        numParticipants             <-- NumberStringVariationArg
 *      }
 *      value={
 *        formatted(numParticipants)  <-- GenericArg (used for UI display only)
 *      }
 *      showCount="yes"
 *    >
 *      challenger
 *    </fbt:plural>
 */


class GenericArg extends FbtArgumentBase {}
/**
 * Given an fbt callsite that may generate multiple string variations,
 * we know that these variations are issued from some specific arguments.
 *
 * This is the base class that represents these string variation arguments.
 *
 * I.e.
 *
 *     fbt(
 *       [
 *         'Wish ',
 *         fbt.pronoun(
 *           'object',
 *           personGender, // <-- the string varation argument
 *           {human: true}
 *         ),
 *         ' a happy birthday.',
 *       ],
 *       'text with pronoun',
 *     );
 *
 * The string variation argument would be based on the `personGender` variable.
 */


class StringVariationArg extends FbtArgumentBase {
  /**
   * List of candidate values that this SVArgument might have.
   */

  /**
   * Current SVArgument value of this instance among candidates from `candidateValues`.
   */

  /**
   * Given a list of SV arguments, some of them can be omitted because they're "redundant".
   * Note: a SV argument cam be omitted because another one of the same type and same BabelNode
   * source code expression already exist in the list of SV arguments.
   * Set this property to `true` if that's the case.
   */
  constructor(fbtNode, node, candidateValues, value, isCollapsible = false) {
    super(fbtNode, node);

    _defineProperty(this, "candidateValues", void 0);

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "isCollapsible", void 0);

    this.candidateValues = candidateValues;
    this.value = value;
    this.isCollapsible = isCollapsible;
  }

  cloneWithValue(value, isCollapsible) {
    return new this.constructor(this.fbtNode, this.node, this.candidateValues, value, isCollapsible);
  }

}
/**
 * String variation argument that produces variations based on a string enum
 */


class EnumStringVariationArg extends StringVariationArg {
  static assert(value) {
    return assertInstanceOf(value, EnumStringVariationArg);
  }

}
/**
 * String variation argument that produces variations based on genders
 */


class GenderStringVariationArg extends StringVariationArg {
  static assert(value) {
    return assertInstanceOf(value, GenderStringVariationArg);
  }

}
/**
 * String variation argument that produces variations based on numbers
 */


class NumberStringVariationArg extends StringVariationArg {
  static assert(value) {
    return assertInstanceOf(value, NumberStringVariationArg);
  }

}

function assertInstanceOf(value, Constructor) {
  !(value instanceof Constructor) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected instance of %s but got instead: (%s) %s', Constructor.name, typeof value, varDump(value)) : invariant(false) : void 0;
  return value;
}
/**
 * Map of string variation arguments keyed by their source FbtNode
 */


class StringVariationArgsMap {
  constructor(svArgs) {
    _defineProperty(this, "_map", void 0);

    this._map = new Map(svArgs.map(arg => [arg.fbtNode, arg]));
    !(svArgs.length === this._map.size) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected only one StringVariationArg per FbtNode. ' + 'Input array length=%s but resulting map size=%s', svArgs.length, this._map.size) : invariant(false) : void 0;
  }
  /**
   * @return StringVariationArg corresponding to the given FbtNode
   */


  get(fbtNode) {
    const ret = this._map.get(fbtNode);

    !(ret != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Unable to find entry for FbtNode: %s', varDump(fbtNode)) : invariant(false) : void 0; // $FlowFixMe[incompatible-return] the found SVArgument came from the same fbtNode

    return ret;
  }
  /**
   * @throws if the given FbtNode cannot be found
   */


  mustHave(fbtNode) {
    this.get(fbtNode);
  }

}

module.exports = {
  EnumStringVariationArg,
  FbtArgumentBase,
  GenderStringVariationArg,
  GenericArg,
  NumberStringVariationArg,
  StringVariationArg,
  StringVariationArgsMap
};