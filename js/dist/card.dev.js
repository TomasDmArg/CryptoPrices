"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = require("./selector.js");

var _theme = require("./theme.js");

var _card = _interopRequireDefault(require("./html/card.js"));

var _currency = _interopRequireDefault(require("./html/currency.js"));

var _binanceP2P = _interopRequireDefault(require("./binanceP2P.js"));

var _router = _interopRequireDefault(require("./router.js"));

var _routes = require("./routes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cardsArr = (0, _selector.$$)('.all-card-container');

var initCards = function initCards() {
  var setDown = function setDown(i) {
    (0, _selector.$$)('.price')[i].style.color = '#ff411f'; // $$('.card__name-container > h2')[i].style.color = '#ff411f';

    (0, _selector.$$)('.buttons > .active')[i].style.backgroundColor = '#ff411f';
    (0, _selector.$$)('.buttons > .active')[i].style.border = '5px solid #ff411f';
    (0, _selector.$$)('.bg')[i].style.backgroundColor = '#ff411f'; // $$('.card-image-img')[i].style.border = '4px solid #ff411f';
  };

  var setUp = function setUp(i) {
    (0, _selector.$$)('.price')[i].style.color = '#06D6A0'; // $$('.card__name-container > h2')[i].style.color = '#06D6A0';

    (0, _selector.$$)('.buttons > .active')[i].style.backgroundColor = '#06D6A0';
    (0, _selector.$$)('.buttons > .active')[i].style.border = '5px solid #06D6A0';
    (0, _selector.$$)('.bg')[i].style.backgroundColor = '#06D6A0'; // $$('.card-image-img')[i].style.border = '4px solid #06D6A0';

    (0, _selector.$$)('.buttons > .active')[i].style.border = '5px solid #06D6A0';
  };

  fetch('https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd').then(function (response) {
    return response.json();
  }).then(function (data) {
    if ((0, _selector.$$)('.card-container').length < 99) {
      var _loop = function _loop(i) {
        var name = data[i].name;
        var symbol = data[i].symbol.toUpperCase();

        if (name.split(" ").length > 2) {
          name = symbol;
        }

        var price = data[i].current_price.toFixed(3);
        var change = data[i].price_change_percentage_24h;
        var image = data[i].image;
        var id = data[i].id;
        (0, _card["default"])(name, symbol, price, change, image, id);

        if ((0, _selector.$$)('.seemorebtn').length > 0) {
          (0, _selector.$$)('.seemorebtn')[i].addEventListener('click', function () {
            var url = "/#c/" + data[i].id;
            (0, _currency["default"])(url);
          });
        }

        if (name.length >= 10) {
          (0, _selector.$$)('.card__name-container > h2')[i].style.fontSize = '2rem';
        }

        if (name.split(" ").length === 2) {
          (0, _selector.$$)('.card__name-container > h2')[i].style.fontSize = '2rem';
        }

        (0, _selector.$$)('.percent')[i].innerHTML.indexOf("-") >= 0 ? setDown(i) : setUp(i);
        (0, _selector.$$)('.convert')[i].addEventListener('click', function () {
          (0, _selector.$$)('.bg')[i].style.animationName = 'converter';
          setTimeout(function () {
            (0, _selector.$$)('.title')[i].style.display = 'block';
            (0, _selector.$$)('.title')[i].style.animationName = 'showup';
            (0, _selector.$$)('.converter-input')[i].style.display = 'block';
            (0, _selector.$$)('.converter-input')[i].style.animationName = 'showup-inp';
            (0, _selector.$$)('.value')[i].style.display = 'block';
            (0, _selector.$$)('.value')[i].style.animationName = 'showup';
            (0, _selector.$$)('.bg-close')[i].style.display = 'block';
            (0, _selector.$$)('.bg-close')[i].style.animationName = 'showup';
            (0, _selector.$$)('.bg-close')[i].addEventListener('click', function () {
              (0, _selector.$$)('.title')[i].style.display = 'none';
              (0, _selector.$$)('.title')[i].style.animationName = 'hide';
              (0, _selector.$$)('.converter-input')[i].style.display = 'none';
              (0, _selector.$$)('.converter-input')[i].style.animationName = 'hide';
              (0, _selector.$$)('.value')[i].style.display = 'none';
              (0, _selector.$$)('.value')[i].style.animationName = 'hide';
              (0, _selector.$$)('.bg-close')[i].style.display = 'none';
              (0, _selector.$$)('.bg-close')[i].style.animationName = 'hide';
              setTimeout(function () {
                (0, _selector.$$)('.bg')[i].style.animationName = 'converter-hide';
              }, 200);
            });
          }, 800);
        });
        (0, _selector.$$)('.card__name-container')[i].style.animationDuration = '0s';
        (0, _selector.$$)('.price')[i].style.animationDuration = '0s';
        (0, _selector.$$)('.card-image')[i].style.animationDuration = '0s';
      };

      for (var i = 0; i < 100; i++) {
        _loop(i);
      }

      var _loop2 = function _loop2(_i) {
        (0, _selector.$$)('.percent')[_i].innerHTML.indexOf("-") >= 0 ? setDown(_i) : setUp(_i);

        (0, _selector.$$)('.convert')[_i].addEventListener('click', function () {
          (0, _selector.$$)('.bg')[_i].style.animationName = 'converter';
          setTimeout(function () {
            (0, _selector.$$)('.title')[_i].style.display = 'block';
            (0, _selector.$$)('.title')[_i].style.animationName = 'showup';
            (0, _selector.$$)('.converter-input')[_i].style.display = 'block';
            (0, _selector.$$)('.converter-input')[_i].style.animationName = 'showup-inp';
            (0, _selector.$$)('.value')[_i].style.display = 'block';
            (0, _selector.$$)('.value')[_i].style.animationName = 'showup';
            (0, _selector.$$)('.bg-close')[_i].style.display = 'block';
            (0, _selector.$$)('.bg-close')[_i].style.animationName = 'showup';

            (0, _selector.$$)('.bg-close')[_i].addEventListener('click', function () {
              (0, _selector.$$)('.title')[_i].style.display = 'none';
              (0, _selector.$$)('.title')[_i].style.animationName = 'hide';
              (0, _selector.$$)('.converter-input')[_i].style.display = 'none';
              (0, _selector.$$)('.converter-input')[_i].style.animationName = 'hide';
              (0, _selector.$$)('.value')[_i].style.display = 'none';
              (0, _selector.$$)('.value')[_i].style.animationName = 'hide';
              (0, _selector.$$)('.bg-close')[_i].style.display = 'none';
              (0, _selector.$$)('.bg-close')[_i].style.animationName = 'hide';
              setTimeout(function () {
                (0, _selector.$$)('.bg')[_i].style.animationName = 'converter-hide';
              }, 200);
            });
          }, 400);
        });
      };

      for (var _i = 0; _i < cardsArr.length; _i++) {
        _loop2(_i);
      }
    }
  });
  (0, _binanceP2P["default"])();
  fetch('https://criptoya.com/api/binancep2p/sell/usdt/ars/5').then(function (response) {
    return response.json();
  }).then(function (data2) {
    var promVent = 0;

    for (var i = 0; i < 5; i++) {
      promVent += parseFloat(data2.data[i].adv.price);
    }

    promVent = promVent / 5;
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(function (response) {
      return response.json();
    }).then(function (data3) {
      (0, _selector.$)('.buyDollar').innerHTML = "$" + data3[1].casa.venta;
      (0, _selector.$)('.sellDollar').innerHTML = "$" + data3[1].casa.compra;
    });

    var getCurrencyValue = function getCurrencyValue(id) {
      var hiddenValue = (0, _selector.$$)('.hidden-value')[id].innerHTML;
      return hiddenValue * promVent;
    };

    var _loop3 = function _loop3(_i2) {
      var input = (0, _selector.$$)('input[type=number')[_i2];

      (0, _selector.$$)('input[type=number]')[_i2].addEventListener('keydown', function () {
        setTimeout(function () {
          if (input.value > 20000000) {
            return false;
          }

          var currency = getCurrencyValue(_i2);
          var value = (input.value * currency).toFixed(2);
          (0, _selector.$$)('.value-converted')[_i2].innerHTML = "$".concat(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }, 100);
      });
    };

    for (var _i2 = 0; _i2 < (0, _selector.$$)('input[type=number]').length; _i2++) {
      _loop3(_i2);
    }
  });
};

var _default = initCards;
exports["default"] = _default;