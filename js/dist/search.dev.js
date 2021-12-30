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
        (0, _selector.$)('.sale__results--equivalent').innerHTML = "~$".concat(arsPlusFees, "ARS"); // Add the ars amount to the cookie

        var sold = (0, _cookie.getCookie)('totalSold');
        sold = parseFloat(sold);
        sold += ars;
        sold = sold.toFixed(2);
        document.cookie = "totalSold=".concat(sold, "; expires=Fri, 31 Dec 9999 23:59:59 GMT;\""); // Generar PDF

        (0, _selector.$)('.sale__results--button').addEventListener('click', function () {
          var data = {
            businessName: (0, _cookie.getCookie)('name'),
            direction: (0, _cookie.getCookie)('address') || '-',
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

    var el = (0, _selector.$$)('.search-result');

    for (var i = 0; i < el.length - 1; i++) {
      el[i].addEventListener('click', function () {
        load();
      });
    }

    INP.addEventListener('focus', function () {
      for (var _i = 0; _i < el.length - 1; _i++) {
        if (el[_i].innerText != '') (0, _selector.$$)('.results-container')[_i].style.display = 'block';
      }
    });
    INP.addEventListener('blur', function () {
      setTimeout(function () {
        if (el.length != 0) (0, _selector.$)('.results-container').style.display = 'none';
      }, 600);
    });

    var showResults = function showResults(arr) {
      if (arr.length > max) {
        for (var _i2 = 0; _i2 < max; _i2++) {
          (0, _selector.$$)('.search-result')[_i2].innerHTML = "".concat(arr[_i2].name);
          (0, _selector.$$)('.search-result')[_i2].style.display = 'block';
        }
      } else {
        var _loop = function _loop(_i3) {
          if (arr.length < max) {
            arr.push({
              name: " "
            });
          }

          (0, _selector.$$)('.search-result')[_i3].innerHTML = "".concat(arr[_i3].name);
          (0, _selector.$$)('.search-result')[_i3].style.display = 'block';

          if (arr[_i3].name === " ") {
            (0, _selector.$$)('.search-result')[_i3].style.display = 'none';
          }

          INP.addEventListener('focus', function () {
            (0, _selector.$$)('.search-result')[_i3].style.display = 'block';
          }); // INP.addEventListener('blur', ()=>{
          //     $$('.search-result')[i].style.display = 'none';
          // })
        };

        for (var _i3 = 0; _i3 < arr.length; _i3++) {
          _loop(_i3);
        }
      }
    };

    for (var _i4 = 0; _i4 < list.length; _i4++) {
      var name = list[_i4].name;
      var symbol = list[_i4].symbol;
      list[_i4].name = "".concat(name.toUpperCase());
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
          for (var _i5 = 0; _i5 < max; _i5++) {
            (0, _selector.$$)('.search-result')[_i5].style.display = 'none';
            INP.blur();
          }
        }

        if (e.key === 'Ctrl') {
          if (e.key === 'b') {
            for (var _i6 = 0; _i6 < max; _i6++) {
              (0, _selector.$$)('.search-result')[_i6].style.display = 'none';
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