"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.program = void 0;

var _selector = require("./selector.js");

var program = function program() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var square = document.querySelector(".main__image > img");

      if (entry.isIntersecting) {
        square.classList.add("animate3dImg");
        return; // if we added the class, exit the function
      } // We're not intersecting, so remove the class!


      square.classList.remove("animate3dImg");
    });
  });
  observer.observe((0, _selector.$)(".main__image > img"));
};

exports.program = program;