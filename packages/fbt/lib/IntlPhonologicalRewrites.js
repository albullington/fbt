/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated
 * @emails oncall+i18n_fbt_js
 * @noformat
 * @nogrep
 */
// flowlint implicit-inexact-object:error
'use strict';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REWRITES = {
  en_GB: {
    meta: {},
    patterns: {
      "/\x01(.*)('|&#039;)s\x01(?:'|&#039;)s(.*)/": "\x01$1$2s\x01$3"
    }
  },
  en_IN: {
    meta: {},
    patterns: {
      "/\x01(.*)('|&#039;)s\x01(?:'|&#039;)s(.*)/": "\x01$1$2s\x01$3"
    }
  },
  en_PI: {
    meta: {},
    patterns: {
      "/\x01(.*)('|&#039;)s\x01(?:'|&#039;)s(.*)/": "\x01$1$2s\x01$3"
    }
  },
  en_US: {
    meta: {},
    patterns: {
      "/\x01(.*)('|&#039;)s\x01(?:'|&#039;)s(.*)/": "\x01$1$2s\x01$3"
    }
  },
  tr_TR: {
    meta: {
      '/_C/': "(\u015F|\xE7|b|c|d|f|g|\u011F|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z|B|C|D|F|G|\u011E|H|J|K|L|M|N|P|Q|R|S|T|V|W|X|Y|Z)",
      '/_T/': "(\u015F|\xE7|p|t|k|s)",
      '/_V/': "(a|e|i|o|u|A|E|I|O|U|\xE4|\xF6|y|\xC4|\xD6|Y)"
    },
    patterns: {
      '/&#039;/': "'",
      "/(\u2018|\u2019)/": "'",
      "/((a|\u0131|A|I|u|o|U|O)_C*)\x01 de\\/da_E/": "$1\x01 da$4",
      "/((e|i|E|\u0130|\xF6|\xFC|\xD6|\xDC)_C*)\x01 de\\/da_E/": "$1\x01 de$4",
      "/((a|\u0131|A|I|u|o|U|O)_C*_T)\x01'Da(ki|n|)_E/": "$1\x01'ta$5$6",
      "/((e|i|E|\u0130|\xF6|\xFC|\xD6|\xDC)_C*_T)\x01'Da(ki|n|)_E/": "$1\x01'te$5$6",
      "/((a|\u0131|A|I|u|o|U|O)_C*)\x01'Da(ki|n|)_E/": "$1\x01'da$4$5",
      "/((e|i|E|\u0130|\xF6|\xFC|\xD6|\xDC)_C*)\x01'Da(ki|n|)_E/": "$1\x01'de$4$5",
      "/(e|i|E|\u0130)\x01'\\(n\\)in_E/": "$1\x01'nin$2",
      "/(a|\u0131|A|I)\x01'\\(n\\)in_E/": "$1\x01'n\u0131n$2",
      "/(\xF6|\xFC|\xD6|\xDC)\x01'\\(n\\)in_E/": "$1\x01'n\xFCn$2",
      "/([uoUO])\x01'\\(n\\)in_E/": "$1\x01'nun$2",
      "/(_Cy)\x01'\\(n\\)in_E/": "$1\x01'nin$3",
      "/((e|i|E|\u0130)_C+)\x01'\\(n\\)in_E/": "$1\x01'in$4",
      "/((a|\u0131|A|I)_C+)\x01'\\(n\\)in_E/": "$1\x01'\u0131n$4",
      "/((\xF6|\xFC|\xD6|\xDC)_C+)\x01'\\(n\\)in_E/": "$1\x01'\xFCn$4",
      "/([uoUO]_C+)\x01'\\(n\\)in_E/": "$1\x01'un$3",
      "/(e|i|E|\u0130)\x01'\\(y\\)e_E/": "$1\x01'ye$2",
      "/(a|\u0131|A|I)\x01'\\(y\\)e_E/": "$1\x01'ya$2",
      "/(\xF6|\xFC|\xD6|\xDC)\x01'\\(y\\)e_E/": "$1\x01'ye$2",
      "/([uoUO])\x01'\\(y\\)e_E/": "$1\x01'ya$2",
      "/(_Cy)\x01'\\(y\\)e_E/": "$1\x01'ye$3",
      "/((e|i|E|\u0130)_C+)\x01'\\(y\\)e_E/": "$1\x01'e$4",
      "/((a|\u0131|A|I)_C+)\x01'\\(y\\)e_E/": "$1\x01'a$4",
      "/((\xF6|\xFC|\xD6|\xDC)_C+)\x01'\\(y\\)e_E/": "$1\x01'e$4",
      "/([uoUO]_C+)\x01'\\(y\\)e_E/": "$1\x01'a$3",
      "/(e|i|E|\u0130)\x01'\\(y\\)i_E/": "$1\x01'yi$2",
      "/(a|\u0131|A|I)\x01'\\(y\\)i_E/": "$1\x01'y\u0131$2",
      "/(\xF6|\xFC|\xD6|\xDC)\x01'\\(y\\)i_E/": "$1\x01'y\xFC$2",
      "/([uoUO])\x01'\\(y\\)i_E/": "$1\x01'yu$2",
      "/(_Cy)\x01'\\(y\\)i_E/": "$1\x01'yi$3",
      "/((e|i|E|\u0130)_C+)\x01'\\(y\\)i_E/": "$1\x01'i$4",
      "/((a|\u0131|A|I)_C+)\x01'\\(y\\)i_E/": "$1\x01'\u0131$4",
      "/((\xF6|\xFC|\xD6|\xDC)_C+)\x01'\\(y\\)i_E/": "$1\x01'\xFC$4",
      "/([uoUO]_C+)\x01'\\(y\\)i_E/": "$1\x01'u$3",
      "/\x01'Da(ki|n|)_E/": "\x01'da$1$2",
      "/\x01'\\(n\\)in_E/": "\x01'in$1",
      "/\x01'\\(y\\)e_E/": "\x01'e$1",
      "/\x01'\\(y\\)i_E/": "\x01'i$1",
      "/\x01 de\\/da_E/": "\x01 de$1"
    }
  },
  sv_SE: {
    meta: {},
    patterns: {
      "/([szx])\x01s_E/": "$1\x01$2"
    }
  },
  de_DE: {
    meta: {},
    patterns: {
      "/(\xDF|s|z|x)\x01s_E/": "$1\x01$2"
    }
  },
  nb_NO: {
    meta: {},
    patterns: {
      "/([szx])\x01s_E/": "$1\x01'$2"
    }
  },
  da_DK: {
    meta: {
      '/_U/': "(\xD8|\xC5|\xC6)"
    },
    patterns: {
      "/([szxSZX])\x01s_E/": "$1\x01'$2",
      "/([A-Z]|[0-9]|_U)\x01s_E/": "$1\x01's$3"
    }
  },
  ar_AR: {
    meta: {
      '/_RTL/': "(([\u0590-\u05BF]|[\u05C0-\u07FF]))",
      '/_Delim/': "(\x01\u200F)"
    },
    patterns: {
      "/\u0629_Delim_RTL/": "\u062A\x01$2",
      '/_RTL_Delim(\\s*)_RTL/': "$1\x01$4$5"
    }
  },
  ca_ES: {
    meta: {
      '/_C/': '[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z|B|C|D|F|G|H|J|K|L|M|N|P|Q|R|S|T|V|W|X|Y|Z]',
      '/_V/': '[a|e|i|o|u|A|E|I|O|U]'
    },
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    },
    male: {
      "/(.)\x01(_C.*)\x01/": "$1\x05el $2\x01",
      "/(.)\x01(_V.*)\x01/": "$1\x05l'$2\x01",
      "/^\x01(_C.*)\x01/": "\x05El $1\x01",
      "/^\x01(_V.*)\x01/": "\x05L'$1\x01"
    },
    female: {
      "/(.)\x01(_C.*)\x01/": "$1\x05la $2\x01",
      "/(.)\x01(_V.*)\x01/": "$1\x05l'$2\x01",
      "/^\x01(_C.*)\x01/": "\x05La $1\x01",
      "/^\x01(_V.*)\x01/": "\x05L'$1\x01"
    },
    unknown: {
      "/(.)\x01(_C.*)\x01/": "$1\x05el $2\x01",
      "/(.)\x01(_V.*)\x01/": "$1\x05l'$2\x01",
      "/^\x01(_C.*)\x01/": "\x05El $1\x01",
      "/^\x01(_V.*)\x01/": "\x05L'$1\x01"
    }
  },
  es_LA: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  es_CL: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  es_CO: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  es_ES: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  es_MX: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  es_VE: {
    meta: {},
    patterns: {
      "/_By \x01([Ii]|[Hh]i[^e])/": "$1e \x01$2",
      "/_Bo \x01([Oo]|[Hh]o)/": "$1u \x01$2"
    }
  },
  sk_SK: {
    meta: {},
    patterns: {
      "/_B(s|z|S|Z) \x01(s|\u0161|z|\u017E|S|\u0160|Z|\u017D)/": "$1$2o \x01$3",
      "/_B(v|V) \x01(f|v|F|V)/": "$1$2o \x01$3",
      "/_B(k|K) \x01(g|k|G|K)/": "$1$2u \x01$3"
    }
  },
  bg_BG: {
    meta: {},
    patterns: {
      "/_B(\u0441|\u0421) \x01(\u0441|\u0421|\u0437|\u0417)/": "$1$2\u044A\u0441 \x01$3",
      "/_B(\u0432|\u0412) \x01(\u0432|\u0412|\u0444|\u0424)/": "$1$2\u044A\u0432 \x01$3"
    }
  },
  fb_HX: {
    meta: {
      '/_C/': "[\u015F|\xE7|b|c|d|f|g|\u011F|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z|B|C|D|F|G|\u011E|H|J|K|L|M|N|P|Q|R|S|T|V|W|X|Y|Z]",
      '/_T/': "[\u015F|\xE7|p|t|k|s]",
      '/_V/': "[a|e|i|o|u|A|E|I|O|U|\xE4|\xF6|y|\xC4|\xD6|Y]"
    },
    patterns: {
      "/_By \x01_C/": "$1i \x01$2",
      "/_By \x01_V/": "$1e \x01$2",
      "/\x01(_C[^\\s]*)\x02\x01/": "el \x01$1\x01",
      "/\x01(_C[^\\s]*)\x03\x01/": "la \x01$1\x01",
      "/\x01(_V[^\\s]*)\x01/": "l'\x01$1\x01"
    }
  }
};
var GLOBAL_REWRITES = {
  meta: {
    '/_B/': '([.,!?\\s]|^)',
    '/_E/': '([.,!?\\s]|$)'
  },
  patterns: {
    "/_\x01([^\x01]*)\x01/": 'javascript'
  }
};
var EMPTY_REWRITES = {
  meta: {},
  patterns: {}
};
var DEFAULT_LOCALE = 'en_US';
var IntlPhonologicalRewrites = {
  get: function get(localeTag) {
    var key = localeTag == null ? DEFAULT_LOCALE : localeTag;
    var rewrites = REWRITES[key] || EMPTY_REWRITES;
    return {
      meta: _objectSpread({}, rewrites.meta, GLOBAL_REWRITES.meta),
      patterns: _objectSpread({}, rewrites.patterns, GLOBAL_REWRITES.patterns)
    };
  }
};
module.exports = IntlPhonologicalRewrites;