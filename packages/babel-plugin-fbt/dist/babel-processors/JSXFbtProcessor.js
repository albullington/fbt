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

const FbtCommon = require('../FbtCommon');

const {
  CommonOption,
  FbtCallMustHaveAtLeastOneOfTheseAttributes,
  FbtRequiredAttributes,
  ValidFbtOptions
} = require('../FbtConstants');

const FbtNodeChecker = require('../FbtNodeChecker');

const {
  convertToStringArrayNodeIfNeeded,
  errorAt,
  expandStringConcat,
  filterEmptyNodes,
  getAttributeByName,
  getAttributeByNameOrThrow,
  getOptionsFromAttributes,
  normalizeSpaces,
  validateNamespacedFbtElement,
  varDump
} = require('../FbtUtil');

const getNamespacedArgs = require('../getNamespacedArgs');

const {
  arrayExpression,
  callExpression,
  identifier,
  isCallExpression,
  isJSXElement,
  isStringLiteral,
  jsxExpressionContainer,
  memberExpression,
  stringLiteral
} = require('@babel/types');

const invariant = require('invariant');

class JSXFbtProcessor {
  constructor({
    babelTypes,
    nodeChecker,
    path
  }) {
    _defineProperty(this, "moduleName", void 0);

    _defineProperty(this, "node", void 0);

    _defineProperty(this, "nodeChecker", void 0);

    _defineProperty(this, "path", void 0);

    _defineProperty(this, "t", void 0);

    _defineProperty(this, "_openingElementAttributes", void 0);

    this.moduleName = nodeChecker.moduleName;
    this.node = path.node;
    this.nodeChecker = nodeChecker;
    this.path = path;
    this.t = babelTypes;
  }

  static create({
    babelTypes,
    path
  }) {
    const nodeChecker = FbtNodeChecker.forJSXFbt(path.node);
    return nodeChecker != null ? new JSXFbtProcessor({
      babelTypes,
      nodeChecker,
      path
    }) : null;
  }

  _getText(childNodes) {
    return convertToStringArrayNodeIfNeeded(this.moduleName, arrayExpression(childNodes));
  }
  /**
   * @returns the description of the <fbt> as a BabelNode, or null if it's a common string.
   */


  _getDescription(texts) {
    const {
      moduleName,
      node
    } = this;

    const commonAttributeValue = this._getCommonAttributeValue();

    let desc; // TODO(T83043301) create an <fbt common={true}> test case in the JSX fbt test suite

    if (commonAttributeValue && commonAttributeValue.value) {
      const rawTextValue = (texts.elements || []).map(stringNode => {
        try {
          !isStringLiteral(stringNode) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected a StringLiteral but found `%s` instead', (stringNode === null || stringNode === void 0 ? void 0 : stringNode.type) || 'unknown') : invariant(false) : void 0;
          return stringNode.value;
        } catch (error) {
          throw errorAt(stringNode, error.message);
        }
      }).join('');
      const textValue = normalizeSpaces(rawTextValue).trim();
      const descValue = FbtCommon.getDesc(textValue);

      if (descValue == null || descValue === '') {
        throw errorAt(node, FbtCommon.getUnknownCommonStringErrorMessage(moduleName, textValue));
      }

      if (getAttributeByName(this._getOpeningElementAttributes(), 'desc')) {
        throw errorAt(node, `<${moduleName} common={true}> must not have "desc" attribute`);
      }

      desc = stringLiteral(descValue);
    } else {
      desc = this._getDescAttributeValue();
    }

    return desc;
  }

  _getOptions() {
    var _options$properties$l;

    // Optional attributes to be passed as options.
    const attrs = this._getOpeningElementAttributes();

    this._assertHasMandatoryAttributes();

    const options = attrs.length > 0 ? getOptionsFromAttributes(this.t, attrs, ValidFbtOptions, FbtRequiredAttributes) : null;
    return ((_options$properties$l = options === null || options === void 0 ? void 0 : options.properties.length) !== null && _options$properties$l !== void 0 ? _options$properties$l : 0) > 0 ? options : null;
  }

  _getOpeningElementAttributes() {
    if (this._openingElementAttributes != null) {
      return this._openingElementAttributes;
    }

    const {
      node
    } = this;
    this._openingElementAttributes = node.openingElement.attributes.map(attribute => {
      if (attribute.type === 'JSXSpreadAttribute') {
        throw errorAt(node, `<${this.moduleName}> does not support JSX spread attribute`);
      }

      return attribute;
    });
    return this._openingElementAttributes;
  }

  _assertHasMandatoryAttributes() {
    if (this._getOpeningElementAttributes().find(attribute => FbtCallMustHaveAtLeastOneOfTheseAttributes.includes(attribute.name.name)) == null) {
      throw errorAt(this.node, `<${this.moduleName}> must have at least ` + `one of these attributes: ${FbtCallMustHaveAtLeastOneOfTheseAttributes.join(', ')}`);
    }
  }

  _createFbtFunctionCallNode({
    desc,
    options,
    text
  }) {
    const {
      moduleName,
      node,
      path
    } = this;
    !(text != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'text cannot be null') : invariant(false) : void 0;
    !(desc != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'desc cannot be null') : invariant(false) : void 0;
    const args = [text, desc];

    if (options != null) {
      args.push(options);
    }

    const callNode = callExpression(identifier(moduleName), args);
    callNode.loc = node.loc;

    if (isJSXElement(path.parent)) {
      const ret = jsxExpressionContainer(callNode);
      ret.loc = node.loc;
      return ret;
    }

    return callNode;
  }

  _assertNoNestedFbts() {
    this.nodeChecker.assertNoNestedFbts(this.node);
  }

  _transformChildrenForFbtCallSyntax() {
    this.path.traverse(jsxFbtConstructToFunctionalFormTransform, {
      moduleName: this.moduleName
    });
    return filterEmptyNodes(this.node.children).map(node => {
      try {
        switch (node.type) {
          case 'JSXElement':
            // This should already be a simple JSX element (non-fbt construct)
            return node;

          case 'JSXText':
            return stringLiteral(normalizeSpaces(node.value));

          case 'JSXExpressionContainer':
            {
              const {
                expression
              } = node;

              if (this.nodeChecker.getFbtConstructNameFromFunctionCall(expression) != null) {
                // preserve fbt construct's function calls intact
                !isCallExpression(expression) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected BabelNodeCallExpression value but received `%s` (%s)', varDump(expression), typeof expression) : invariant(false) : void 0;
                return expression;
              } // otherwise, assume that we have textual nodes to return


              return stringLiteral(normalizeSpaces(expandStringConcat(this.moduleName, node.expression).value));
            }

          default:
            throw errorAt(node, `Unsupported JSX element child type '${node.type}'`);
        }
      } catch (error) {
        throw errorAt(node, error.message);
      }
    });
  }

  _getDescAttributeValue() {
    const {
      moduleName
    } = this;
    const descAttr = getAttributeByNameOrThrow(this._getOpeningElementAttributes(), 'desc');
    const {
      node
    } = this;

    if (!descAttr || descAttr.value == null) {
      throw errorAt(node, `<${moduleName}> requires a "desc" attribute`);
    }

    switch (descAttr.value.type) {
      case 'JSXExpressionContainer':
        // @babel/parser should not allow this scenario normally
        !(descAttr.value.expression.type !== 'JSXEmptyExpression') ? process.env.NODE_ENV !== "production" ? invariant(false, 'unexpected') : invariant(false) : void 0;
        return descAttr.value.expression;

      case 'StringLiteral':
        return descAttr.value;
    }

    throw errorAt(node, `<${moduleName}> "desc" attribute must be a string literal ` + `or a non-empty JSX expression`);
  }

  _getCommonAttributeValue() {
    const commonAttr = getAttributeByName(this._getOpeningElementAttributes(), CommonOption);
    const commonAttrValue = commonAttr && commonAttr.value;

    if (!commonAttrValue) {
      return null;
    }

    if (commonAttrValue.type === 'JSXExpressionContainer') {
      const expression = commonAttrValue.expression;

      if (expression.type === 'BooleanLiteral') {
        return expression;
      }
    }

    throw new Error(`\`${CommonOption}\` attribute for <${this.moduleName}> requires boolean literal`);
  }
  /**
   * This method mutates the current Babel node
   */


  convertToFbtFunctionCallNode(_phraseIndex) {
    this._assertNoNestedFbts();

    const children = this._transformChildrenForFbtCallSyntax();

    const text = this._getText(children);

    const description = this._getDescription(text);

    this.path.replaceWith(this._createFbtFunctionCallNode({
      text,
      desc: description,
      options: this._getOptions()
    }));
  }

}
/**
 * Traverse all JSXElements, replace those that are JSX fbt constructs (e.g. <fbt:param>)
 * to their functional form equivalents (e.g. fbt.param()).
 */


const jsxFbtConstructToFunctionalFormTransform = {
  JSXElement(path) {
    const {
      node
    } = path; // $FlowFixMe[object-this-reference] Babel transforms run with the plugin context by default

    const moduleName = this.moduleName;
    const name = validateNamespacedFbtElement(moduleName, node.openingElement.name);

    if (name !== 'implicitParamMarker') {
      const args = getNamespacedArgs(moduleName)[name](node);
      let fbtConstructCall = callExpression(memberExpression(identifier(moduleName), identifier(name), false), args);

      if (isJSXElement(path.parent)) {
        fbtConstructCall = jsxExpressionContainer(fbtConstructCall);
      }

      path.replaceWith(fbtConstructCall);
    }
  }

};
module.exports = JSXFbtProcessor;