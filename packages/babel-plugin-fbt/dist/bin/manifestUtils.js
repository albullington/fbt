/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
'use strict';

const {
  FBT_ENUM_MODULE_SUFFIX: ENUM_FILE,
  ModuleNameRegExp
} = require('../FbtConstants');

const fs = require('fs'); // $FlowFixMe[untyped-import]


const glob = require('glob');

const invariant = require('invariant');

const path = require('path');

const FILE_EXT = '.@(js|jsx|ts|tsx)';

function generateManifest(enumManifestPath, srcPaths, cwd = process.cwd()) {
  // Register babel-plugins with node to enable parsing flow types, etc.
  // $FlowFixMe[untyped-import]
  require('@babel/register')({
    // Ensure babel resolves paths relative to our package directory so the
    // plugins can always be resolved to this node_modules directory.
    cwd: path.resolve(__dirname, '../'),
    plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/plugin-transform-flow-strip-types', '@babel/plugin-transform-modules-commonjs']
  }); // Find enum files


  const enumManifest = {};

  for (const src of srcPaths) {
    const enumFiles = glob.sync(path.resolve(cwd, src) + '/**/*' + ENUM_FILE + FILE_EXT, {
      nodir: true
    });

    for (const filepath of enumFiles) {
      // Infer module name from filename.
      const name = path.parse(filepath).name; // $FlowExpectedError[unsupported-syntax]

      const obj = require(path.resolve(filepath));

      const enumValue = obj.__esModule ? obj.default : obj;
      !(enumValue != null) ? process.env.NODE_ENV !== "production" ? invariant(false, 'No valid enum found for `%s`, ensure you are exporting your enum ' + 'via `module.exports = { ... };` or `export default { ... };`', name) : invariant(false) : void 0;
      enumManifest[name] = enumValue;
    }
  } // Find source files that are fbt-containing candidates


  const getFiles = src => glob.sync(path.resolve(cwd, src) + '/**/*' + FILE_EXT, {
    nodir: true
  });

  const srcFiles = [].concat(...srcPaths.map(getFiles)).filter(filepath => fs.readFileSync(filepath).toString('utf8').split('\n').some(line => ModuleNameRegExp.test(line))).map(filepath => path.relative(cwd, filepath));
  return {
    enumManifest,
    srcManifest: {
      [enumManifestPath]: srcFiles
    }
  };
}

module.exports = {
  generateManifest
};