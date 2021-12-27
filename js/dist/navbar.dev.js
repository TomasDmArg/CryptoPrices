"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var navScripts = function navScripts() {
  var vState = 0;

  var resetNav = function resetNav() {
    (0, _selector.$)('#header').style.cssText = 'padding-bottom: 0rem';
    (0, _selector.$)('#nav__container').style.cssText = "display: inline-flex";
    (0, _selector.$)('#nav-close').style.cssText = 'display: none';
    (0, _selector.$)('#nav-open').style.cssText = 'display: none';
  };

  var hideDropList = function hideDropList() {
    if (window.innerWidth < 1000) {
      vState--;
      (0, _selector.$)('#header').style.cssText = 'padding-bottom: 0rem';
      (0, _selector.$)('#nav__container').style.cssText = 'display: none';
      (0, _selector.$)('#nav-open').style.cssText = 'display: block';
      (0, _selector.$)('#nav-close').style.cssText = 'display: none';
    }
  };

  var showDropList = function showDropList() {
    if (window.innerWidth < 1000) {
      vState++;
      (0, _selector.$)('#header').style.paddingBottom = '30rem';
      (0, _selector.$)('#nav__container').style.cssText = "display: inline-flex";
      (0, _selector.$)('#nav-open').style.display = 'none';
      (0, _selector.$)('#nav-close').style.display = 'block';
    } else {
      resetNav();
    }
  };

  hideDropList();
  (0, _selector.$)('#nav-open').addEventListener('click', function () {
    showDropList();
  });
  (0, _selector.$)('#nav-close').addEventListener('click', function () {
    vState === 0 ? hideDropList() : showDropList();
  });
};

var _default = navScripts;
exports["default"] = _default;