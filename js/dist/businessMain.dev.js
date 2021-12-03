"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _cookie = require("./cookie.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EXP_DATE = "expires=Fri, 31 Dec 9999 23:59:59 GMT;";
var PATH = "path=/";
var C = ".bs-dashboard";

var setToC = function setToC(c, html) {
  return (0, _selector.$)("".concat(C, "__").concat(c)).innerHTML = html;
};

var isAnImage = function isAnImage(data) {
  var has = function has(type) {
    return data.substr(data.length - type.length) == type;
  }; // Check if the last 4 characters are png, jpg, jpeg, gif


  if (has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
  return false;
};

var setCookies = function setCookies(data) {
  if (data.cuit == undefined) {
    data.cuit = "-";
  }

  if (data.profile == undefined || isAnImage(data.profile) == false) {
    data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
  }

  document.cookie = "name=".concat(data.name, "; ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "email=".concat(data.email, "; ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "cuit=".concat(data.cuit, ";  ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "profile=".concat(data.profile, "; ").concat(EXP_DATE, " ").concat(PATH);
};

var initBs = function initBs(type) {
  switch (type) {
    //Data = {name, email, cuit, profile}
    case 1:
      (0, _selector.$)('.sign-up__form--button').addEventListener('click', function () {
        var data = {
          name: (0, _selector.$)('#name').value,
          email: (0, _selector.$)('#email').value,
          cuit: (0, _selector.$)('#cuit').value,
          profile: (0, _selector.$)('#profile').value
        };
        setCookies(data);
      });
      break;

    case 2:
      var all = {
        name: (0, _cookie.getCookie)("name"),
        email: (0, _cookie.getCookie)("email"),
        cuit: (0, _cookie.getCookie)("cuit"),
        profile: (0, _cookie.getCookie)("profile"),
        totalSold: (0, _cookie.getCookie)("total"),
        history: (0, _cookie.getCookie)("history")
      };

      if (all.totalSold == undefined || all.totalSold === 0) {
        all.totalSold = 0;
      } //Carga el nombre y lo que vendió el usuario en pesos


      (0, _selector.$)("".concat(C, "__main--title")).innerHTML = "Hola, ".concat(all.name, "!");
      (0, _selector.$)("".concat(C, "__sales--ars")).innerHTML = "$".concat(all.totalSold.toFixed(2), "ARS"); //Carga el total de ventas en Dolares tomando como referencia el precio del usd

      fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
        return response.json();
      }).then(function (data2) {
        setToC("sales--usd", "$".concat((all.totalSold / data2.payload.bid).toFixed(3), "USD"));
      }); //Carga la imagen de perfil

      (0, _selector.$)("".concat(C, "__aside--profile")).setAttribute('src', (0, _cookie.getCookie)("profile")); // Boton para ocultar o mostrar el saldo

      (0, _selector.$)("".concat(C, "__sales--hide")).addEventListener('click', function () {
        if ((0, _selector.$)("".concat(C, "__sales--ars")).innerHTML.indexOf("*") === -1) {
          setToC("sales--ars", "*****,**ARS");
          setToC("sales--usd", "***,**USD");
          (0, _selector.$)("".concat(C, "__sales--hide")).innerText = "Mostrar";
        } else {
          (0, _selector.$)("".concat(C, "__sales--ars")).innerHTML = "$".concat(all.totalSold.toFixed(2), "ARS");
          fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
            return response.json();
          }).then(function (data2) {
            (0, _selector.$)("".concat(C, "__sales--usd")).innerHTML = "$".concat((all.totalSold / data2.payload.bid).toFixed(3), "USD");
          });
          (0, _selector.$)("".concat(C, "__sales--hide")).innerText = "Ocultar";
        }
      });
      (0, _selector.$)('.aside__buttons--delete').addEventListener('click', function () {
        if (confirm("Estas seguro de que quieres borrar tu cuenta?, Los datos serán irrecuperables")) {
          //Borrar cookies
          var cookies = document.cookie.split(";");

          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }

          _index["default"].loadRoute(0, '/#/home');
        }
      });

    default:
      break;
  }
};

var _default = initBs;
exports["default"] = _default;