"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _currency = _interopRequireDefault(require("./html/currency.js"));

var _pdf = require("./pdf.js");

var _cookie = require("./cookie.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import list from './cryptolist.js';
var state = 0;
var getResult;

var reduceDecimals = function reduceDecimals(x) {
  var num = parseFloat(x);
  num = 0.0000001;

  for (var i = 10; i > 2; i--) {
    if (x < num) return x.toFixed(i);
    num *= 10;
  }

  if (x > 1) return x.toFixed(2);
};

var getPrice = function getPrice(currencyId, symbol) {
  // Get the coingecko usd price for the given currency
  fetch("https://api.coingecko.com/api/v3/coins/".concat(currencyId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
      return response.json();
    }).then(function (data2) {
      (0, _selector.$)('.sale__main--button').addEventListener('click', function () {
        var ars = (0, _selector.$)('#sale-main-inp-1').value;
        var dni = (0, _selector.$)('#sale-main-inp-3').value; // check for dni and fees values

        if (dni === '') dni = '-';
        var fees = (0, _selector.$)('#sale-main-inp-4').value !== null ? (0, _selector.$)('#sale-main-inp-4').value : 0; // display the result

        (0, _selector.$)('.sale__results').style.display = 'block'; // if ars is a string, remove commas on ars

        if (typeof ars === 'string') ars = ars.replace(/,/g, '');
        ars = parseFloat(ars); // Calculate the total with the fee or discount

        var arsPlusFees = ars * (1 + fees / 100);
        arsPlusFees = arsPlusFees.toFixed(2);
        var arsValue = data2.payload.bid; //Get dolar price on Bitso

        var price = data.market_data.current_price.usd; //Get usd price on Coingecko

        var result = arsPlusFees / arsValue / price; //Calculate the result

        result = reduceDecimals(result);
        (0, _selector.$)('.sale__results--amount').innerHTML = "$".concat(result).concat(symbol);
        (0, _selector.$)('.sale__results--equivalent').innerHTML = "~$".concat(arsPlusFees, "ARS"); // Generar PDF

        (0, _selector.$)('.sale__results--button').addEventListener('click', function () {
          var data = {
            businessName: (0, _cookie.getCookie)('name'),
            direction: (0, _cookie.getCookie)('direction') || '-',
            CUIT: (0, _cookie.getCookie)('cuit'),
            currency: symbol,
            currencyQt: result,
            ars: arsPlusFees,
            date: new Date().toLocaleDateString(),
            hour: new Date().toLocaleTimeString(),
            dni: dni
          };
          var filename = "Factura-".concat(data.date, "-").concat(data.hour);
          (0, _pdf.generatePDF)(data.businessName, data.direction, data.CUIT, data.currency, data.currencyQt, data.ars, data.date, data.hour, data.dni, filename);
        });
      });
      return getResult;
    });
  });
};

var initSearch = function initSearch() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  fetch('https://api.coingecko.com/api/v3/coins/list', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (list) {
    var max = type === 1 ? 6 : 3;
    var INP = type === 1 ? (0, _selector.$)('.search-container > div > input') : (0, _selector.$)('#sale-main-inp-2'); // disable suggestions for the input

    INP.setAttribute('autocomplete', 'off');
    INP.addEventListener('focus', function () {
      (0, _selector.$)('.search-result').style.display = 'block';
    });

    var show = function show() {
      INP.focus();
      state++;
    };

    hotkeys("ctrl+b, command+b", function () {
      show();
    });

    var load = function load() {
      if (type === 1) (0, _currency["default"])("/#c/" + getResult[0].id);

      if (type === 2) {
        // Put the symbol on the input and disable the input
        INP.value = getResult[0].symbol.toUpperCase();
        INP.disabled = true; // Hide results-container

        for (var i = 0; i < max; i++) {
          (0, _selector.$$)('.search-result')[i].style.display = 'none';
        } // Get the price


        getPrice(getResult[0].id, INP.value);
      }
    };

    var showResults = function showResults(arr) {
      if (arr.length > max) {
        var _loop = function _loop(i) {
          (0, _selector.$$)('.search-result')[i].innerHTML = "".concat(arr[i].name);
          (0, _selector.$$)('.search-result')[i].style.display = 'block';
          (0, _selector.$$)('.search-result')[i].addEventListener('click', function () {
            load();
          });
          INP.addEventListener('focus', function () {
            (0, _selector.$$)('.search-result')[i].style.display = 'block';
          });
          INP.addEventListener('blur', function () {
            (0, _selector.$$)('.search-result')[i].style.display = 'block';
            setTimeout(function () {
              (0, _selector.$$)('.search-result')[i].style.display = 'none !important';
            }, 1200);
          });
        };

        for (var i = 0; i < max; i++) {
          _loop(i);
        }
      } else {
        var _loop2 = function _loop2(_i) {
          if (arr.length < max) {
            arr.push({
              name: " "
            });
          }

          (0, _selector.$$)('.search-result')[_i].innerHTML = "".concat(arr[_i].name);
          (0, _selector.$$)('.search-result')[_i].style.display = 'block';

          if (arr[_i].name === " ") {
            (0, _selector.$$)('.search-result')[_i].style.display = 'none';
          }

          (0, _selector.$$)('.search-result')[_i].addEventListener('click', function () {
            load();
          });

          INP.addEventListener('focus', function () {
            (0, _selector.$$)('.search-result')[_i].style.display = 'block';
          }); // INP.addEventListener('blur', ()=>{
          //     $$('.search-result')[i].style.display = 'none';
          // })
        };

        for (var _i = 0; _i < arr.length; _i++) {
          _loop2(_i);
        }
      }
    };

    for (var i = 0; i < list.length; i++) {
      var name = list[i].name;
      var symbol = list[i].symbol;
      list[i].name = "".concat(name.toUpperCase());
    }

    INP.addEventListener('focus', function () {
      console.log(INP.value);
      INP.addEventListener('keyup', function (e) {
        if (INP.value.length >= 2) {
          var val = INP.value.toUpperCase();
          var data = list;
          var filterResult;

          if (type === 1) {
            filterResult = data.filter(function (data) {
              return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
          } else {
            // Filter by symbol
            filterResult = data.filter(function (data) {
              return data.symbol.toLowerCase().indexOf(val.toLowerCase()) > -1;
            });
          }

          if (filterResult.length === 0) {
            filterResult.push({
              name: "Ninguna moneda encontrada"
            });
            showResults(filterResult);
          } else {
            getResult = filterResult;

            if (type === 1) {
              //Si el elemento tiene en mayor porcentaje x cantidad de caracteres va primero
              filterResult.sort(function st(a, b) {
                return a.name.length - b.name.length;
              });
            } else {
              //Si el elemento tiene en mayor porcentaje x cantidad de caracteres va primero
              filterResult.sort(function st(a, b) {
                return a.symbol.length - b.symbol.length;
              });
            }

            showResults(filterResult);

            if (e.keyCode === 13) {
              load();
            }
          }
        }

        if (e.key === 'Escape') {
          for (var _i2 = 0; _i2 < max; _i2++) {
            (0, _selector.$$)('.search-result')[_i2].style.display = 'none';
            INP.blur();
          }
        }

        if (e.key === 'Ctrl') {
          if (e.key === 'b') {
            for (var _i3 = 0; _i3 < max; _i3++) {
              (0, _selector.$$)('.search-result')[_i3].style.display = 'none';
            }

            INP.blur();
          }
        }

        ;
      });
    });
  });
};

var _default = initSearch;
exports["default"] = _default;