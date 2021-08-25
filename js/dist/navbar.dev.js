"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var navScripts = function navScripts() {
  var vState = 0;

  var hideDropList = function hideDropList() {
    if (screen.width < 1000) {
      vState--;
      (0, _selector.$)('.header').style.paddingBottom = '0rem';
      (0, _selector.$)('.nav__container').style.display = "none";
      (0, _selector.$)('.nav__container--hamb-icon').style.display = 'block';
      (0, _selector.$)('.nav__container--close-icon').style.display = 'none';
    }
  };

  var showDropList = function showDropList() {
    if (screen.width < 1000) {
      vState++;
      (0, _selector.$)('.header').style.paddingBottom = '30rem';
      (0, _selector.$)('.nav__container').style.display = "inline-flex";
      (0, _selector.$)('.nav__container--hamb-icon').style.display = 'none';
      (0, _selector.$)('.nav__container--close-icon').style.display = 'block';
    } // if (screen.width > 1000) {
    //     vState++;
    //     $('.header').style.paddingBottom = '30rem';
    //     $('.nav__container').style.display = "inline-flex";
    //     $('.nav__container--hamb-icon').style.display = 'none';
    //     $('.nav__container--close-icon').style.display = 'none';
    // }

  };

  hideDropList();
  (0, _selector.$)('.nav__container--hamb-icon').addEventListener('click', function () {
    showDropList();
  });
  (0, _selector.$)('.nav__container--close-icon').addEventListener('click', function () {
    vState === 0 ? hideDropList() : showDropList();
  });
};

var _default = navScripts;
exports["default"] = _default;