/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */

/* eslint max-len: ["warn", 120] */
const {
  packagerTypes
} = require('./collectFbtConstants');

const FbtCollector = require('./FbtCollector');

const PhrasePackager = require('./PhrasePackager');

const TextPackager = require('./TextPackager');

const invariant = require('invariant');

const path = require('path');

function buildCollectFbtOutput(fbtCollector, packagers, options) {
  return {
    phrases: packagers.reduce((phrases, packager) => packager.pack(phrases), fbtCollector.getPhrases()).map(phrase => ({ ...phrase,
      // using `undefined` so that the field is not outputted by JSON.stringify
      jsfbt: options.terse ? undefined : phrase.jsfbt
    })),
    childParentMappings: fbtCollector.getChildParentMappings(),
    fbtElementNodes: options.genFbtNodes ? fbtCollector.getFbtElementNodes() : // using `undefined` so that the field is not outputted by JSON.stringify
    undefined
  };
}

function getTextPackager(hashModulePath) {
  // $FlowExpectedError[unsupported-syntax] Requiring dynamic module
  const hashingModule = require(hashModulePath);

  !(typeof hashingModule === 'function' || typeof hashingModule === 'object' && typeof hashingModule.getFbtHash === 'function') ? process.env.NODE_ENV !== "production" ? invariant(false, 'Expected hashing module to expose a default value that is a function, ' + 'or an object with a getFbtHash() function property. Hashing module location: `%s`', hashingModule) : invariant(false) : void 0;
  return new TextPackager(typeof hashingModule === 'function' ? hashingModule : hashingModule.getFbtHash);
}

function getPackagers(packager, hashModulePath) {
  switch (packager) {
    case packagerTypes.TEXT:
      return [getTextPackager(hashModulePath)];

    case packagerTypes.PHRASE:
      return [new PhrasePackager()];

    case packagerTypes.BOTH:
      return [getTextPackager(hashModulePath), new PhrasePackager()];

    case packagerTypes.NONE:
      return [{
        pack: phrases => phrases
      }];

    default:
      throw new Error('Unrecognized packager option');
  }
}

function getFbtCollector(collectorConfig, extraOptions, customCollectorPath) {
  if (customCollectorPath == null) {
    return new FbtCollector(collectorConfig, extraOptions);
  }

  const absPath = path.isAbsolute(customCollectorPath) ? customCollectorPath : path.resolve(process.cwd(), customCollectorPath); // $FlowExpectedError[unsupported-syntax] Need to import custom module

  const CustomCollector = require(absPath);

  return new CustomCollector(collectorConfig, extraOptions);
}

module.exports = {
  buildCollectFbtOutput,
  getFbtCollector,
  getPackagers
};