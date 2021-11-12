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
  objMap
} = require('../FbtUtil');

const {
  FbtSite
} = require('../translate/FbtSite');

const TranslationBuilder = require('../translate/TranslationBuilder');

const TranslationConfig = require('../translate/TranslationConfig');

const TranslationData = require('../translate/TranslationData');

const fs = require('fs');

const nullthrows = require('nullthrows');

function parseJSONFile(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath).toString());
  } catch (error) {
    error.message += `\nFile path: "${filepath}"`;
    throw error;
  }
}

function processFiles(stringFile, translationFiles, options) {
  const {
    phrases
  } = parseJSONFile(stringFile);
  const fbtSites = phrases.map(createFbtSiteFromJSON);
  const translatedGroups = translationFiles.map(file => {
    const group = parseJSONFile(file);
    return processTranslations(fbtSites, group, options);
  });
  return processGroups(phrases, translatedGroups, options);
}

function processJSON(json, options) {
  const fbtSites = json.phrases.map(createFbtSiteFromJSON);
  return processGroups(json.phrases, json.translationGroups.map(group => processTranslations(fbtSites, group, options)), options);
}

function processGroups(phrases, translatedGroups, options) {
  let fbtHash = null;

  if (options.jenkins) {
    fbtHash = require('../fbtHashKey');
  } else if (options.hashModule !== false) {
    // $FlowExpectedError[unsupported-syntax] Requiring dynamic module
    fbtHash = require(options.hashModule);
  }

  if (!fbtHash) {
    return translatedGroups;
  }

  const localeToHashToFbt = {};

  for (const group of translatedGroups) {
    const hashToFbt = localeToHashToFbt[group['fb-locale']] = {};
    phrases.forEach((phrase, idx) => {
      const translatedFbt = group.translatedPhrases[idx];
      const jsfbt = nullthrows(phrase.jsfbt, `Expect every phrase to have 'jsfbt' field. However, 'jsfbt' is missing in the phrase at index ${idx}.`);
      const hash = nullthrows(fbtHash)(jsfbt.t);
      hashToFbt[hash] = translatedFbt;
    });
  }

  return localeToHashToFbt;
}

function checkAndFilterTranslations(locale, translations, options) {
  const filteredTranslations = {};

  for (const hash in translations) {
    if (translations[hash] == null) {
      const message = `Missing ${locale} translation for string (${hash})`;

      if (options.strict) {
        const err = new Error(message);
        err.stack;
        throw err;
      } else {
        process.stderr.write(`${message}\n`);
      }
    } else {
      filteredTranslations[hash] = translations[hash];
    }
  }

  return filteredTranslations;
}

function processTranslations(fbtSites, group, options) {
  const config = TranslationConfig.fromFBLocale(group['fb-locale']);
  const filteredTranslations = checkAndFilterTranslations(group['fb-locale'], group.translations, options);
  const translations = objMap(filteredTranslations, TranslationData.fromJSON);
  const translatedPhrases = fbtSites.map(fbtsite => new TranslationBuilder(translations, config, fbtsite, false).build());
  return {
    'fb-locale': group['fb-locale'],
    translatedPhrases
  };
}

function createFbtSiteFromJSON(json) {
  return FbtSite.fromScan(json);
}

module.exports = {
  processFiles,
  processJSON
};