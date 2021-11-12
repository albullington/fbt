"use strict";

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 * 
 * 
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !! This file is generated by generate_fbt_number_consistency.php !!
 * !! Do not modify it manually                                     !!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * @generated
 * @emails oncall+i18n_fbt_js
 * @noformat
 * @nogrep
 */
var TestData_IntlCLDRNumberType13 = {
  "jsModule": "IntlCLDRNumberType13",
  "numberTypes": [4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4, 4, 4, 4, 24, 4, 24, 4, 4, 24, 4]
};
module.exports = TestData_IntlCLDRNumberType13;