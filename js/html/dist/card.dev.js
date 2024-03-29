"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("../selector.js");

var _theme = require("../theme.js");

var counter = 0;

function createCard(name, symbol, price, change, image, id) {
  var currency, mChange, isChangePositive, template;
  return regeneratorRuntime.async(function createCard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currency = "ARS";
          mChange = change.toString();
          isChangePositive = mChange.indexOf("-") === -1;
          template = "\n    <section class=\"card-container ".concat(isChangePositive ? 'b-up' : 'b-down', "\">\n        <section>\n                <section class=\"card__name-container\">\n                    <h2 class=\"card__name-container--title ").concat(isChangePositive ? "up" : "down", "\">").concat(name, "</h2>\n                    <h4 class=\"text\">").concat(symbol, "</h4>\n                </section>\n                <h3 class=\"price \">$").concat(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "</h3>\n                <p class=\"hidden-value\">").concat(price, "</p>\n                <h4 class=\"percent ").concat(isChangePositive ? "up" : "down", "\">").concat(parseFloat(change).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%", "</h4>\n                <section class=\"card-image\">\n                    <img src=\"").concat(image, "\" class=\"card-image-img\" alt=\"\">\n                </section>\n                <section class=\"buttons\">\n                    <a class=\"card-button active seemorebtn\" >Ver mas</a>\n                    <a class=\"card-button-2  convert text\" >Convertir</a>\n                </section>\n                <div class=\"bg\"></div>\n                <h2 class=\"bg-text title\">Convertir ").concat(name, " a <span class=\"currencyLabel\">").concat(currency, "</span></h2>\n                <input type=\"number\" placeholder=\"").concat(symbol, "...\" class=\"converter-input\" />    \n                <p class=\"bg-text value\"><b class=\"value-converted\">0</b><b class=\"converter-curency\">").concat(currency, "</b></p>\n                <img src=\"/assets/close.svg\" alt=\"\" class=\"bg-close\">\n        </section>\n    </section>\n    ");
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _selector.$)('#content').insertAdjacentHTML('beforeend', template));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = createCard;
exports["default"] = _default;