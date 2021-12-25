"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _search = _interopRequireDefault(require("./search.js"));

var _businessMain = _interopRequireDefault(require("./businessMain.js"));

var _index = _interopRequireDefault(require("./index.js"));

var _cookie = require("./cookie.js");

var _landing = require("./landing.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var contactHTML = (0, _selector.$)('#contact-cont');

var initLoad = function initLoad() {
  var Page =
  /*#__PURE__*/
  function () {
    function Page(toggle, url, index) {
      _classCallCheck(this, Page);

      this.toggle = toggle;
      this.url = url;
      this.index = index;
      this.state = 0;
    }

    _createClass(Page, [{
      key: "load",
      value: function load() {
        _index["default"].loadRoute(this.index, this.url);

        (0, _selector.$)('.load-container').style.display = 'block';
        (0, _selector.$)('.load-container').style.animationName = 'load-cont';
        setInterval(function () {
          (0, _selector.$)('.load-container').style.animationName = 'unload-cont';
          (0, _selector.$)('.load-container').style.animationIterationCount = '1';
          setInterval(function () {
            (0, _selector.$)('.load-container').style.display = 'none';
          }, 500);
        }, 1000);
      }
    }, {
      key: "activeButton",
      value: function activeButton() {
        this.toggle.setAttribute('class', 'nav__container--item active');
        this.state = 1;
      }
    }, {
      key: "disableButton",
      value: function disableButton() {
        this.toggle.setAttribute('class', 'nav__container--item');
        this.state = 0;
      } //SetTo des-selecciona el resto de botones de la barra de navegacion

    }, {
      key: "setTo",
      value: function setTo(selected) {
        for (var i = 0; i < (0, _selector.$$)('.nav__container--item').length; i++) {
          if (i != selected) {
            var el = (0, _selector.$$)('.nav__container--item')[i];
            el.style.backgroundColor = "var(--dark)";
            el.setAttribute('class', 'nav__container--item');
            el.style.color = "var(--light)";
          } else {
            (0, _selector.$$)('.nav__container--item')[i].style.backgroundColor = "var(--principal-green)";
            (0, _selector.$$)('.nav__container--item')[i].style.color = "var(--dark)";
          }
        }
      }
    }, {
      key: "enableToggle",
      value: function enableToggle() {
        var _this = this;

        this.toggle.addEventListener('click', function () {
          _this.load();

          _this.activeButton();

          switch (_this.index) {
            //Id: Nro de elemento del array de botones
            //Botón Home Id:0
            case 0:
              _this.setTo(0); //Botón de ver mas en el home/landing


              var seePrices = new Page((0, _selector.$)('.main__content--button'), '/#/precios', 1);
              seePrices.enableToggle();
              break;
            //Botón Precios Id:1

            case 1:
              _this.setTo(1);

              (0, _search["default"])();
              break;
            //Botón Contacto Id:3

            case 2:
              _this.setTo(3);

              break;
            //Botón Negocios (Main) Id:2

            case 5:
              if ((0, _cookie.getCookie)("name") != undefined) {
                _index["default"].loadRoute(7, '/#/negocios/dashboard');

                (0, _businessMain["default"])(2);
              } else {
                _this.setTo(2);

                var createAcc = new Page((0, _selector.$)('.business__landing--button'), '/#/negocios/crear', 6);
                createAcc.enableToggle();
              }

              break;
            //Botón Negocios (Crear) Id:2

            case 6:
              if ((0, _cookie.getCookie)("name") != undefined) {
                _index["default"].loadRoute(7, '/#/negocios/dashboard');

                (0, _businessMain["default"])(2);
              } else {
                _this.setTo(2);

                (0, _businessMain["default"])(1);
                var dashboard = new Page((0, _selector.$)('.sign-up__form--button'), '/#/negocios/dashboard', 7);
                dashboard.enableToggle();
              }

              break;

            case 7:
              if ((0, _cookie.getCookie)("name") == undefined) {
                _index["default"].loadRoute(5, '/#/negocios');
              } else {
                _this.setTo(2);

                (0, _businessMain["default"])(2);
                var nwInvoice = new Page((0, _selector.$)('.bs-dashboard__new-invoice--create'), '/#/negocios/dashboard/venta', 8);
                nwInvoice.enableToggle();
              }

              break;
          }
        });
      }
    }]);

    return Page;
  }();

  var contactPage = new Page((0, _selector.$)('#contact'), '/#/contacto', 2);
  var home = new Page((0, _selector.$)('#home'), '/#/', 0);
  var pricesPage = new Page((0, _selector.$)('#prices'), '/#/precios', 1);
  var businessPage = new Page((0, _selector.$)('#business'), '/#/negocios', 5);

  if ((0, _selector.$$)('.main__content--button').length === 1) {
    (0, _landing.program)();
    var seePrices = new Page((0, _selector.$)('.main__content--button'), '/#/precios', 1);
    seePrices.enableToggle();
  }

  contactPage.enableToggle();
  pricesPage.enableToggle();
  home.enableToggle();
  businessPage.enableToggle(); // seePrices.enableToggle();
};

var _default = initLoad;
exports["default"] = _default;