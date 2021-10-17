"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var isAImage = function isAImage(data) {
  var has = function has(type) {
    return data.indexOf(type) != -1;
  };

  if (has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
  return false;
};

var setCookies = function setCookies(data) {
  if (data.cuit == undefined) {
    data.cuit = "-";
  }

  if (data.profile == undefined || isAImage(data.profile) == false) {
    data.profile = "https://tmdm.com.ar/u/business-profile.svg";
  }

  document.cookie = "name=".concat(data.name, ";     expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
  document.cookie = "email=".concat(data.email, ";   expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
  document.cookie = "cuit=".concat(data.cuit, ";    expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
  document.cookie = "profile=".concat(data.profile, "; expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
};

var initBs = function initBs(type) {
  switch (type) {
    //Data = {name, email, cuit, profile}
    case 1:
      (0, _selector.$)('.sign-up__form--button').addEventListener('click', function () {
        var data = {
          name: (0, _selector.$)('#name').value,
          email: (0, _selector.$)('#email').value,
          cuit: (0, _selector.$)('#cuit').value,
          profile: (0, _selector.$)('#profile').value
        };
        setCookies(data);
      });
      break;

    default:
      break;
  }
};

var _default = initBs;
exports["default"] = _default;