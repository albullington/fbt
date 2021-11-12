/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * @typechecks
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Warning: importing JS modules outside of beforeEach blocks is generally bad practice
// in jest tests. We might need to move these modules inside beforeEach().
// These ones can stay here for now since they have a consistent behavior across this test suite.
var IntlVariations = require('IntlVariations');

var IntlViewerContext = require('IntlViewerContext');

var ONE = String(IntlVariations.NUMBER_ONE);
var FEW = String(IntlVariations.NUMBER_FEW);
var MALE = String(IntlVariations.GENDER_MALE);
var FEMALE = String(IntlVariations.GENDER_FEMALE);
var fbtRuntime;
var intlNumUtils;
describe('fbt', function () {
  beforeEach(function () {
    jest.resetModules();
    jest.requireActual('FbtHooks').register({
      getFbtResult: require('FbtResult').get
    });
    intlNumUtils = jest.requireActual('intlNumUtils');
    fbtRuntime = jest.requireActual('fbt').fbt;
  });
  it('should handle variated numbers', function () {
    jest.requireActual('FbtHooks').register({
      // IntlCLDRNumberType31
      getViewerContext: function getViewerContext() {
        return _objectSpread({}, IntlViewerContext, {
          locale: 'br_FR'
        });
      }
    });
    var numToType = {
      '21': IntlVariations.NUMBER_ONE,
      '22': IntlVariations.NUMBER_TWO,
      '103': IntlVariations.NUMBER_FEW,
      '1000000': IntlVariations.NUMBER_MANY,
      '15': IntlVariations.NUMBER_OTHER
    };

    for (var n in numToType) {
      var type = numToType[n];
      var displayNumber = intlNumUtils.formatNumberWithThousandDelimiters(parseFloat(n));
      expect(fbtRuntime._param('num', parseInt(n, 10), [0])).toEqual([[type, '*'], {
        num: displayNumber
      }]);
    }
  });
  it('should access table with fallback logic', function () {
    var FbtHooks = require('FbtHooks');

    var genderMock; // $FlowFixMe[cannot-write] We need to mock this method

    FbtHooks.getViewerContext = jest.fn(function () {
      return {
        GENDER: genderMock,
        locale: 'ro_RO' // IntlCLDRNumberType19

      };
    });
    var table = {
      __vcg: 1,
      // viewer-context gender
      '*': {}
    };
    table['*']['A'] = {
      '*': 'A,UNKNOWN,OTHER {name} has {num}'
    };
    table['*']['A'][ONE] = 'A,UNKNOWN,ONE {name} has {num}';
    table['*']['A'][FEW] = 'A,UNKNOWN,FEW {name} has {num}';
    table['*']['B'] = {
      '*': 'B,UNKNOWN,OTHER {name} has {num}'
    };
    table['*']['B'][ONE] = 'B,UNKNOWN,ONE {name} has {num}';
    table['*']['B'][FEW] = 'B,UNKNOWN,FEW {name} has {num}';
    table[MALE] = {
      A: {
        '*': 'A,MALE,OTHER {name} has {num}'
      }
    };
    table[MALE]['A'][ONE] = 'A,MALE,ONE {name} has {num}'; // table['*'][male]['A'][FEW] = fallback to other ^^^
    // table['*'][male]['B'] = fallback to unknown gender ^^^

    table[FEMALE] = {
      B: {
        '*': 'B,FEMALE,OTHER {name} has {num}'
      }
    };
    table[FEMALE]['B'][FEW] = 'B,FEMALE,FEW {name} has {num}'; // table[female]['B'][ONE] = fallback to other ^^^
    // table[female]['A'] = fallback to unknown gender ^^^

    var few = fbtRuntime._param('num', 10, [0]
    /*Variations.NUMBER*/
    );

    var other = fbtRuntime._param('num', 20, [0]);

    var one = fbtRuntime._param('num', 1, [0]);

    var A = fbtRuntime._enum('A', {
      A: 'A',
      B: 'B'
    });

    var B = fbtRuntime._enum('B', {
      A: 'A',
      B: 'B'
    });

    var name = fbtRuntime._param('name', 'Bob'); // GENDER UNKNOWN


    genderMock = IntlVariations.GENDER_UNKNOWN;
    var tests = [{
      arg: [A, few, name],
      expected: 'A,UNKNOWN,FEW Bob has 10'
    }, {
      arg: [A, one, name],
      expected: 'A,UNKNOWN,ONE Bob has 1'
    }, {
      arg: [A, other, name],
      expected: 'A,UNKNOWN,OTHER Bob has 20'
    }, {
      arg: [B, few, name],
      expected: 'B,UNKNOWN,FEW Bob has 10'
    }, {
      arg: [B, one, name],
      expected: 'B,UNKNOWN,ONE Bob has 1'
    }, {
      arg: [B, other, name],
      expected: 'B,UNKNOWN,OTHER Bob has 20'
    }];

    var runTest = function runTest(test) {
      try {
        expect(fbtRuntime._(table, test.arg).toString()).toBe(test.expected);
      } catch (error) {
        error.message += "\ntest.expected=\"".concat(test.expected, "\"");
        throw error;
      }
    };

    tests.forEach(runTest);
    genderMock = IntlVariations.GENDER_MALE;
    tests = [{
      arg: [A, few, name],
      expected: 'A,MALE,OTHER Bob has 10'
    }, {
      arg: [A, one, name],
      expected: 'A,MALE,ONE Bob has 1'
    }, {
      arg: [A, other, name],
      expected: 'A,MALE,OTHER Bob has 20'
    }, {
      arg: [B, few, name],
      expected: 'B,UNKNOWN,FEW Bob has 10'
    }, {
      arg: [B, one, name],
      expected: 'B,UNKNOWN,ONE Bob has 1'
    }, {
      arg: [B, other, name],
      expected: 'B,UNKNOWN,OTHER Bob has 20'
    }];
    tests.forEach(runTest);
    genderMock = IntlVariations.GENDER_FEMALE;
    tests = [{
      arg: [A, few, name],
      expected: 'A,UNKNOWN,FEW Bob has 10'
    }, {
      arg: [A, one, name],
      expected: 'A,UNKNOWN,ONE Bob has 1'
    }, {
      arg: [A, other, name],
      expected: 'A,UNKNOWN,OTHER Bob has 20'
    }, {
      arg: [B, few, name],
      expected: 'B,FEMALE,FEW Bob has 10'
    }, {
      arg: [B, one, name],
      expected: 'B,FEMALE,OTHER Bob has 1'
    }, {
      arg: [B, other, name],
      expected: 'B,FEMALE,OTHER Bob has 20'
    }];
    tests.forEach(runTest);
  });
});