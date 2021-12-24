"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _cookie = require("./cookie.js");

var _index = _interopRequireDefault(require("./index.js"));

var _currency = require("./html/currency.js");

var _search = _interopRequireDefault(require("./search.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EXP_DATE = "expires=Fri, 31 Dec 9999 23:59:59 GMT;";
var PATH = "path=/";
var C = ".bs-dashboard";

var setToC = function setToC(c, html) {
  return (0, _selector.$)("".concat(C, "__").concat(c)).innerHTML = html;
};

var monto = 0;

var isAnImage = function isAnImage(data) {
  var has = function has(type) {
    return data.substr(data.length - type.length) == type;
  }; // Check if the last 4 characters are png, jpg, jpeg, gif


  if (has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
  return false;
};

var setCookies = function setCookies(data) {
  if (data.cuit == undefined) data.cuit = "-";

  if (data.profile == undefined || isAnImage(data.profile) == false) {
    data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
  }

  document.cookie = "name=".concat(data.name, "; ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "email=".concat(data.email, "; ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "cuit=".concat(data.cuit, ";  ").concat(EXP_DATE, " ").concat(PATH);
  document.cookie = "profile=".concat(data.profile, "; ").concat(EXP_DATE, " ").concat(PATH);
};

var DNIValidations = function DNIValidations(val, inp) {
  // Extra validations
  if (val.length > 8 || val.length < 7) {
    console.log(val.length); //Give the input a red border

    inp.style.border = "3px solid #ff411f90";
    return true;
  } else {
    console.log(val.length);
    inp.style.border = "none";
    return false;
  }
};

var initBs = function initBs(type) {
  (function () {
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
        if (all.totalSold == undefined) all.totalSold = 0; //Load the name and the total sales value in ars

        (0, _selector.$)("".concat(C, "__main--title")).innerHTML = "Hola, ".concat(all.name, "!");
        (0, _selector.$)("".concat(C, "__sales--ars")).innerHTML = "$".concat(all.totalSold.toFixed(2), "ARS"); //Load the total sales value in usd

        fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
          return response.json();
        }).then(function (data2) {
          setToC("sales--usd", "$".concat((all.totalSold / data2.payload.bid).toFixed(3), "USD"));
        }); //Load the profile image

        (0, _selector.$)("".concat(C, "__aside--profile")).setAttribute('src', (0, _cookie.getCookie)("profile")); // Button to show or hide the sales value

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
            //Delete cookies
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

        var generateInvoice = function generateInvoice() {
          if ((0, _selector.$)('.bs-dashboard__new-invoice > input').value > 0) {
            monto = (0, _selector.$)('.bs-dashboard__new-invoice > input').value;

            _index["default"].loadRoute(8, '/#/negocios/dashboard/venta');

            initBs(3);
          } else {
            // if there isn't a paragraph error insert one
            if ((0, _selector.$$)('.bs-dashboard__new-invoice > p').length == 0) {
              (0, _selector.$)('.bs-dashboard__new-invoice').insertAdjacentHTML('beforeend', "<p class=\"bs-dashboard__new-invoice--error\">El monto debe ser mayor a 0</p>");
            }
          }
        }; // Click event to generate a new invoice


        (0, _selector.$)('.bs-dashboard__new-invoice--create').addEventListener('click', function () {
          generateInvoice();
        }); // Generate a new invoice if the user press Enter

        (0, _selector.$)('.bs-dashboard__new-invoice > input').addEventListener('keyup', function (e) {
          if (e.keyCode == 13) generateInvoice();
        });
        hotkeys("enter", function () {
          //if the input has a positive value, generate a new invoice
          generateInvoice();
        });
        break;
      // Invoice creation page

      case 3:
        var all2 = {
          name: (0, _cookie.getCookie)("name"),
          email: (0, _cookie.getCookie)("email"),
          cuit: (0, _cookie.getCookie)("cuit"),
          profile: (0, _cookie.getCookie)("profile"),
          totalSold: (0, _cookie.getCookie)("total"),
          history: (0, _cookie.getCookie)("history")
        };
        if (all2.totalSold == undefined) all2.totalSold = 0; //Carga la imagen de perfil

        (0, _selector.$)("".concat(C, "__aside--profile")).setAttribute('src', (0, _cookie.getCookie)("profile"));
        (0, _selector.$)('#sale-main-inp-1').value = (0, _currency.numberWithCommas)(monto) + 'ARS';
        var val;
        var errors = [];
        var inputs = [(0, _selector.$)('#sale-main-inp-1'), (0, _selector.$)('#sale-main-inp-3'), (0, _selector.$)('#sale-main-inp-2')]; //The currency button doesn't need this ($('#sale-main-inp-2'))

        var _loop = function _loop(i) {
          inputs[i].addEventListener('focus', function () {
            // Remove commas
            val = inputs[i].value.replace(/,/g, '');
            inputs[i].value = parseFloat(val); // Select all text

            inputs[i].select();
          });
          var extraText = i == 0 ? "ARS" : "";
          inputs[i].addEventListener('blur', function () {
            val = inputs[i].value; // DNI extra validations

            i == 1 && DNIValidations(val, inputs[i]) ? errors[i] = true : errors[i] = false;
            val = parseFloat(val);
            i == 0 ? val.toFixed(2) : val.toFixed(1); // Check if the values are positive

            if (val >= 0) {
              inputs[i].value = (0, _currency.numberWithCommas)(val) + extraText; // If there isn't any error, remove the border

              if (errors[i] == false) inputs[i].style.border = "none";
              errors[0] = false;
            } else {
              //Give the input a red border
              inputs[i].style.border = "3px solid #ff411f90";
              errors[0] = true;
            }
          });
        };

        for (var i = 0; i < inputs.length - 1; i++) {
          _loop(i);
        } // Display the search form


        (0, _search["default"])(2);
        break;

      default:
        break;
    }
  })();
};

var _default = initBs;
exports["default"] = _default;