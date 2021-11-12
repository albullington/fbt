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

const nullthrows = require('nullthrows');
/**
 * @returns an TableJSFBTTreeLeaf object if the given object matches its shape, or null
 */


function coerceToTableJSFBTTreeLeaf(value) {
  return value && typeof value === 'object' && typeof value.desc === 'string' && typeof value.text === 'string' && (typeof value.tokenAliases === 'object' || value.tokenAliases == null) ? value : null;
}

function _runOnNormalizedJSFBTLeaves(value, callback) {
  const leaflet = coerceToTableJSFBTTreeLeaf(value);

  if (leaflet) {
    return callback(leaflet);
  }

  for (const k in value) {
    _runOnNormalizedJSFBTLeaves( // $FlowExpectedError[incompatible-call] `value` should now be an intermediate tree level
    nullthrows(value[k]), callback);
  }
}

function onEachLeaf(phrase, callback) {
  _runOnNormalizedJSFBTLeaves(phrase.jsfbt.t, callback);
}
/**
 * Clone `tree` and replace each leaf in the cloned tree with the result of
 * calling `convertLeaf`.
 */


function mapLeaves(tree, convertLeaf) {
  const leaflet = coerceToTableJSFBTTreeLeaf(tree);

  if (leaflet != null) {
    return convertLeaf(leaflet);
  }

  const newFbtTree = {};

  for (const tableKey in tree) {
    newFbtTree[tableKey] = mapLeaves(tree[tableKey], convertLeaf);
  }

  return newFbtTree;
}

module.exports = {
  coerceToTableJSFBTTreeLeaf,
  onEachLeaf,
  mapLeaves
};