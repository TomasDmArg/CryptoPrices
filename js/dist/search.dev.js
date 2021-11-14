"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _currency = _interopRequireDefault(require("./html/currency.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import list from './cryptolist.js';
var state = 0;
var getResult;

var initSearch = function initSearch() {
  fetch('https://api.coingecko.com/api/v3/coins/list', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (list) {
    var INP = (0, _selector.$)('.search-container > div > input');
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

    var showResults = function showResults(arr) {
      if (arr.length > 6) {
        var _loop = function _loop(i) {
          (0, _selector.$$)('.search-result')[i].innerHTML = "".concat(arr[i].name);
          (0, _selector.$$)('.search-result')[i].style.display = 'block';
          (0, _selector.$$)('.search-result')[i].addEventListener('click', function () {
            (0, _currency["default"])("/#c/" + getResult[i].id);
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

        for (var i = 0; i < 6; i++) {
          _loop(i);
        }
      } else {
        var _loop2 = function _loop2(_i) {
          if (arr.length < 6) {
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
            (0, _currency["default"])("/#c/" + getResult[_i].id);
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
          console.log(INP.value);
          var val = INP.value.toUpperCase();
          var data = list;
          var filterResult = data.filter(function (data) {
            return data.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
          });

          if (filterResult.length === 0) {
            filterResult.push({
              name: "Ninguna moneda encontrada"
            });
            showResults(filterResult);
          } else {
            getResult = filterResult; //Si el elemento tiene en mayor porcentaje x cantidad de caracteres va primero

            filterResult.sort(function st(a, b) {
              return a.name.length - b.name.length;
            });
            showResults(filterResult);

            if (e.keyCode === 13) {
              (0, _currency["default"])("/#c/" + getResult[0].id);
            }
          }
        }

        if (e.key === 'Escape') {
          for (var _i2 = 0; _i2 < 6; _i2++) {
            (0, _selector.$$)('.search-result')[_i2].style.display = 'none';
            INP.blur();
          }
        }

        if (e.key === 'Ctrl') {
          if (e.key === 'b') {
            for (var _i3 = 0; _i3 < 6; _i3++) {
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