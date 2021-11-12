/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

const {
  coerceToTableJSFBTTreeLeaf
} = require('./JSFbtUtil');

const invariant = require('invariant');
/**
 * Used by collectFbt to output multiple phrases in a flat array.
 * See FbtShiftEnumsTest for example input and output.
 */


function extractEnumsAndFlattenPhrases(phrases) {
  return _flatMap(phrases, phrase => {
    const {
      jsfbt
    } = phrase;

    const {
      enums,
      metadata
    } = _extractEnumsFromMetadata(jsfbt.m);

    return _buildTablesWithoutEnums(jsfbt.t, enums, []).map(table => {
      const leaf = coerceToTableJSFBTTreeLeaf(table);
      !(metadata.length === 0 === (leaf != null)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'If the JSFBT table depth is 1, then the metadata array should be empty; ' + 'otherwise, when the depth is greater than 1, the metadata array should not be empty. Metadata length: %s, ', metadata.length) : invariant(false) : void 0;
      return { ...phrase,
        jsfbt: {
          t: table,
          m: metadata
        }
      };
    });
  });
}
/**
 * Used by fbt-runtime babel plugin to build a table of enums to hashes of leaf
 * tables. See FbtShiftEnumsTest for example input and output.
 */


function shiftEnumsToTop(jsfbt) {
  if (typeof jsfbt === 'string') {
    return {
      shiftedJsfbt: jsfbt,
      enumCount: 0
    };
  } else {
    const {
      enums
    } = _extractEnumsFromMetadata(jsfbt.m);

    return {
      shiftedJsfbt: _shiftEnumsToTop(enums, [], jsfbt.t),
      enumCount: enums.length
    };
  }
}

function _extractEnumsFromMetadata(metadata) {
  const enums = [];
  const metadataWithoutEnums = [];
  metadata.forEach(entry => {
    if (entry !== null && entry !== void 0 && entry.range) {
      enums.push(entry.range);
    } else {
      metadataWithoutEnums.push(entry);
    }
  });
  return {
    enums,
    metadata: metadataWithoutEnums
  };
}

function _buildTablesWithoutEnums(table, enums, currentEnumKeys) {
  if (enums.length === 0) {
    return [table];
  }

  const index = currentEnumKeys.length;

  if (index === enums.length) {
    return [_buildTableWithoutEnums(table, currentEnumKeys, 0)];
  }

  return _flatMap(enums[index], enumKey => _buildTablesWithoutEnums(table, enums, currentEnumKeys.concat([enumKey])));
}

function _shiftEnumsToTop(allEnums, currentEnumKeys, table) {
  if (allEnums.length === 0) {
    return table;
  }

  const index = currentEnumKeys.length;

  if (index === allEnums.length) {
    // The top enum levels are done, now build the sub-table for current enum branch
    return _buildTableWithoutEnums(table, currentEnumKeys, 0);
  }

  const newTable = {};

  for (const enumKey of allEnums[index]) {
    newTable[enumKey] = _shiftEnumsToTop(allEnums, currentEnumKeys.concat([enumKey]), table);
  }

  return newTable;
}

function _buildTableWithoutEnums(curLevel, enums, index) {
  const jsfbtTree = coerceToTableJSFBTTreeLeaf(curLevel);

  if (jsfbtTree) {
    return jsfbtTree;
  }

  if (index < enums.length && curLevel.hasOwnProperty(enums[index])) {
    return _buildTableWithoutEnums(curLevel[enums[index]], enums, index + 1);
  }

  const result = {};

  for (const key in curLevel) {
    result[key] = _buildTableWithoutEnums(curLevel[key], enums, index);
  }

  return result;
}
/**
 * Maps each element using a mapping function, then flattens the result into a
 * new array. It is identical to a map followed by flattening to a depth of 1.
 */


function _flatMap(arr, f) {
  return arr.map(f).reduce((arr1, arr2) => arr1.concat(arr2), []);
}

module.exports = {
  extractEnumsAndFlattenPhrases,
  shiftEnumsToTop
};