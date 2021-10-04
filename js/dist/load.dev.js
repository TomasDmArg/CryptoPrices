"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _search = _interopRequireDefault(require("./search.js"));

var _index = _interopRequireDefault(require("./index.js"));

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
      }
    }, {
      key: "setTo",
      value: function setTo(ione, itwo) {
        (0, _selector.$$)('.nav__container--item')[ione].setAttribute('class', 'nav__container--item');
        (0, _selector.$$)('.nav__container--item')[ione].style.color = "var(--light)";
        (0, _selector.$$)('.nav__container--item')[ione].style.backgroundColor = "var(--dark)";
        (0, _selector.$$)('.nav__container--item')[itwo].style.backgroundColor = "var(--dark)";
        (0, _selector.$$)('.nav__container--item')[itwo].setAttribute('class', 'nav__container--item');
        (0, _selector.$$)('.nav__container--item')[itwo].style.color = "var(--light)";
      }
    }, {
      key: "enableToggle",
      value: function enableToggle() {
        var _this = this;

        this.toggle.addEventListener('click', function () {
          _this.load();

          _this.activeButton();

          (0, _selector.$$)('.nav__container--item')[_this.index].style.backgroundColor = "var(--principal-green)";
          (0, _selector.$$)('.nav__container--item')[_this.index].style.color = "var(--dark)";

          switch (_this.index) {
            case 0:
              _this.setTo(1, 2);

              var seePrices = new Page((0, _selector.$)('.main__content--button'), '/#/precios', 1);
              seePrices.enableToggle();
              break;

            case 1:
              _this.setTo(0, 2);

              (0, _search["default"])();
              break;

            case 2:
              _this.setTo(0, 1);

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

  if ((0, _selector.$$)('.main__content--button').length === 1) {
    var seePrices = new Page((0, _selector.$)('.main__content--button'), '/#/precios', 1);
    seePrices.enableToggle();
  }

  contactPage.enableToggle();
  pricesPage.enableToggle();
  home.enableToggle(); // seePrices.enableToggle();
};

var _default = initLoad;
exports["default"] = _default;