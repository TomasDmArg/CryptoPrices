"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _card = _interopRequireDefault(require("./card.js"));

var _currency = _interopRequireDefault(require("./html/currency.js"));

var _askForDolars = require("./askForDolars.js");

var _search = _interopRequireDefault(require("./search.js"));

var _theme = require("./theme.js");

var _selector = require("./selector.js");

var _businessMain = _interopRequireDefault(require("./businessMain.js"));

var _cookie = require("./cookie.js");

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
    key: "setActive",
    value: function setActive(index) {
      // Set a button as active
      var element = (0, _selector.$$)('#nav__container > li');
      element.forEach(function (el) {
        // Remove class if exist
        el.classList.remove('active');
        el.style.color = '#eee';
      });
      element[index].classList.add('active');
    }
  }, {
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
      var _this = this;

      document.title = "CryptoPrices";
      history.pushState({}, 'This works fine', url);

      if (index === 1) {
        this.pricesState++; // this.el.innerHTML = this.routes[index].template;

        (0, _card["default"])();
        (0, _search["default"])(); // matchColors();
      }

      this.el.innerHTML = this.routes[index].template;
      (0, _theme.matchColors)();

      if ((0, _selector.$$)('#seemoredollar').length == 1) {
        (0, _selector.$)('#seemoredollar').addEventListener('click', function () {
          _this.loadRoute(4, '/#/dolar');

          (0, _askForDolars.askForDollars)();
        });
      }
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
      var _this2 = this;

      var url = this.getUrl();
      var index = url.indexOf('/#/');
      var index2 = url.indexOf('/#c/');
      var mod = url.slice(index);

      if (index2 === -1) {
        switch (mod) {
          case '/#/precios':
            this.loadRoute(1, mod);
            this.setActive(1);
            (0, _selector.$)('#seemoredollar').addEventListener('click', function () {
              _this2.loadRoute(4, '/#/dolar');

              (0, _askForDolars.askForDollars)();
            }); // initCards();

            (0, _search["default"])();
            break;

          case '/#/contacto':
            this.loadRoute(2, mod);
            this.setActive(3);
            (0, _theme.matchColors)();
            break;

          case '/#/negocios':
            this.loadRoute(5, mod);
            this.setActive(2);
            (0, _theme.matchColors)();

            if ((0, _cookie.getCookie)("name") != undefined) {
              this.loadRoute(7, '/#/negocios/dashboard');
              (0, _businessMain["default"])(2);
            }

            (0, _selector.$)('.business__landing--button').addEventListener('click', function () {
              _this2.loadRoute(6, '/#/negocios/crear');
            });
            break;

          case '/#/negocios/crear':
            this.loadRoute(6, mod);
            setActive(2);
            (0, _theme.matchColors)();
            (0, _businessMain["default"])(1);

            if ((0, _cookie.getCookie)("name") != undefined) {
              this.loadRoute(7, '/#/negocios/dashboard');
              (0, _businessMain["default"])(2);
            }

            (0, _selector.$)('.sign-up__form--button').addEventListener('click', function () {
              _this2.loadRoute(7, '/#/negocios/dashboard');

              (0, _businessMain["default"])(2);
            });
            break;

          case '/#/negocios/dashboard':
            this.loadRoute(7, mod);
            (0, _theme.matchColors)();
            (0, _businessMain["default"])(2);
            setActive(2);

            if ((0, _cookie.getCookie)("name") == undefined) {
              this.loadRoute(5, '/#/negocios');
              (0, _businessMain["default"])(1);
            }

            break;

          case '/#/negocios/dashboard/venta':
            this.loadRoute(8, mod);
            (0, _businessMain["default"])(3);
            setActive(2);
            (0, _theme.matchColors)();
            break;

          case '/#/dolar':
            this.loadRoute(4, mod);
            (0, _theme.matchColors)();
            setActive(1);
            (0, _askForDolars.askForDollars)();
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