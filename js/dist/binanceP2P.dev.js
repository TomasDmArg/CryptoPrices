"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getValue = function getValue() {
  fetch("https://cors.bridged.cc/https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search", {
    method: "POST",
    body: JSON.stringify({
      "page": 1,
      "rows": 2,
      "payTypes": [],
      "publisherType": null,
      "asset": "USDT",
      "tradeType": "SELL",
      "fiat": "ARS"
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    credentials: "same-origin"
  }).then(function (response) {
    console.log('Success!');
    response.json();
    console.log(response.JSON());
    console.log(response.JSON);
    console.log(response.text);
    console.log(response.text());
  })["catch"](function (error) {
    error.message;
  });
};

var _default = getValue;
exports["default"] = _default;