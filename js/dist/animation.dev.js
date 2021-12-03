"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateCard = void 0;

var _selector = require("./selector.js");

//Animate cards when they click on see more
var animateCard = function animateCard(num) {
  //Apply animation to card
  (0, _selector.$$)(".card-container")[num].classList.add('animate-card');
};

exports.animateCard = animateCard;