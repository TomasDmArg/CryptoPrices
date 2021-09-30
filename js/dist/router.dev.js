"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _card = _interopRequireDefault(require("./card.js"));

var _currency = _interopRequireDefault(require("./html/currency.js"));

var _search = _interopRequireDefault(require("./search.js"));

var _theme = require("./theme.js");

var _selector = require("./selector.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Router =
/*#__PURE__*/
function () {
  function Router(routes) {
    _classCallCheck(this, Router);

    this.routes = routes;
    this.el = document.querySelectorAll("[data-router]")[0];
    this.pricesState = 0;
  }

  _createClass(Router, [{
    key: "getUrl",
    value: function getUrl() {
      return window.location.href;
    }
  }, {
    key: "notFound",
    value: function notFound() {
      this.el.innerHTML = 'Not found err 404';
    }
  }, {
    key: "loadRoute",
    value: function loadRoute(index, url) {
      document.title = "CryptoPrices";
      history.pushState({}, 'This works fine', url);

      if (index === 1) {
        if (this.pricesState >= 1) {
          this.el.innerHTML = this.routes[index].template;
          (0, _card["default"])();
          (0, _search["default"])();
          (0, _theme.matchColors)();
        }

        this.pricesState++;
        this.el.innerHTML = this.routes[index].template;
        (0, _card["default"])();
        (0, _search["default"])();
        (0, _theme.matchColors)();
      }

      this.el.innerHTML = this.routes[index].template;
      (0, _theme.matchColors)();
    }
  }, {
    key: "loadCryptoIndividual",
    value: function loadCryptoIndividual(url) {
      history.pushState({}, 'This works fine', url);
      (0, _currency["default"])(url);
      (0, _theme.matchColors)();
    }
  }, {
    key: "loadPage",
    value: function loadPage() {
      var url = this.getUrl();
      var index = url.indexOf('/#/');
      var index2 = url.indexOf('/#c/');
      var mod = url.slice(index);

      if (index2 === -1) {
        switch (mod) {
          case '/#/precios':
            this.loadRoute(1, mod); // initCards();

            (0, _search["default"])();
            break;

          case '/#/contacto':
            this.loadRoute(2, mod);
            (0, _theme.matchColors)();
            break;

          case '/#/dolar':
            this.loadRoute(4, mod);
            (0, _theme.matchColors)();
            break;

          case '/':
            this.loadRoute(0, mod);
            (0, _theme.matchColors)();
            break;

          case '/#/':
            this.loadRoute(0, mod);
            (0, _theme.matchColors)();
            break;

          case '/#':
            this.loadRoute(0, mod);
            (0, _theme.matchColors)();
            break;

          default:
            this.loadRoute(3, "/#/not-found");
            (0, _theme.matchColors)();
            break;
        }
      } else {
        mod = url.slice(index2);
        this.loadCryptoIndividual(mod);
      }
    }
  }]);

  return Router;
}();

var _default = Router;
exports["default"] = _default;