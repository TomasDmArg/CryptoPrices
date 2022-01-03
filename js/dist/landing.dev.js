"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.program = void 0;

var _selector = require("./selector.js");

var program = function program() {
  var elementExists = [(0, _selector.$)(".main__image > img"), true];
  elementExists[1] = elementExists[0] ? elementExists[1] = true : elementExists[1] = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var square = document.querySelector(".main__image > img");

      if (entry.isIntersecting && elementExists[1]) {
        square.classList.add("animate3dImg");
        return; // if we added the class, exit the function
      } // We're not intersecting, so remove the class!


      if (elementExists[1]) {
        square.classList.remove("animate3dImg");
      }
    });
  });

  if (elementExists[1]) {
    observer.observe((0, _selector.$)(".main__image > img"));
  } else {
    // Remove observer
    observer.disconnect();
  }
};

exports.program = program;