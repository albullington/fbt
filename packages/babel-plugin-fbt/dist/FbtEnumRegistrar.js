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
  FBT_ENUM_MODULE_SUFFIX
} = require('./FbtConstants');

const t = require('@babel/types');

const path = require('path');

const fbtEnumMapping = {};
let enumManifest;

class FbtEnumRegistrar {
  /**
   * Set the enum manifest. I.e. a mapping of enum module names -> enum entries
   */
  setEnumManifest(manifest) {
    enumManifest = manifest;
  }
  /**
   * Associate a JS variable name to an Fbt enum module name
   * If the module name is invalid, then it's a no-op.
   */


  setModuleAlias(alias, modulePath) {
    const moduleName = path.parse(modulePath).name;

    if (!moduleName.endsWith(FBT_ENUM_MODULE_SUFFIX)) {
      return;
    }

    fbtEnumMapping[alias] = moduleName;
  }
  /**
   * Returns the Fbt enum module name for a given variable name (if any)
   */


  getModuleName(name) {
    return fbtEnumMapping[name];
  }
  /**
   * Returns the Fbt enum module name for a given variable name (if any)
   */


  getEnum(variableName) {
    const moduleName = this.getModuleName(variableName);
    return enumManifest != null && moduleName != null ? enumManifest[moduleName] : null;
  }
  /**
   * Processes a `require(...)` call and registers the fbt enum if applicable.
   * @param path Babel path of a `require(...)` call expression
   */


  registerRequireIfApplicable(path) {
    const {
      node
    } = path;
    const firstArgument = node.arguments[0];

    if (firstArgument.type !== 'StringLiteral') {
      return;
    }

    const modulePath = firstArgument.value; // $FlowFixMe Need to check that parent path exists and that the node is correct

    const alias = path.parentPath.node.id.name;
    this.setModuleAlias(alias, modulePath);
  }
  /**
   * Processes a `import ... from '...';` statement and registers the fbt enum
   * if applicable.
   *
   * We only support the following top level import styles:
   *   - `import anEnum from 'Some$FbtEnum';`
   *   - `import * as aEnum from 'Some$FbtEnum';`
   *
   * @param path Babel path of a `import` statement
   */


  registerImportIfApplicable(path) {
    const {
      node
    } = path;

    if (node.specifiers.length > 1) {
      return;
    }

    const specifier = node.specifiers[0];

    if (t.isImportDefaultSpecifier(specifier) || t.isImportNamespaceSpecifier(specifier)) {
      const alias = specifier.local.name;
      const modulePath = node.source.value;
      this.setModuleAlias(alias, modulePath);
    }
  }

}

module.exports = new FbtEnumRegistrar();