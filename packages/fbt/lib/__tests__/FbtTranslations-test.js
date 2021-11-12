"use strict";

var _FbtTranslations = _interopRequireDefault(require("../FbtTranslations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 *
 * @emails oncall+i18n_fbt_oss
 * @generated
 * @noformat
 * @nogrep
 */
describe('FbtTranslations', function () {
  it('can register and get back translations', function () {
    _FbtTranslations["default"].registerTranslations({
      en_US: {
        c1: 'aaa'
      }
    });

    expect(_FbtTranslations["default"].getRegisteredTranslations()).toMatchInlineSnapshot("\n    Object {\n      \"en_US\": Object {\n        \"c1\": \"aaa\",\n      },\n    }\n  ");
  });
  it('merges translations with the same locale as expected', function () {
    _FbtTranslations["default"].registerTranslations({
      en_US: {
        c1: 'aaa'
      }
    });

    _FbtTranslations["default"].mergeTranslations({
      en_US: {
        c2: 'bbb'
      }
    });

    expect(_FbtTranslations["default"].getRegisteredTranslations()).toMatchInlineSnapshot("\n    Object {\n      \"en_US\": Object {\n        \"c1\": \"aaa\",\n        \"c2\": \"bbb\",\n      },\n    }\n  ");
  });
  it('merges translations with different locales as expected', function () {
    _FbtTranslations["default"].registerTranslations({
      en_US: {
        c1: 'aaa'
      }
    });

    _FbtTranslations["default"].mergeTranslations({
      es_MX: {
        c1: 'bbb'
      },
      cs_CZ: {
        c1: 'ccc'
      }
    });

    expect(_FbtTranslations["default"].getRegisteredTranslations()).toMatchInlineSnapshot("\n    Object {\n      \"cs_CZ\": Object {\n        \"c1\": \"ccc\",\n      },\n      \"en_US\": Object {\n        \"c1\": \"aaa\",\n      },\n      \"es_MX\": Object {\n        \"c1\": \"bbb\",\n      },\n    }\n  ");
  });
  it('merges translations with the same hash as expected', function () {
    _FbtTranslations["default"].registerTranslations({
      en_US: {
        c1: 'aaa',
        c2: 'bbb'
      }
    });

    _FbtTranslations["default"].mergeTranslations({
      en_US: {
        c1: 'ccc'
      }
    });

    expect(_FbtTranslations["default"].getRegisteredTranslations()).toMatchInlineSnapshot("\n    Object {\n      \"en_US\": Object {\n        \"c1\": \"ccc\",\n        \"c2\": \"bbb\",\n      },\n    }\n  ");
  });
});