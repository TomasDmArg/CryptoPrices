"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
exports.initCookie = exports.setLanguage = exports.setCurrency = void 0;

var _selector = require("./selector.js");

var _theme = require("./theme.js");

var setCurrency = function setCurrency(currency, text) {
  currency.innerHTML = text;
  document.cookie = "Currency=".concat(text, "; expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
  (0, _selector.$)('.item-currencies').style.display = "none";
};

exports.setCurrency = setCurrency;

var setLanguage = function setLanguage(lang, text) {
  lang.innerHTML = text;
  document.cookie = "Language=".concat(text, "; expires=Mon, 25 May 2021 11:12:13 UTC; path=/");
  (0, _selector.$)('.item-languages').style.display = "none";
};

exports.setLanguage = setLanguage;

function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var initCookie = function initCookie() {
  var aCookies = document.cookie.split(";");

  if (aCookies === [""]) {
    if (aCookies[0].indexOf("Theme") === -1) {
      document.cookie = "Theme=light; expires=Mon, 25 May 2021 11:12:13 UTC; path=/";
    }

    if (aCookies[1].indexOf("Currency") === -1) {
      document.cookie = "Currency=USD; expires=Mon, 25 May 2021 11:12:13 UTC; path=/";
    }
  }

  if (getCookie("Theme") === "dark") {
    (0, _theme.darkMode)();
  }

  if (getCookie("Theme") === "light") {
    (0, _theme.lightMode)();
  }

  if (getCookie("Currency")) {
    setCurrency((0, _selector.$)('.currency-label'), getCookie("Currency"));
  }

  if (getCookie("Language")) {
    setLanguage((0, _selector.$)('.language-label'), getCookie("Language"));
  }

  (0, _theme.applyMode)();
};

exports.initCookie = initCookie;