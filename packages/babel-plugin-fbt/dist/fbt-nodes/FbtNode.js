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

const FbtNodeChecker = require('../FbtNodeChecker');

const {
  compactBabelNodeProps,
  errorAt,
  varDump
} = require('../FbtUtil');

const FbtNodeType = require('./FbtNodeType');

const {
  default: traverse
} = require('@babel/traverse');

const {
  isCallExpression,
  isNewExpression
} = require('@babel/types');

const invariant = require('invariant');

/**
 * Base class that represents an fbt construct like <fbt>, <fbt:param>, etc...
 *
 * While Babel nodes are considered "low-level" representations of the JS source code,
 * FbtNode is a high-level abstraction of the fbt API syntax.
 *
 * See `FbtElementNode` for more info on how this class will be used.
 *
 * We'll usually not use this class directly, favoring specialized child classes instead.
 */
class FbtNode {
  /**
   * Reference to the BabelNode that this fbt node represents
   */

  /**
   * Standardized "options" of the current fbt construct.
   *
   * I.e. the JSX attributes on `<fbt:construct {...options}>` or
   * the `options` argument from `fbt.construct(..., options)`
   */
  constructor({
    children,
    moduleName,
    node,
    parent
  }) {
    _defineProperty(this, "moduleName", void 0);

    _defineProperty(this, "children", void 0);

    _defineProperty(this, "node", void 0);

    _defineProperty(this, "nodeChecker", void 0);

    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "_variationFactorValues", []);

    this.moduleName = moduleName;
    this.node = node;

    if (parent != null) {
      this.parent = parent;
    }

    this.children = children != null ? [...children] : [];
    this.nodeChecker = FbtNodeChecker.forModule(moduleName);
    this.options = this.getOptions();
    this.initCheck();
  }
  /**
   * Gather and standardize the valid "options" of the fbt construct.
   * @see {@link FbtNode#options}
   *
   * Note that the fbt construct's options will be stored in `this.options`
   * just after constructing this class instance.
   */


  getOptions() {
    throw errorAt(this.node, 'This method must be implemented in a child class');
  }
  /**
   * Run integrity checks to ensure this fbt construct is in a valid state
   * These checks are non-exhaustive. Some new exceptions may arise later on.
   */


  initCheck() {}

  _clone() {
    const {
      constructor: Constructor
    } = this;
    return new Constructor({
      children: this.children,
      moduleName: this.moduleName,
      node: this.node,
      parent: this.parent
    });
  }

  _setStringVariationValues(variationFactorValues) {
    this._variationFactorValues = variationFactorValues;
    return this;
  }

  setParent(parent) {
    // $FlowExpectedError[cannot-write] Allow writing this property internally
    this.parent = parent;
    return this;
  }

  appendChild(child) {
    if (child != null) {
      this.children.push(child);
      child.setParent(this);
    }

    return this;
  }
  /**
   * Get the list of string variation arguments (SVArgument) for this node and all its children.
   * Note that the node tree is explored using the "postorder traversal" algorithm
   * (I.e. left, right, root)
   */


  getArgsForStringVariationCalc() {
    throw errorAt(this.node, 'This method must be implemented in a child class');
  }

  getText(_argsMap) {
    throw errorAt(this.node, 'This method must be implemented in a child class');
  }

  getTokenAliases(_argsMap) {
    return null;
  }

  getTokenName(_argsMap) {
    return null;
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
   * String variation arguments will also be serialized for debugging purpose.
   *
   * See snapshot `fbtFunctional-test.js.snap` to find output examples.
   */


  __toJSONForTestsOnly() {
    let stringVariationArgs;

    try {
      stringVariationArgs = this.getArgsForStringVariationCalc();
    } catch (error) {
      if (error.message.includes('This method must be implemented in a child class')) {
        stringVariationArgs = error;
      } else {
        throw error;
      }
    }

    const ret = { ...compactBabelNodeProps(this),
      __stringVariationArgs: stringVariationArgs,
      // Avoid cyclic recursion issues
      parent: this.parent != null ? this.parent.constructor.name : this.parent
    };

    if (this.options != null) {
      ret.options = compactBabelNodeProps(this.options);
    }

    Object.defineProperty(ret, 'constructor', {
      value: this.constructor,
      enumerable: false
    });
    return ret;
  }

  toJSON() {
    return this.__toJSONForTestsOnly();
  }
  /**
   * Returns a JSON-friendly representation of this instance that can be consumed
   * in other programming languages.
   * NOTE: this only represents the current node but not its children!
   */


  toPlainFbtNode() {
    const type = FbtNodeType.cast( // $FlowExpectedError[prop-missing] FbtNode child classes have a `type` static property
    this.constructor.type);
    !(type != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected instance constructor.type property to be a string instead of `%s`', varDump(type)) : invariant(false) : void 0;
    return {
      type
    };
  }
  /**
   * Returns the Babel node from this FbtNode only if it's a BabelNodeCallExpression
   */


  getCallNode() {
    return isCallExpression(this.node) ? this.node : null;
  }
  /**
   * Returns the list of BabelNode arguments of this fbt node
   * (assuming that it's based on a JS function call), or null.
   */


  getCallNodeArguments() {
    const callNode = this.getCallNode();
    return callNode ? // Force null/undefined to be part of the array so that the consumer of this function
    // will have to do null-checks.
    // $FlowExpectedError[incompatible-return]
    callNode.arguments : null;
  }
  /**
   * Returns the first parent FbtNode that is an instance of the given class.
   */


  getFirstAncestorOfType(ancestorConstructor) {
    for (let {
      parent
    } = this; parent != null; parent = parent.parent) {
      if (parent instanceof ancestorConstructor) {
        return parent;
      }
    }

    return null;
  }
  /**
   * Returns the fbt runtime argument (as a BabelNode) that will be used to by an fbt runtime call.
   * I.e.
   * Given the fbt runtime call:
   *
   *   fbt._(jsfbtTable, [
   *     <<runtimeFbtArg>>
   *   ])
   *
   * This method is responsible to generate <<runtimeFbtArg>>
   */


  getFbtRuntimeArg() {
    throw errorAt(this.node, 'This method must be implemented in a child class');
  }
  /**
   * Throws error if a function call or class instantiation call exists in
   * any of the fbt's arguments that have impact on string variation.
   *
   * Arguments that decide string variations:
   *  fbt:element: the 'subject' value
   *  fbt:enum: the 'enum' value
   *  fbt:name: the 'gender' value
   *  fbt:param: the 'gender/number' value. 'value' is okay
   *  fbt:plural: the 'count' value. 'value' is okay
   *  fbt:pronoun: the 'gender' value
   */


  throwIfAnyArgumentContainsFunctionCallOrClassInstantiation(scope) {
    const argsToCheck = this.getArgsThatShouldNotContainFunctionCallOrClassInstantiation();

    for (const argumentName in argsToCheck) {
      const argument = argsToCheck[argumentName];

      if (isCallExpression(argument) || isNewExpression(argument)) {
        throw errorAt(this.node, `Expected string variation runtime argument "${argumentName}" ` + `to not be a function call or class instantiation expression. ` + `See https://fburl.com/i18n_js_fbt_extraction_limits`);
      } // Look for function or class call nested in the argument


      traverse(argument, {
        'CallExpression|NewExpression'(path) {
          throw errorAt(path.node, `Expected string variation runtime argument "${argumentName}" ` + `to not contain a function call or class instantiation expression. ` + `See https://fburl.com/i18n_js_fbt_extraction_limits`);
        }

      }, scope);
    }
  }

  getArgsThatShouldNotContainFunctionCallOrClassInstantiation() {
    return {};
  }

}

module.exports = FbtNode;