"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForDollars = void 0;

var _currency = require("./html/currency.js");

var _selector = require("./selector.js");

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

var askForDollars = function askForDollars() {
  fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(function (response) {
    return response.json();
  }).then(function (data) {
    var createValue;
    var elements = document.querySelectorAll('.dollar-info');

    var setdollar = function setdollar(el, id) {
      console.log(data[id]);
      createValue = data[id].casa.venta;
      elements[el].querySelector(".buyDollar").innerHTML = createValue;
      createValue = data[id].casa.compra;
      elements[el].querySelector(".sellDollar").innerHTML = createValue;
    };

    setdollar(0, 0);
    setdollar(1, 1);
    setdollar(4, 3);
    setdollar(5, 4);
    fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars').then(function (response) {
      return response.json();
    }).then(function (data2) {
      createValue = data2.payload.ask;
      elements[2].querySelector(".buyDollar").innerHTML = createValue;
      createValue = data2.payload.bid;
      elements[2].querySelector(".sellDollar").innerHTML = createValue;
    });
    fetch("https://criptoya.com/api/binancep2p/buy/usdt/ars/1").then(function (response) {
      return response.json();
    }).then(function (data3) {
      createValue = data3.data[0].adv.price;
      elements[3].querySelector(".buyDollar").innerHTML = createValue;
    });
    fetch("https://criptoya.com/api/binancep2p/sell/usdt/ars/1").then(function (response) {
      return response.json();
    }).then(function (data4) {
      createValue = data4.data[0].adv.price;
      elements[3].querySelector(".sellDollar").innerHTML = createValue;
    });
  });
  initCalculator();
};

exports.askForDollars = askForDollars;