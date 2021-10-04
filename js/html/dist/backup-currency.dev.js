"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("../selector.js");

var _supportedArr = _interopRequireDefault(require("./supportedArr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendToTabState = false; //Cargar pagina indivudual de la criptomoneda

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

var loadCrypto = function loadCrypto(id) {
  var IND_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='; //Elimina el "/#c/" para obtener el id de la moneda, necesario para la solicitud

  history.pushState({}, 'This works fine', id);
  id = id.slice(4);
  fetch(IND_API + id).then(function (response) {
    return response.json();
  }).then(function (data) {
    fetch('https://cors.bridged.cc/https://app.ripio.com/api/v3/rates/?country=AR').then(function (response) {
      return response.json();
    }).then(function (data2) {
      //Comprueba si el id existe
      if (data.length === 0) {
        console.log(data);
        console.log('No se encontró la criptomoneda');
      } else {
        //data2 Es la api de Ripio, y localvalue hace referencia al 
        // valor de compra del dolar
        var localValue = data2[4].buy_rate; //localValue = parseFloat(localValue);

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

        var globalInterval = setInterval(function () {
          if (location.href.indexOf(data[0].id) !== -1) {
            fetch(IND_API + id).then(function (response) {
              return response.json();
            }).then(function (data) {
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

              if ((0, _selector.$)('.priceCont') !== undefined || (0, _selector.$)('.priceCont') !== null) {
                (0, _selector.$)('.priceCont').innerHTML = "$".concat(modifiedPriceLocal, "ARS");
                (0, _selector.$)('.usdCont').innerHTML = "$".concat(modifiedPriceUSD, "USD");
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
        var individualPage = "\n                        <main>\n                            <section class=\"main__content\">\n                            <section class=\"main__content--1\">\n                                <section class=\"content__info\">\n                                    <section class=\"content__info--name\">\n                                        <img class=\"content__info--img\" src=\"".concat(data[0].image, "\" alt=\"\">\n                                        <h2 class=\"mainTitle\">").concat(data[0].name, "</h2>\n                                        <h4 class=\"symbol text\">").concat(modSymbol, "</h4>\n                                    </section>\n                                    <section class=\"content__info--price\">\n                                        <h3 class=\"priceCont\">$").concat(modifiedPriceLocal, "ARS</h3>\n                                        <h4 class=\"usdCont text\">$").concat(modifiedPriceUSD, "USD</h4>\n                                        <h4 class=\"change\">").concat(percent, "%</h4>\n                                    </section>\n                                </section>\n                                <section></section>\n                                \n                                <section></section>\n                                <section class=\"content__buttons--onclick \">\n                                    <!-- <a href=\"#\" class=\"content__buttons--btn seeOnTradingview\">Ver en tradingview</a> -->\n                                    <a href=\"/#c/").concat(data[0].id, "\" class=\"content__buttons--btn-onclick\" id=\"sendToTab\">Enviar precio a la pesta\xF1a (binance)</a>\n                                    <a href=\"/#c/").concat(data[0].id, "\" class=\"content__buttons--btn convertir\" id=\"convert\">Convertir</a>\n                                </section>\n                            </section>\n                            <section class=\"main__content--2\">\n                                <section class=\"content__info\">\n                                    <button class=\"content__info--btn btn-active\">Gr\xE1fico</button>\n                                    <button class=\"content__info--btn\">Convertir3</button>\n                                </section>\n                                <section class=\"graph\">\n                                    <div class=\"tradingview-widget-container\">\n                                        <div id=\"tradingview_87f40\"></div>\n                                        <div class=\"tradingview-widget-copyright\"><a href=\"https://es.tradingview.com/symbols/BTCUSDT/\" rel=\"noopener\" target=\"_blank\"><span class=\"blue-text\">BTCUSDT Gr\xE1fico</span></a> por TradingView</div>\n                                        <script type=\"text/javascript\">\n                                            new TradingView.widget({\n                                                \"width\": 980,\n                                                \"height\": 610,\n                                                \"symbol\": \"").concat(modSymbolTradingview, "\",\n                                                \"interval\": \"D\",\n                                                \"timezone\": \"Etc/UTC\",\n                                                \"theme\": \"dark\",\n                                                \"style\": \"2\",\n                                                \"locale\": \"es\",\n                                                \"toolbar_bg\": \"#f1f3f6\",\n                                                \"enable_publishing\": false,\n                                                \"allow_symbol_change\": true,\n                                                \"container_id\": \"tradingview_87f40\"\n                                            });\n                                        </script>\n                                    </div>\n                                </section>\n                            </section>\n                            </section>\n                            </main>\n                            ");
        var element = document.querySelectorAll("[data-router]")[0];
        setHTML(element, individualPage);

        var sendToTab = function sendToTab() {
          var symbol = data[0].symbol;
          symbol = symbol.toUpperCase();

          if (_supportedArr["default"].indexOf(symbol) == -1 || symbol == "USDT") {
            (0, _selector.$)('#sendToTab').style.opacity = '0.5';
          } else {
            (0, _selector.$)('#sendToTab').addEventListener('click', function () {
              var state = false;
              var interval = setInterval(function () {
                if (location.href.indexOf([0].id) !== -1) {
                  fetch("https://api.binance.com/api/v3/avgPrice?symbol=".concat(symbol, "USDT")).then(function (response) {
                    return response.json();
                  }).then(function (data) {
                    var price = data.price;
                    price = parseFloat(price);

                    var pedirDecimales = function pedirDecimales() {
                      var decimales = prompt("Escribe la cantidad de decimales que quieres ver: Máx 12");

                      if (decimales < 12) {
                        price = price.toFixed(decimales);
                        document.title = "".concat(symbol, ": $").concat(price, " - (Binance) CryptoPrices");
                        state = true;
                        console.log(data[0].id);
                      } else {
                        pedirDecimales();
                      }
                    };

                    if (state == false) pedirDecimales();
                    (0, _selector.$)('#sendToTab').innerText = "Enviado!";
                  });
                  sendToTabState = true;
                } else {
                  sendToTabState = false;
                  clearInterval(interval);
                }
              }, 2000);
            });
          }
        };

        sendToTab();
      }
    });
  });
};

var _default = loadCrypto;
exports["default"] = _default;