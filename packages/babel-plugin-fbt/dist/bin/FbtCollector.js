/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @noformat
 * 
 * @emails oncall+i18n_fbt_js
 * @generated
 * @nogrep
 */

/* eslint max-len: ["warn", 120] */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  extractEnumsAndFlattenPhrases
} = require('../FbtShiftEnums');

const FbtUtil = require('../FbtUtil');

const fbt = require('../index');

const fs = require('graceful-fs');

class FbtCollector {
  constructor(config, extraOptions) {
    _defineProperty(this, "_phrases", void 0);

    _defineProperty(this, "_errors", void 0);

    _defineProperty(this, "_extraOptions", void 0);

    _defineProperty(this, "_config", void 0);

    this._phrases = [];
    this._errors = {};
    this._extraOptions = extraOptions;
    this._config = config;
  }

  collectFromOneFile(source, filename, fbtEnumManifest) {
    const options = {
      collectFbt: true,
      extraOptions: this._extraOptions,
      fbtCommonPath: this._config.fbtCommonPath,
      fbtEnumManifest,
      fbtModule: fbt,
      filename,
      generateOuterTokenName: this._config.generateOuterTokenName,
      reactNativeMode: this._config.reactNativeMode
    };

    if (!FbtUtil.textContainsFbtLikeModule(source)) {
      return;
    }

    const externalTransform = this._config.transform;

    if (externalTransform) {
      externalTransform(source, options, filename);
    } else {
      const transform = require('@fbtjs/default-collection-transform');

      transform(source, options, this._config.plugins || [], this._config.presets || []);
    }

    let newPhrases = fbt.getExtractedStrings();

    if (this._config.reactNativeMode) {
      newPhrases = extractEnumsAndFlattenPhrases(newPhrases);
    } // PackagerPhrase is an extended type of Phrase
    // $FlowExpectedError[prop-missing] ignore missing hashToLeaf issue


    this._phrases.push(...newPhrases);
  }

  collectFromFiles(files, fbtEnumManifest) {
    let hasFailure = false;
    files.forEach(file => {
      try {
        const source = fs.readFileSync(file, 'utf8');
        this.collectFromOneFile(source, file, fbtEnumManifest);
      } catch (e) {
        this._errors[file] = e;
        hasFailure = true;
      }
    });
    return !hasFailure;
  }

  getPhrases() {
    return this._phrases;
  }

  getChildParentMappings() {
    return fbt.getChildToParentRelationships();
  }

  getErrors() {
    return this._errors;
  }

  getFbtElementNodes() {
    return fbt.getFbtElementNodes();
  }

}

module.exports = FbtCollector;