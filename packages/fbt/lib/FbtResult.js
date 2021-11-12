"use strict";

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2015-present Facebook. All Rights Reserved.
 * 
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 * 
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --local ~/www
 *
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error
var FbtReactUtil = require("./FbtReactUtil");

var FbtResultBase = require("./FbtResultBase");

var FbtResultComponent = function FbtResultComponent(props) {
  return props.content;
};

var FbtResult = /*#__PURE__*/function (_FbtResultBase) {
  _inheritsLoose(FbtResult, _FbtResultBase);

  function FbtResult(contents, errorListener) {
    var _this;

    _this = _FbtResultBase.call(this, contents, errorListener) || this;
    /* eslint-disable fb-www/react-state-props-mutation */

    _defineProperty(_assertThisInitialized(_this), "$$typeof", FbtReactUtil.REACT_ELEMENT_TYPE);

    _defineProperty(_assertThisInitialized(_this), "key", null);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "ref", null);

    _defineProperty(_assertThisInitialized(_this), "type", FbtResultComponent);

    _this.props = {
      content: contents
    };

    if (process.env.NODE_ENV !== "production") {
      FbtReactUtil.injectReactShim(_assertThisInitialized(_this));
    }

    return _this;
  }

  FbtResult.get = function get(input) {
    return new FbtResult(input.contents, input.errorListener);
  };

  return FbtResult;
}(FbtResultBase);

module.exports = FbtResult;