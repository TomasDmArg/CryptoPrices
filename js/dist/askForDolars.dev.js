"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askForDollars = void 0;

var _currency = require("./html/currency.js");

var askForDollars = function askForDollars() {
  fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(function (response) {
    return response.json();
  }).then(function (data) {
    var createValue;
    var elements = document.querySelectorAll('.dollar-info');

    var setDolar = function setDolar(el, id) {
      console.log(data[id]);
      createValue = data[id].casa.venta;
      elements[el].querySelector(".buyDollar").innerHTML = createValue;
      createValue = data[id].casa.compra;
      elements[el].querySelector(".sellDollar").innerHTML = createValue;
    };

    setDolar(0, 0);
    setDolar(1, 1);
    setDolar(4, 3);
    setDolar(5, 4);
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
};

exports.askForDollars = askForDollars;