"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getAll = function getAll() {
  fetch('https://api.coingecko.com/api/v3/coins/list').then(function (response) {
    return response.json();
  }).then(function data() {
    return data;
  });
};

var list = getAll();
var _default = list;
exports["default"] = _default;