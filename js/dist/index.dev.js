"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.router = void 0;

var _obtain = _interopRequireDefault(require("./obtain.js"));

var _cookie = require("./cookie.js");

var _navbar = _interopRequireDefault(require("./navbar.js"));

var _load = _interopRequireDefault(require("./load.js"));

var _selector = require("./selector.js");

var _router = _interopRequireDefault(require("./router.js"));

var _routes = require("./routes.js");

var _theme = require("./theme.js");

var _settings = _interopRequireDefault(require("./settings.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//cargar
var router = new _router["default"](_routes.routes);
exports.router = router;
var currencyValue = "ARS";

var load = function load() {
  (0, _cookie.initCookie)();
  router.loadPage();

  if ((0, _selector.$)('[data-router]').innerHTML !== "") {
    (0, _load["default"])();
    (0, _navbar["default"])();
    (0, _obtain["default"])();
  }

  setTimeout(function () {
    (0, _theme.matchColors)();
  }, 1000);
};

load();
var _default = router;
exports["default"] = _default;