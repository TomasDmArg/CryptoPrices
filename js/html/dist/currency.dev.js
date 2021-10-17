"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loadCrypto = exports.setHTML = exports.numberWithCommas = void 0;

var _selector = require("../selector.js");

var _supportedArr = _interopRequireDefault(require("./supportedArr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendToTabState = false; //Cargar pagina indivudual de la criptomoneda

var numberWithCommas = function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

exports.numberWithCommas = numberWithCommas;

var setHTML = function setHTML(elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach(function (oldScript) {
    var newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach(function (attr) {
      return newScript.setAttribute(attr.name, attr.value);
    });
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
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
    fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
      return response.json();
    }).then(function (data2) {
      //Comprueba si el id existe
      if (data.length === 0) {
        console.log(data);
        console.log('No se encontró la criptomoneda');
      } else {
        //data2 Es la api de Ripio, y localvalue hace referencia al 
        // valor de compra del dolar
        var localValue = data2.payload.ask; //localValue = parseFloat(localValue);

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
          if (num == null) {
            num = "Sin definir";
          }

          if (num >= 1000000000000) {
            num = num / 1000000000000;
            num = num.toFixed(2);
            num = num + "T";
          } else if (num >= 1000000000) {
            num = num / 1000000000;
            num = num.toFixed(2);
            num = num + "B";
          } else if (num >= 1000000) {
            num = num / 1000000;
            num = num.toFixed(2);
            num = num + "M";
          } else if (num > 1000) {
            num = num / 1000;
            num = num.toFixed(2);
            num = num + "k";
          }

          return num;
        };

        var individualPage = "\n                        <main>\n                            <section class=\"currencyContainer\">\n                                <section class=\"currencyContainer__name\">\n                                    <section class=\"name__cont\">\n                                        <img class=\"name__cont--img\" src=\"".concat(data[0].image, "\" alt=\"\">\n                                        <h2 class=\"name__cont--title\">").concat(data[0].name, "</h2>\n                                        <h4 class=\"name__cont--symbol text\">").concat(modSymbol, "</h4>\n                                    </section>\n                                    <section class=\"price__cont\">\n                                        <h3 class=\"price__cont--ars\">$").concat(modifiedPriceLocal, "ARS</h3>\n                                        <h4 class=\"price__cont--usd text\">$").concat(modifiedPriceUSD, "USD</h4>\n                                    </section>\n                                </section>\n                                <section class=\"currencyContainer__converter\">\n                                    <div class=\"currencyContainer__converter--input-cont\">\n                                        <input class=\"currencyContainer__converter--input\" type=\"number\" value=\"1\">\n                                        <h3 class=\"currencyContainer__converter--currency\">").concat(modSymbol, "</h3>\n                                    </div> <br>\n                                    <div class=\"currencyContainer__converter--input-cont\">\n                                        <input class=\"currencyContainer__converter--input inp2\" type=\"number\" value=\"").concat(intLocalPrice, "\">\n                                        <h3 class=\"currencyContainer__converter--currency-options\">$</h3>\n                                        <h3 class=\"currencyContainer__converter--currency-options\">U$</h3>\n                                    </div>\n                                </section>\n                                <section class=\"currencyContainer__graph\">\n                                    <div class=\"tradingview-widget-container\">\n                                        <div id=\"tradingview_6001e\"></div>\n                                        <div class=\"tradingview-widget-copyright\"><a href=\"https://es.tradingview.com/symbols/").concat(modSymbol, "USDT\" rel=\"noopener\" target=\"_blank\"><span class=\"blue-text\">").concat(modSymbol, "USDT Gr\xE1fico</span></a> por TradingView</div>\n                                        <script type=\"text/javascript\">\n                                            new TradingView.widget(\n                                                {\n                                                    \"autosize\": true,\n                                                    \"symbol\": \"").concat(modSymbol, "USDT\",\n                                                    \"interval\": \"60\",\n                                                    \"timezone\": \"America/Argentina/Buenos_Aires\",\n                                                    \"theme\": \"dark\",\n                                                    \"style\": \"1\",\n                                                    \"locale\": \"es\",\n                                                    \"toolbar_bg\": \"#f1f3f6\",\n                                                    \"enable_publishing\": false,\n                                                    \"allow_symbol_change\": true,\n                                                    \"container_id\": \"tradingview_6001e\"\n                                                }\n                                            );\n                                        </script>\n                                    </div>\n                                </section>\n                                <section class=\"currencyContainer__24hrschange\">\n                                    <section class=\"change__container\">\n                                        <div class=\"change__container--title-container\">\n                                            <h3 class=\"change__container--lowest\">$").concat(data[0].low_24h, "</h3>\n                                            <h3 class=\"change__container--highest\">$").concat(data[0].high_24h, "</h3>\n                                        </div>\n                                        <div class=\"change__container--bar-bg\">\n                                            <div class=\"change__container--bar\" style=\"min-width: ").concat(pricePercent, "%\"></div>\n                                        </div>\n                                    </section>\n                                </section>\n                                <section class=\"currencyContainer__statistics\">\n                                    <h2 class=\"currencyContainer__statistics--title\">\n                                        Estad\xEDsticas: \n                                    </h2>\n                                    <h4 class=\"currencyContainer__statistics--item\"> <b> Cambio 24hrs: </b> ").concat(percent, "%</h4>\n                                    <h4 class=\"currencyContainer__statistics--item\"> <b> Capitalizaci\xF3n: </b> ").concat(shortNumber(data[0].market_cap), "</h4>\n                                    <h4 class=\"currencyContainer__statistics--item\"> <b> Monedas en circ.: </b> ").concat(shortNumber(data[0].circulating_supply), "</h4>\n                                    <h4 class=\"currencyContainer__statistics--item\"> <b> Total de monedas: </b> ").concat(shortNumber(data[0].total_supply), "</h4>\n                                    <h4 class=\"currencyContainer__statistics--item\"> <b> ATH </b> ").concat(shortNumber(data[0].ath), "</h4>\n                                </section>\n                            </section>\n                        </main>\n                            ");
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