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
var TestData_IntlCLDRNumberType47 = {
  "jsModule": "IntlCLDRNumberType47",
  "numberTypes": [16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16, 4, 24, 24, 24, 24, 24, 24, 24, 24, 16]
};
module.exports = TestData_IntlCLDRNumberType47;