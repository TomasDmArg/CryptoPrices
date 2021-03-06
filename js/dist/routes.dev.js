"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesError = exports.routes = void 0;
var routes = [{
  path: '/#/',
  // template: ``,
  template: "\n        <main class=\"main\">\n            <section class=\"main__content\">\n                <h1 class=\"main__content--title\">Los precios de tus criptomonedas favoritas a un click</h1>\n                <p class=\"main__content--text text\">Precios, graficos, conversiones, notificaciones y mas...</p>\n                <section class=\"main__content--button-cont\"><a href=\"/#/precios\" class=\"main__content--button button active\" id=\"seePrices\">Ver mas</a></section>\n            </section>\n            <section>\n                <img src=\"./home-graphic.png\" alt=\"\">\n            </section>\n        </main>\n        "
}, {
  path: '/#/precios',
  template: "\n        <h1 class=\"top-title\">Top 100 cryptomonedas por marketcap</h1>\n        <p class=\"top-text text\">Estas son las 100 cryptomonedas mas grandes en t\xE9rminos de capitalizacion de mercado</p>\n        <section class=\"search-container\">\n            <div class=\"search\"><input type=\"text\" placeholder=\"Buscar\" class=\"search-input\"><span><b>CTRL</b><b>B</b></span></div>\n            <section class=\"results-container\">\n                <div class=\"search-result\">Escribe 2 letras <span><b>CTRL</b><b>Enter</b></span></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n            </section>\n            \n        </section>\n        <section id=\"content\" class=\"all-card-container\">\n            <section class=\"dollar-info\">\n                <section class=\"dollar-name-cont\">\n                    <div style=\"display: inline-flex; align-items: baseline\"><h2>USD</h2><h4 class=\"text\" style=\"font-weight: 300; margin-left: 10px;\">DAI</h4></div>\n                    <h3 class=\"quote\">Compra: <span id=\"buyDollar\">$0.00</h3>\n                    <h3 class=\"quote\">Venta: <span id=\"sellDollar\">$0.00</h3>\n                </section>\n                    <a class=\"dollar-button d-active d-seemorebtn\" id=\"seemoredollar\" >Ver mas cotizaciones</a>\n            </section>\n        </section>\n        "
}, {
  path: '/#/contacto',
  template: "\n        <section id=\"contact-cont\">\n            <section class=\"main__form\">\n                <h2>Env\xEDame un mensaje:</h2>\n                <p class=\"text\">Suelo responder en un plazo de 72hrs</p>\n                <form action=\"\" data-netlify=\"true\">\n                    <img src=\"/assets/user.svg\" alt=\"\"><input name=\"Nombre\" id=\"username\" placeholder=\"Nombre\" type=\"text\">\n                    <img src=\"/assets/email.svg\" alt=\"\"><input name=\"Correo\"id=\"email\" placeholder=\"Correo electr\xF3nico\" type=\"text\">\n                    <img src=\"/assets/text.svg\" alt=\"\"><textarea name=\"Mensaje\" id=\"text\" placeholder=\"Mensaje\" type=\"text\"></textarea>\n                    <input id=\"send\" type=\"submit\" class=\"nav__container--item active\" value=\"Enviar\">\n                </form>\n            </section>\n        </section>\n        "
}, {
  path: '/#/not-found',
  template: "\n        <section id=\"not-found\">\n            <img src=\"./assets/404.webp\">\n            <h1>Esta p\xE1gina no se ha encontrado</h1>\n            <p>Error 404 Not Found</p>\n            <a href=\"/\">Ir al inicio</a>\n        </section>\n        "
}];
exports.routes = routes;
var routesError = "<h1>Esta p\xE1gina no se ha encontrado</h1>\n<p>Error 404 Not Found</p>";
exports.routesError = routesError;