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

var DEFAULT_CONFIG = {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 0,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
};
var DEFAULT_LOCALE = 'en_US';
var configs = [{
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}, {
  decimalSeparator: ',',
  numberDelimiter: "\xA0",
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}, {
  decimalSeparator: "\u066B",
  numberDelimiter: "\u066C",
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: {
    digits: "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"
  }
}, {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 2
  },
  numberingSystemData: {
    digits: "\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF"
  }
}, {
  decimalSeparator: ',',
  numberDelimiter: '.',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}, {
  decimalSeparator: ',',
  numberDelimiter: "\xA0",
  minDigitsForThousandsSeparator: 5,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}, {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 2
  },
  numberingSystemData: null
}, {
  decimalSeparator: ',',
  numberDelimiter: '.',
  minDigitsForThousandsSeparator: 5,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}, {
  decimalSeparator: "\u066B",
  numberDelimiter: "\u066C",
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: {
    digits: "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9"
  }
}, {
  decimalSeparator: "\u066B",
  numberDelimiter: "\u066C",
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 2
  },
  numberingSystemData: {
    digits: "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9"
  }
}, {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 2
  },
  numberingSystemData: {
    digits: "\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F"
  }
}, {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: {
    digits: "\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049"
  }
}, {
  decimalSeparator: '.',
  numberDelimiter: ',',
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: {
    digits: "\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F"
  }
}, {
  decimalSeparator: '.',
  numberDelimiter: "\u2019",
  minDigitsForThousandsSeparator: 4,
  standardDecimalPatternInfo: {
    primaryGroupSize: 3,
    secondaryGroupSize: 3
  },
  numberingSystemData: null
}];
var localeToIdx = {
  en_US: 0,
  af_ZA: 1,
  ak_GH: 0,
  am_ET: 0,
  ar_AR: 2,
  as_IN: 3,
  ay_BO: 0,
  az_AZ: 4,
  be_BY: 5,
  bg_BG: 5,
  bn_IN: 6,
  bp_IN: 0,
  br_FR: 1,
  bs_BA: 4,
  bv_DE: 0,
  ca_ES: 5,
  cb_IQ: 2,
  ck_US: 0,
  co_FR: 0,
  cs_CZ: 1,
  cx_PH: 0,
  cy_GB: 0,
  da_DK: 7,
  de_DE: 4,
  eh_IN: 0,
  el_GR: 4,
  em_ZM: 0,
  en_GB: 0,
  en_IN: 6,
  en_OP: 0,
  en_PI: 0,
  en_UD: 0,
  eo_EO: 1,
  es_CL: 4,
  es_CO: 4,
  es_ES: 5,
  es_LA: 4,
  es_MX: 0,
  es_VE: 4,
  et_EE: 5,
  eu_ES: 4,
  fa_IR: 8,
  fb_AA: 0,
  fb_AC: 0,
  fb_AR: 2,
  fb_HA: 0,
  fb_HX: 0,
  fb_LL: 0,
  fb_LS: 0,
  fb_LT: 0,
  fb_RL: 0,
  fb_ZH: 0,
  fbt_AC: 0,
  ff_NG: 1,
  fi_FI: 1,
  fn_IT: 0,
  fo_FO: 4,
  fr_CA: 1,
  fr_FR: 1,
  fv_NG: 0,
  fy_NL: 4,
  ga_IE: 0,
  gl_ES: 4,
  gn_PY: 4,
  gu_IN: 6,
  gx_GR: 0,
  ha_NG: 0,
  he_IL: 0,
  hi_FB: 6,
  hi_IN: 6,
  hr_HR: 7,
  ht_HT: 0,
  hu_HU: 5,
  hy_AM: 1,
  id_ID: 4,
  ig_NG: 0,
  ik_US: 0,
  is_IS: 4,
  it_IT: 7,
  iu_CA: 0,
  ja_JP: 0,
  ja_KS: 0,
  jv_ID: 0,
  ka_GE: 5,
  kk_KZ: 1,
  km_KH: 4,
  kn_IN: 0,
  ko_KR: 0,
  ks_IN: 9,
  ku_TR: 0,
  ky_KG: 1,
  la_VA: 0,
  lg_UG: 0,
  li_NL: 0,
  ln_CD: 4,
  lo_LA: 4,
  lr_IT: 0,
  lt_LT: 1,
  lv_LV: 5,
  mg_MG: 0,
  mi_NZ: 0,
  mk_MK: 4,
  ml_IN: 6,
  mn_MN: 0,
  mr_IN: 10,
  ms_MY: 0,
  mt_MT: 0,
  my_MM: 11,
  nb_NO: 1,
  nd_ZW: 0,
  ne_NP: 12,
  nh_MX: 0,
  nl_BE: 4,
  nl_NL: 4,
  nn_NO: 1,
  nr_ZA: 0,
  ns_ZA: 0,
  ny_MW: 0,
  om_ET: 0,
  or_IN: 6,
  pa_IN: 6,
  pl_PL: 5,
  ps_AF: 8,
  pt_BR: 4,
  pt_PT: 5,
  qb_DE: 0,
  qc_GT: 0,
  qe_US: 0,
  qk_DZ: 0,
  qr_GR: 0,
  qs_DE: 0,
  qt_US: 0,
  qu_PE: 0,
  qv_IT: 0,
  qz_MM: 11,
  rm_CH: 13,
  ro_RO: 4,
  ru_RU: 1,
  rw_RW: 4,
  sa_IN: 0,
  sc_IT: 0,
  se_NO: 1,
  si_LK: 0,
  sk_SK: 1,
  sl_SI: 4,
  sn_ZW: 0,
  so_SO: 0,
  sq_AL: 1,
  sr_RS: 4,
  ss_SZ: 0,
  st_ZA: 0,
  su_ID: 0,
  sv_SE: 1,
  sw_KE: 0,
  sy_SY: 0,
  sz_PL: 0,
  ta_IN: 6,
  te_IN: 6,
  tg_TJ: 0,
  th_TH: 0,
  tk_TM: 1,
  tl_PH: 0,
  tl_ST: 0,
  tn_BW: 0,
  tq_AR: 0,
  tr_TR: 4,
  ts_ZA: 0,
  tt_RU: 1,
  tz_MA: 1,
  uk_UA: 1,
  ur_PK: 0,
  uz_UZ: 1,
  ve_ZA: 0,
  vi_VN: 4,
  wo_SN: 4,
  xh_ZA: 0,
  yi_DE: 0,
  yo_NG: 0,
  zh_CN: 0,
  zh_HK: 0,
  zh_TW: 0,
  zu_ZA: 0,
  zz_TR: 0
};
var NumberFormatConsts = {
  get: function get(localeTag) {
    var key = localeTag == null ? DEFAULT_LOCALE : localeTag;
    var idx = localeToIdx[key];
    return idx !== undefined ? configs[idx] : DEFAULT_CONFIG;
  }
};
module.exports = NumberFormatConsts;