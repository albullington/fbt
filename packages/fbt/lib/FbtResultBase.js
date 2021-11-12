/**
 * Copyright 2004-present Facebook. All Rights Reserved.
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
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FbtResultBase = /*#__PURE__*/function () {
  // Helps detect infinite recursion cycles with toString()
  // __errorListener is given an extra "private" underscore to prevent munging
  // (https://fburl.com/munge) of the member.  We access the member in a
  // function declared on the prototype outside of the class (see below). So,
  // munging will affect this access.
  // Declare that we'll implement these methods
  function FbtResultBase(contents, errorListener) {
    _defineProperty(this, "_contents", void 0);

    _defineProperty(this, "_stringValue", void 0);

    _defineProperty(this, "_isSerializing", void 0);

    _defineProperty(this, "__errorListener", void 0);

    _defineProperty(this, "anchor", void 0);

    _defineProperty(this, "big", void 0);

    _defineProperty(this, "blink", void 0);

    _defineProperty(this, "bold", void 0);

    _defineProperty(this, "charAt", void 0);

    _defineProperty(this, "charCodeAt", void 0);

    _defineProperty(this, "codePointAt", void 0);

    _defineProperty(this, "contains", void 0);

    _defineProperty(this, "endsWith", void 0);

    _defineProperty(this, "fixed", void 0);

    _defineProperty(this, "fontcolor", void 0);

    _defineProperty(this, "fontsize", void 0);

    _defineProperty(this, "includes", void 0);

    _defineProperty(this, "indexOf", void 0);

    _defineProperty(this, "italics", void 0);

    _defineProperty(this, "lastIndexOf", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "localeCompare", void 0);

    _defineProperty(this, "match", void 0);

    _defineProperty(this, "normalize", void 0);

    _defineProperty(this, "repeat", void 0);

    _defineProperty(this, "replace", void 0);

    _defineProperty(this, "search", void 0);

    _defineProperty(this, "slice", void 0);

    _defineProperty(this, "small", void 0);

    _defineProperty(this, "split", void 0);

    _defineProperty(this, "startsWith", void 0);

    _defineProperty(this, "strike", void 0);

    _defineProperty(this, "sub", void 0);

    _defineProperty(this, "substr", void 0);

    _defineProperty(this, "substring", void 0);

    _defineProperty(this, "sup", void 0);

    _defineProperty(this, "toLocaleLowerCase", void 0);

    _defineProperty(this, "toLocaleUpperCase", void 0);

    _defineProperty(this, "toLowerCase", void 0);

    _defineProperty(this, "toUpperCase", void 0);

    _defineProperty(this, "trim", void 0);

    _defineProperty(this, "trimLeft", void 0);

    _defineProperty(this, "trimRight", void 0);

    this._contents = contents;
    this.__errorListener = errorListener;
    this._isSerializing = false;
    this._stringValue = null;
  }

  var _proto = FbtResultBase.prototype;

  _proto.flattenToArray = function flattenToArray() {
    return FbtResultBase.flattenToArray(this._contents);
  };

  _proto.getContents = function getContents() {
    return this._contents;
  };

  _proto.toString = function toString() {
    if (Object.isFrozen(this)) {
      // we can't alter this._isSerializing
      // so let's just return the string and risk infinite recursion...
      return this._toString();
    } // Prevent risk of infinite recursions if the error listener or nested contents toString()
    // reenters this method on the same instance


    if (this._isSerializing) {
      return '<<Reentering fbt.toString() is forbidden>>';
    }

    this._isSerializing = true;

    try {
      return this._toString();
    } finally {
      this._isSerializing = false;
    }
  };

  _proto._toString = function _toString() {
    if (this._stringValue != null) {
      return this._stringValue;
    }

    var stringValue = '';
    var contents = this.flattenToArray();

    for (var ii = 0; ii < contents.length; ++ii) {
      var content = contents[ii];

      if (typeof content === 'string' || content instanceof FbtResultBase) {
        stringValue += content.toString();
      } else {
        var _this$__errorListener, _this$__errorListener2;

        (_this$__errorListener = this.__errorListener) === null || _this$__errorListener === void 0 ? void 0 : (_this$__errorListener2 = _this$__errorListener.onStringSerializationError) === null || _this$__errorListener2 === void 0 ? void 0 : _this$__errorListener2.call(_this$__errorListener, content);
      }
    }

    if (!Object.isFrozen(this)) {
      this._stringValue = stringValue;
    }

    return stringValue;
  };

  _proto.toJSON = function toJSON() {
    return this.toString();
  };

  FbtResultBase.flattenToArray = function flattenToArray(contents) {
    var result = [];

    for (var ii = 0; ii < contents.length; ++ii) {
      var content = contents[ii];

      if (Array.isArray(content)) {
        // $FlowFixMe[method-unbinding] added when improving typing for this parameters
        result.push.apply(result, FbtResultBase.flattenToArray(content));
      } else if (content instanceof FbtResultBase) {
        // $FlowFixMe[method-unbinding] added when improving typing for this parameters
        result.push.apply(result, content.flattenToArray());
      } else {
        result.push(content);
      }
    }

    return result;
  };

  return FbtResultBase;
}(); // Warning: The following methods are only appplicable during the transition
// period for some existing code that uses string method on Fbt string.
// The fbt string should be considered as the final string to be displayed
// and therefore should not be manipulated.
// The following methods are expected not to be supported "soon".


['anchor', 'big', 'blink', 'bold', 'charAt', 'charCodeAt', 'codePointAt', 'contains', 'endsWith', 'fixed', 'fontcolor', 'fontsize', 'includes', 'indexOf', 'italics', 'lastIndexOf', 'link', 'localeCompare', 'match', 'normalize', 'repeat', 'replace', 'search', 'slice', 'small', 'split', 'startsWith', 'strike', 'sub', 'substr', 'substring', 'sup', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'].forEach(function (methodName) {
  /* eslint-disable fb-www/should-use-class */
  // $FlowFixMe[prop-missing] index signature
  FbtResultBase.prototype[methodName] = function () {
    var _this$__errorListener3, _this$__errorListener4;

    (_this$__errorListener3 = this.__errorListener) === null || _this$__errorListener3 === void 0 ? void 0 : (_this$__errorListener4 = _this$__errorListener3.onStringMethodUsed) === null || _this$__errorListener4 === void 0 ? void 0 : _this$__errorListener4.call(_this$__errorListener3, methodName); // $FlowFixMe[incompatible-type] Mock stringish methods
    // $FlowFixMe[prop-missing] Mock stringish methods

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return String.prototype[methodName].apply(this, args);
  };
  /* eslint-enable fb-www/should-use-class */

});
module.exports = FbtResultBase;