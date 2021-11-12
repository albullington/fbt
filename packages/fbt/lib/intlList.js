/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * 
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 * 
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p intl
 * 
 * Renders a list of items, similar to :fbt:large-list / :intl:large-list. This
 * is similar to doing .join(', ') but is culturally-aware (uses fbt calls) and
 * by default prepends a conjunction ("and" or "or") to the final item. This
 * conjunction is optional.
 *
 * @fbt {"project": "intl-core"}
 * @typechecks
 * @emails oncall+i18n_fbt_js
 * @generated
 * @noformat
 * @nogrep
 */
// flowlint ambiguous-object-type:error
'use strict';

var fbt = require("./fbt");

var invariant = require("invariant");

var React = require("./react");

var CONJUNCTIONS = {
  AND: 'AND',
  NONE: 'NONE',
  OR: 'OR'
};
var DELIMITERS = {
  BULLET: 'BULLET',
  COMMA: 'COMMA',
  SEMICOLON: 'SEMICOLON'
};

var intlList = function intlList(items, conjunction, delimiter) {
  if (process.env.NODE_ENV !== "production") {
    items.forEach(function (item) {
      !(typeof item === 'string' || React.isValidElement(item)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'Must provide a string or ReactComponent to intlList.') : invariant(false) : void 0;
    });
  }

  var count = items.length;

  if (count === 0) {
    return '';
  } else if (count === 1) {
    return items[0];
  }

  var lastItem = items[count - 1];
  var output = items[0];

  for (var i = 1; i < count - 1; ++i) {
    switch (delimiter) {
      case DELIMITERS.SEMICOLON:
        output = fbt._("{previous items}; {following items}", [fbt._param("previous items", output), fbt._param("following items", items[i])], {
          hk: "2Qg7K"
        });
        break;

      case DELIMITERS.BULLET:
        output = fbt._("{previous items} • {following items}", [fbt._param("previous items", output), fbt._param("following items", items[i])], {
          hk: "4j1FRr"
        });
        break;

      default:
        output = fbt._("{previous items}, {following items}", [fbt._param("previous items", output), fbt._param("following items", items[i])], {
          hk: "7PhKg"
        });
    }
  }

  return _getConjunction(output, lastItem, conjunction || CONJUNCTIONS.AND, delimiter || DELIMITERS.COMMA);
};

function _getConjunction(list, lastItem, conjunction, delimiter) {
  switch (conjunction) {
    case CONJUNCTIONS.AND:
      return fbt._("{list of items} and {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
        hk: "3NhpUD"
      });

    case CONJUNCTIONS.OR:
      return fbt._("{list of items} or {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
        hk: "4hYuOb"
      });

    case CONJUNCTIONS.NONE:
      switch (delimiter) {
        case DELIMITERS.SEMICOLON:
          return fbt._("{previous items}; {last item}", [fbt._param("previous items", list), fbt._param("last item", lastItem)], {
            hk: "20W5jc"
          });

        case DELIMITERS.BULLET:
          return fbt._("{list of items} • {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
            hk: "2Bd2TZ"
          });

        default:
          return fbt._("{list of items}, {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
            hk: "3oKMJG"
          });
      }

    default:
      !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'Invalid conjunction %s provided to intlList', conjunction) : invariant(false) : void 0;
  }
}

intlList.DELIMITERS = DELIMITERS;
intlList.CONJUNCTIONS = CONJUNCTIONS;
module.exports = intlList;