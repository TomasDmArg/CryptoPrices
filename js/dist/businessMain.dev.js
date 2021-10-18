"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _cookie = require("./cookie.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isAImage = function isAImage(data) {
  var has = function has(type) {
    return data.indexOf(type) != -1;
  };

  if (has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
  return false;
};

var setCookies = function setCookies(data) {
  if (data.cuit == undefined) {
    data.cuit = "-";
  }

  if (data.profile == undefined || isAImage(data.profile) == false) {
    data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
  }

  document.cookie = "name=".concat(data.name, ";     expires=Mon, 25 May 2022 11:12:13 UTC; path=/");
  document.cookie = "email=".concat(data.email, ";   expires=Mon, 25 May 2022 11:12:13 UTC; path=/");
  document.cookie = "cuit=".concat(data.cuit, ";    expires=Mon, 25 May 2022 11:12:13 UTC; path=/");
  document.cookie = "profile=".concat(data.profile, "; expires=Mon, 25 May 2022 11:12:13 UTC; path=/");
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
        setCookies(data); //console.log("Hola");
        //initBs(2);
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
      }

      (0, _selector.$)('.bs-dashboard__main--title').innerHTML = "Hola, ".concat(all.name, "!");
      (0, _selector.$)('.bs-dashboard__sales--ars').innerHTML = "$".concat(all.totalSold.toFixed(2), "ARS");
      fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
        return response.json();
      }).then(function (data2) {
        (0, _selector.$)('.bs-dashboard__sales--usd').innerHTML = "$".concat((all.totalSold / data2.payload.bid).toFixed(3), "USD");
      });
      (0, _selector.$)('.bs-dashboard__aside--profile').setAttribute('src', (0, _cookie.getCookie)("profile"));
      (0, _selector.$)('.bs-dashboard__sales--hide').addEventListener('click', function () {
        if ((0, _selector.$)('.bs-dashboard__sales--ars').innerHTML.indexOf("*") === -1) {
          (0, _selector.$)('.bs-dashboard__sales--ars').innerHTML = "$*****,**ARS";
          (0, _selector.$)('.bs-dashboard__sales--usd').innerHTML = "$***,**USD";
          (0, _selector.$)('.bs-dashboard__sales--hide').innerText = "Mostrar";
        } else {
          (0, _selector.$)('.bs-dashboard__sales--ars').innerHTML = "$".concat(all.totalSold.toFixed(2), "ARS");
          fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
            return response.json();
          }).then(function (data2) {
            (0, _selector.$)('.bs-dashboard__sales--usd').innerHTML = "$".concat((all.totalSold / data2.payload.bid).toFixed(3), "USD");
          });
          (0, _selector.$)('.bs-dashboard__sales--hide').innerText = "Ocultar";
        }
      });
      (0, _selector.$)('.aside__buttons--delete').addEventListener('click', function () {
        if (confirm("Estas seguro de que quieres borrar tu cuenta?, Los datos quedan irrecuperables")) {
          document.cookie = "";

          _index["default"].loadRoute(5, '/#/negocios');
        }
      });

    default:
      break;
  }
};

var _default = initBs;
exports["default"] = _default;