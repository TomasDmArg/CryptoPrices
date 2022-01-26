"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForDollars = askForDollars;

var _currency = require("./html/currency.js");

var _selector = require("./selector.js");

//This is to be able to add more cards in a scalable way.
var createDollarCard = function createDollarCard(uObj) {
  var card = document.createElement('section');
  card.classList.add('dollar-info');
  var child = document.createElement('section');
  child.classList.add('dollar-name-cont');
  if (uObj.t == "Dolar Contado con Liqui") uObj.t = "Dolar CCL";
  var templateHTML = "\n        <div class=\"dollar-name\">\n            <h2>".concat(uObj.t, "</h2><h4 class=\"text\">").concat(uObj.p, "</h4>\n        </div>\n        <h3 class=\"quote\">Compra: <span class=\"buyDollar\">").concat(uObj.c, "</h3>\n        <h3 class=\"quote\">Venta: <span class=\"sellDollar\">").concat(uObj.v, "</h3>\n    ");
  child.innerHTML = templateHTML;
  card.appendChild(child);
  document.querySelector('.all-card-container').insertAdjacentHTML('beforeend', card.outerHTML);
};

var states = {
  dollarType: 0,
  dollarPrices: {
    buy: 0,
    sell: 0
  },
  orderType: 0,
  baseCurrency: 0,
  quantity: 0,
  firstTimeUpdate: false,
  fee: 0
};

var calculateRes = function calculateRes() {
  var res;
  var target = (0, _selector.$)('#result');
  var price = states.orderType === 0 ? states.dollarPrices.buy : states.dollarPrices.sell;

  if (states.baseCurrency === 0) {
    // How many dollars you can buy with these pesos? or
    // How many dollars you need to sell to get these pesos?
    if (states.dollarType == 1) res = states.quantity * 1.65;else res = states.quantity / price;
  } else if (states.baseCurrency === 1) {
    // How many pesos you can buy with these dollars? or
    // How many pesos you need to sell to get these dollars?
    res = states.quantity * price;
    if (states.dollarType == 1) res = res * 1.65;
  } // FV = PV * (1 + i);


  res = res * (1 + states.fee / 100);
  res.toFixed(3);
  var texts = ["Te darán: ", "Tendras que dar: ", "Tendrás que vender: ", " Te cobrarán: "];
  var texts2 = [" por ", " para recibir ", " para recibir "];
  var st = states.orderType;
  var st2 = states.baseCurrency;
  var st3 = 2;
  if (st == st2) st3 = 0;else if (st == 0 && st2 == 1) st3 = 1;

  if (states.dollarType != 1) {
    target.innerText = texts[st3] + (0, _currency.numberWithCommas)(res.toFixed(3)) + (st2 ? 'ARS' : 'USD') + texts2[st3] + states.quantity + " " + (!st2 ? 'ARS' : 'USD');
  } else {
    target.innerText = texts[3] + (0, _currency.numberWithCommas)(res.toFixed(3)) + "ARS";
  }
};

var isThereAnyError = false;
var errorArr = [];

var sendError = function sendError(error) {
  isThereAnyError = true;
  errorArr.push(error);
};

var errorCheck = function errorCheck() {
  // Scalable error detection
  if (states.dollarType == 0 && states.firstTimeUpdate === false) {
    // This fixes the bug where the first time the calculator is loaded,
    // the price is zero due to the time that the fetch takes to load.
    // Replace commas for dots if there's any
    var buy = (0, _selector.$)("".concat(container, " > .buyDollar")).innerText.replace(/,/g, '.');
    var sell = (0, _selector.$)("".concat(container, " > .sellDollar")).innerText.replace(/,/g, '.');
    states.dollarPrices.buy = parseFloat(buy);
    states.dollarPrices.sell = parseFloat(sell);

    if (states.dollarPrices.sell != 0) {
      states.firstTimeUpdate = true;
    }
  } // Zero Price


  if (states.dollarPrices.sell == 0 && states.dollarPrices.buy == 0) sendError('Precio no disponible'); // "Dolar tarjeta" can't be sold, it's only for payments

  if (states.dollarType == 1 && states.orderType == 1) {
    sendError('El dolar tarjeta no se puede vender, es solo para pagos con tarjeta');
  } // Negative or zero quantity


  if (states.quantity < 0) sendError('La cantidad no puede ser negativa');
  if (states.quantity == 0) sendError('La cantidad no puede ser 0 (cero)'); // Show erors or calculate res

  if (isThereAnyError) {
    var text = "";

    for (var i = 0; i < errorArr.length; i++) {
      text += "Error " + (i + 1) + ": " + errorArr[i] + '\n';
    }

    (0, _selector.$)('#result').innerText = text;
    isThereAnyError = false;
    errorArr = [];
  } else {
    calculateRes();
  }
};

var disclaimers = function disclaimers() {
  var res;

  if (states.dollarType == 1) {
    res = "*Valores de referencia, puede variar, ya que el precio puede ser distinto dependiendo el banco, pueden aplicar otros impuestos";
  } else if (states.dollarType == 2) {
    res = "*Puede cambiar cotización dependiendo de la cueva, valores de refencia";
  } else if (states.dollarType == 4) {
    res = "*Valores de referencia, ya que pueden haber sido tomadas órdenes, los vendedores pueden no ser la mejor opción, o no tienen la liquidez necesaria, o uno no llegar al mínimo";
  } else {
    res = "*La cotización puede variar, valores de refencia";
  }

  (0, _selector.$)('#result-disclaimer').innerText = res;
};

var container = ".dollar-info > .dollar-name-cont > .quote";

var updateState = function updateState(state, value) {
  states[state] = value;
  if (state === 'baseCurrency') (0, _selector.$)('.qt-unit').innerText = states.baseCurrency === 0 ? 'ARS' : 'USD';
  errorCheck();
  disclaimers();
};

var initCalculator = function initCalculator() {
  var dollarTypeOptions = (0, _selector.$$)('.converter__type > button');
  var orderType = (0, _selector.$$)('.converter__options--first > button');
  var baseCurrency = (0, _selector.$$)('.converter__options--second > button');
  dollarTypeOptions[states.dollarType].id = 'd-ac';
  orderType[states.orderType].id = 'o-ac';
  baseCurrency[states.baseCurrency].id = 'c-ac';
  disclaimers();
  dollarTypeOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      dollarTypeOptions.forEach(function (option) {
        option.id = '';
      });
      option.id = 'd-ac';
      var elArray = Array.from(dollarTypeOptions);
      updateState('dollarType', elArray.indexOf(option)); // Get buy and sell values 

      var getPrices = {
        buy: undefined,
        sell: undefined
      };
      var allBuyPrices = (0, _selector.$$)('.dollar-info > .dollar-name-cont > .quote >  .buyDollar');
      var allSellPrices = (0, _selector.$$)('.dollar-info > .dollar-name-cont > .quote >  .sellDollar');
      var x = states.dollarType;

      if (x === 0 || x === 1) {
        // Replace commas for dots if there's any
        var buy = allBuyPrices[0].innerText.replace(/,/g, '.');
        var sell = allSellPrices[0].innerText.replace(/,/g, '.');
        getPrices.buy = parseFloat(buy);
        getPrices.sell = parseFloat(sell);
      } else {
        var _buy = allBuyPrices[x - 1].innerText.replace(/,/g, '.');

        var _sell = allSellPrices[x - 1].innerText.replace(/,/g, '.');

        getPrices.buy = parseFloat(_buy);
        getPrices.sell = parseFloat(_sell);
      }

      updateState('dollarPrices', getPrices);
    });
  });
  orderType.forEach(function (option) {
    option.addEventListener('click', function () {
      orderType.forEach(function (option) {
        option.id = '';
      });
      option.id = 'o-ac';
      var elArray = Array.from(orderType);
      updateState('orderType', elArray.indexOf(option));
    });
  });
  baseCurrency.forEach(function (option) {
    option.addEventListener('click', function () {
      baseCurrency.forEach(function (option) {
        option.id = '';
      });
      option.id = 'c-ac';
      var elArray = Array.from(baseCurrency);
      updateState('baseCurrency', elArray.indexOf(option));
    });
  });
  var quantityInput = (0, _selector.$)('#qt');
  quantityInput.addEventListener('keyup', function () {
    updateState('quantity', quantityInput.value);
  });
  var feeInput = (0, _selector.$)('.converter__fee');
  var feeRes;
  feeInput.addEventListener('keyup', function () {
    feeRes = feeInput.value.replace(/,/g, '.');
    updateState('fee', feeRes);
  });
};

function askForDollars() {
  return regeneratorRuntime.async(function askForDollars$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(function (response) {
            return response.json();
          }).then(function (data) {
            var createValue;
            var elements = document.querySelectorAll('.dollar-info');

            var setdollar = function setdollar(el, id) {
              var nombre = data[id].casa.nombre;
              var comp = data[id].casa.venta;
              var vent = data[id].casa.compra;
              var rObj = {
                t: nombre,
                p: "Dolar si",
                c: comp,
                v: vent
              };
              createDollarCard(rObj);
            };

            setdollar(0, 0);
            setdollar(1, 1);
            setdollar(4, 3);
            setdollar(5, 4);
          }));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
            return response.json();
          }).then(function (data2) {
            var comp = data2.payload.ask;
            var vent = data2.payload.bid;
            var rObj = {
              t: "USDT",
              p: "Bitso",
              c: comp,
              v: vent
            };
            createDollarCard(rObj);
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("https://criptoya.com/api/binancep2p/buy/usdt/ars/5").then(function (response) {
            return response.json();
          }).then(function (data3) {
            fetch("https://beta.belo.app/public/price").then(function (response) {
              return response.json();
            }).then(function (data4) {
              var promComp = 0,
                  promVent = 0;

              for (var i = 0; i < 5; i++) {
                promComp += parseFloat(data3.data[i].adv.price);
                promVent += parseFloat(data4.data[i].adv.price);
              }

              promComp = promComp / 5;
              promVent = promVent / 5;
              var rObj = {
                t: "USDT",
                p: "Binance P2P",
                c: promComp.toFixed(3),
                v: promVent.toFixed(3)
              };
              createDollarCard(rObj);
            });
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch("https://beta.belo.app/public/price").then(function (response) {
            return response.json();
          }).then(function (data5) {
            var counter = 0;
            var value;

            while (counter != data5.length) {
              if (data5[counter].pairCode === "USDT/ARS") {
                value = {
                  c: data5[counter].ask,
                  v: data5[counter].bid
                };
                counter = data5.length - 1;
              }

              counter++;
            }

            var rObj = {
              t: "USDT",
              p: "Belo",
              c: parseFloat(value.c).toFixed(3),
              v: parseFloat(value.v).toFixed(3)
            };
            createDollarCard(rObj);
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(fetch("https://criptoya.com/api/buenbit/dai/ars").then(function (response) {
            return response.json();
          }).then(function (data6) {
            var rObj = {
              t: "DAI",
              p: "Buenbit",
              c: data6.ask,
              v: data6.bid
            };
            createDollarCard(rObj);
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(fetch("https://criptoya.com/api/brubank").then(function (response) {
            return response.json();
          }).then(function (data7) {
            var rObj = {
              t: "Dolar",
              p: "Brubank",
              c: "".concat(data7.totalAsk),
              v: data7.bid
            };
            createDollarCard(rObj);
          }));

        case 12:
          initCalculator();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}