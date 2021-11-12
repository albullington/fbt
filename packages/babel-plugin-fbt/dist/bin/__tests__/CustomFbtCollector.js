/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+i18n_fbt_js
 * 
 * @generated
 * @noformat
 * @nogrep
 */

/* eslint max-len: ["warn", 120] */
'use strict';

const FbtNodeType = require('../../fbt-nodes/FbtNodeType');
/**
 * Dummy fbt collector for testing.
 */


class CustomFbtCollector {
  collectFromOneFile(_source, _filename, _fbtEnumManifest) {}

  collectFromFiles(_files, _fbtEnumManifest) {
    throw new Error('Not implemented');
  }

  getPhrases() {
    return [{
      col_beg: 8,
      col_end: 14,
      filepath: '',
      jsfbt: {
        m: [],
        t: {
          desc: 'description',
          text: 'Hello {=World}!',
          tokenAliases: {}
        }
      },
      line_beg: 3,
      line_end: 5,
      project: ''
    }, {
      col_beg: 16,
      col_end: 38,
      filepath: '',
      jsfbt: {
        m: [],
        t: {
          desc: 'In the phrase: "Hello {=World}!"',
          text: 'World',
          tokenAliases: {},
          outerTokenName: '=World'
        }
      },
      line_beg: 4,
      line_end: 4,
      project: ''
    }];
  }

  getChildParentMappings() {
    return {
      // We need an object keyed by numbers only
      // eslint-disable-next-line no-useless-computed-key
      [1]: 0
    };
  }

  getFbtElementNodes() {
    // $FlowExpectedError[incompatible-type]
    const pseudoJSXOpeningElement = {
      type: 'JSXOpeningElement'
    };
    return [{
      phraseIndex: 0,
      children: [{
        type: FbtNodeType.Text
      }, {
        phraseIndex: 1,
        children: [{
          type: FbtNodeType.Text
        }],
        type: FbtNodeType.ImplicitParam,
        wrapperNode: {
          type: 'a',
          babelNode: pseudoJSXOpeningElement,
          props: {
            className: 'neatoLink',
            href: 'https://somewhere.random',
            tabindex: 123
          }
        }
      }],
      type: FbtNodeType.Element
    }];
  }

  getErrors() {
    return {};
  }

}

module.exports = CustomFbtCollector;