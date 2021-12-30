"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loadCrypto = exports.setHTML = exports.numberWithCommas = void 0;

var _selector = require("../selector.js");

var _individualPage = require("./individualPage.js");

var _supportedArr = _interopRequireDefault(require("./supportedArr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendToTabState = false; //Cargar pagina indivudual de la criptomoneda

var numberWithCommas = function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.numberWithCommas = numberWithCommas;

var setHTML = function setHTML(elm, html) {
  return regeneratorRuntime.async(function setHTML$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          elm.innerHTML = html;
          Array.from(elm.querySelectorAll("script")).forEach(function (oldScript) {
            var newScript = document.createElement("script");
            Array.from(oldScript.attributes).forEach(function (attr) {
              return newScript.setAttribute(attr.name, attr.value);
            });
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.setHTML = setHTML;

var loadCrypto = function loadCrypto(id) {
  var IND_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='; //Elimina el "/#c/" para obtener el id de la moneda, necesario para la solicitud

  history.pushState({}, 'This works fine', id);
  id = id.slice(4);
  fetch(IND_API + id).then(function (response) {
    return response.json();
  }).then(function (data) {
    fetch('https://criptoya.com/api/binancep2p/sell/usdt/ars/5').then(function (response) {
      return response.json();
    }).then(function (data2) {
      //Comprueba si el id existe
      if (data.length === 0) {
        console.log(data);
        console.log('No se encontró la criptomoneda');
      } else {
        // valor de venta del dolar
        var promVent = 0;

        for (var i = 0; i < 5; i++) {
          promVent += parseFloat(data2.data[i].adv.price);
        }

        promVent = promVent / 5;
        var localValue = promVent.toFixed(3); //localValue = parseFloat(localValue);

        var modSymbol = data[0].symbol;
        modSymbol = modSymbol.toUpperCase();
        var modSymbolTradingview = modSymbol + "USDT";
        console.log(localValue); //El formato de los precios que agrega comas en funcion de los dígitos, ej. 50000.0 > 50,000.0 
        //En monedas con precios muy inferiores a 1 ej. SHIB o SAFEMOON, tienen tantos digitos flotantes
        //que es necesario dejarlo como está sin convertir el número

        var modifiedPriceLocal, modifiedPriceUSD;

        if (data[0].current_price < 0.0005) {
          modifiedPriceLocal = (data[0].current_price * localValue).toFixed(8);
          modifiedPriceUSD = data[0].current_price.toFixed(8);
        } else if (data[0].current_price < 1) {
          modifiedPriceLocal = (data[0].current_price * localValue).toFixed(4);
          modifiedPriceUSD = data[0].current_price.toFixed(4);
        } else {
          modifiedPriceLocal = numberWithCommas((data[0].current_price * localValue).toFixed(2));
          modifiedPriceUSD = numberWithCommas(data[0].current_price.toFixed(2));
        }

        var intLocalPrice, intPriceUSD;
        intLocalPrice = data[0].current_price * localValue;
        intPriceUSD = data[0].current_price.toFixed(2);
        var globalInterval = setInterval(function () {
          if (location.href.indexOf(data[0].id) !== -1) {
            fetch(IND_API + id).then(function (response) {
              return response.json();
            }).then(function (data) {
              intLocalPrice = data[0].current_price * localValue;
              intPriceUSD = data[0].current_price.toFixed(2);

              if (data[0].current_price < 0.0005) {
                modifiedPriceLocal = (data[0].current_price * localValue).toFixed(8);
                modifiedPriceUSD = data[0].current_price.toFixed(8);
              } else if (data[0].current_price < 1) {
                modifiedPriceLocal = (data[0].current_price * localValue).toFixed(4);
                modifiedPriceUSD = data[0].current_price.toFixed(4);
              } else {
                modifiedPriceLocal = numberWithCommas((data[0].current_price * localValue).toFixed(2));
                modifiedPriceUSD = numberWithCommas(data[0].current_price.toFixed(2));
              }

              if ((0, _selector.$)('.price__cont--ars') !== undefined || (0, _selector.$)('.price__cont--ars') !== null) {
                (0, _selector.$)('.price__cont--ars').innerHTML = "$".concat(modifiedPriceLocal, "ARS");
                (0, _selector.$)('.price__cont--usd').innerHTML = "$".concat(modifiedPriceUSD, "USD");
              }

              if (sendToTabState === false) {
                document.title = "".concat(modSymbol, ": $").concat(modifiedPriceUSD, " - CryptoPrices");
              }
            });
          } else {
            clearInterval(globalInterval);
          }
        }, 10000);
        document.title = "".concat(modSymbol, ": $").concat(modifiedPriceUSD, " - CryptoPrices");
        var percent = data[0].price_change_percentage_24h;
        percent = percent.toFixed(2);
        percent = numberWithCommas(percent);
        var val1 = data[0].high_24h - data[0].low_24h;
        var val2 = data[0].current_price - data[0].low_24h;
        var pricePercent = val2 / val1 * 100;

        var shortNumber = function shortNumber(num) {
          if (num == null || num == undefined || num == 0) num = "No disponible";

          if (num >= 1000000000000) {
            num = (num / 1000000000000).toFixed(2) + "T";
          } else if (num >= 1000000000) {
            num = (num / 1000000000).toFixed(2) + "B";
          } else if (num >= 1000000) {
            num = (num / 1000000).toFixed(2) + "M";
          } else if (num > 1000) {
            num = (num / 1000).toFixed(2) + "K";
          }

          return num;
        };

        var individualPage = (0, _individualPage.getPage)(data[0].image, data[0].name, modSymbol, modifiedPriceLocal, modifiedPriceUSD, intLocalPrice, data[0].low_24h, data[0].high_24h, pricePercent, percent, shortNumber(data[0].market_cap), shortNumber(data[0].circulating_supply), shortNumber(data[0].total_supply), shortNumber(data[0].ath));
        var element = document.querySelectorAll("[data-router]")[0];
        setHTML(element, individualPage);
        window.scroll(0, 0);
        var currency = (0, _selector.$$)('.currencyContainer__converter--currency-options');
        var activeCurrency = currency[0];
        activeCurrency.style.backgroundColor = "#06D6A090";
        var inputs = (0, _selector.$$)('.currencyContainer__converter--input');
        inputs[0].addEventListener('keyup', function () {
          if (activeCurrency == currency[0]) {
            inputs[1].value = (inputs[0].value * intLocalPrice).toFixed(2);
          } else {
            inputs[1].value = (inputs[0].value * intPriceUSD).toFixed(2);
          }
        });
        inputs[1].addEventListener('keyup', function () {
          if (activeCurrency == currency[0]) {
            inputs[0].value = (inputs[1].value / intLocalPrice).toFixed(2);
          } else {
            inputs[0].value = (inputs[1].value / intPriceUSD).toFixed(2);
          }
        });
        currency[1].addEventListener('click', function () {
          activeCurrency = currency[1];
          inputs[1].value = (inputs[0].value * intPriceUSD).toFixed(2);
          activeCurrency.style.backgroundColor = "#06D6A090";
          currency[0].style.backgroundColor = "#505050";
        });
        currency[0].addEventListener('click', function () {
          activeCurrency = currency[0];
          inputs[1].value = (inputs[0].value * intLocalPrice).toFixed(2);
          activeCurrency.style.backgroundColor = "#06D6A090";
          currency[1].style.backgroundColor = "#505050";
        });
      }
    });
  });
};

exports.loadCrypto = loadCrypto;
var _default = loadCrypto;
exports["default"] = _default;