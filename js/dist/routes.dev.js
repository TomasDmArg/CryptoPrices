"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routesError = exports.routes = void 0;
var routes = [{
  path: '/#/',
  // template: ``,
  template: "\n        <main>\n            <section class=\"main\">\n                <section class=\"main__content\">\n                    <h1 class=\"main__content--title\">D\xF3lar y cripto, <br> unificados</h1>\n                    <p class=\"main__content--text text\">Precios, graficos, conversiones, notificaciones y mas...</p>\n                    <section class=\"main__content--button-cont\">\n                        <a href=\"/#/precios\" class=\"main__content--button button active\" id=\"seePrices\">Ver mas</a>\n                    </section>\n                </section>\n                <section class=\"main__image\">\n                    <img src=\"./home-graphic.png\" alt=\"\">\n                </section>\n            </section>\n        </main>\n        "
}, {
  path: '/#/precios',
  template: "\n        <h1 class=\"top-title\">Top 100 criptomonedas por marketcap</h1>\n        <p class=\"top-text text\">Estas son las 100 criptomonedas mas grandes en t\xE9rminos de capitalizacion de mercado</p>\n        <section class=\"search-container\">\n            <div class=\"search\"><input type=\"text\" placeholder=\"Buscar\" class=\"search-input\"><span><b>CTRL</b><b>B</b></span></div>\n            <section class=\"results-container\">\n                <div class=\"search-result\">Escribe 2 letras <span><b>CTRL</b><b>Enter</b></span></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n                <div class=\"search-result\"></div>\n            </section>\n            \n        </section>\n        <section id=\"content\" class=\"all-card-container\">\n            <section class=\"dollar-info-main\">\n                <section class=\"dollar-name-cont-main\">\n                    <div style=\"display: inline-flex; align-items: baseline\"><h2>USD</h2><h4 class=\"text\" style=\"font-weight: 300; margin-left: 10px;\">Bitso</h4></div>\n                    <h3 class=\"quote\">Compra: <span class=\"buyDollar\">$0.00</h3>\n                    <h3 class=\"quote\">Venta: <span class=\"sellDollar\">$0.00</h3>\n                </section>\n                    <a class=\"dollar-button d-active d-seemorebtn\" id=\"seemoredollar\" >Ver mas cotizaciones</a>\n            </section>\n        </section>\n        "
}, {
  path: '/#/contacto',
  template: "\n        <section id=\"contact-cont\">\n            <h2 class=\"contact-title\">Medios de contacto:</h2>\n            <p class=\"text \">Suelo responder en un plazo de menos de 48hrs</p>\n            <section class=\"contact-info\">\n                <div class=\"contact-info-image\">\n                    <img class=\"contact-info-image-img\" src=\"./assets/at-outline.svg\" alt=\"\">\n                </div>\n                <p class=\"contact-info-text\">Correo: <a class=\"contact-link\" href=\"mailto:info@tmdm.com.ar\" target=\"_blank\">info@tmdm.com.ar</a></p>\n            </section>\n            <section class=\"contact-info\">\n                <div class=\"contact-info-image\">\n                    <img class=\"contact-info-image-img\" src=\"./assets/telegram.svg\" alt=\"\">\n                </div>\n                <p class=\"contact-info-text\">Telegram: <a class=\"contact-link\" href=\"https://t.me/tomasdmarg\" target=\"_blank\">@tomasdmarg</a></p>\n            </section>\n        </section>\n        "
}, {
  path: '/#/not-found',
  template: "\n        <section id=\"not-found\">\n            <img src=\"./assets/404.webp\">\n            <h1>Esta p\xE1gina no se ha encontrado</h1>\n            <p>Error 404 Not Found</p>\n            <a href=\"/\">Ir al inicio</a>\n        </section>\n        "
}, {
  path: '/#/dolar',
  template: "\n        <h1 class=\"top-title\">Cotizaciones dolar hoy</h1>\n        <p class=\"top-text text\">Estas son las diferentes cotizaciones del dolar al dia de hoy. Fuentes: Cryptoya/DolarSi/Ripio</p>\n        <section id=\"content\" class=\"all-card-container\">\n            \n        </section>\n        <section class=\"dollar-converter\">\n            <div class=\"dollar-name-cont\"><img src=\"assets/calculator-outline.svg\" alt=\"\" class=\"emoji-img\" /><h2>Calculadora</h2></div>\n            <section class=\"converter__config\">\n                <div class=\"converter__type\">\n                        <p class=\"text\">Tipo de dolar:</p>\n                        <button type=\"button\">Oficial</button> \n                        <button type=\"button\"  title=\"Oficial + imp. pais + percepcion ganancias\">Tarjeta</button> \n                        <button type=\"button\" >Blue</button> \n                        <button type=\"button\" >CCL</button> \n                        <button type=\"button\" >Bolsa</button> \n                        <button type=\"button\" >USDT Bitso</button> \n                        <button type=\"button\" >USDT Binance P2P</button> \n                        <button type=\"button\" >USDT Belo</button> \n                        <button type=\"button\" >USDT Buenbit</button> \n                        <button type=\"button\" >Brubank</button> \n                </div>\n                <section class=\"converter__options\">\n                    <div class=\"converter__options--first\">\n                        <p class=\"text\">Quiero:</p>\n                        <button type=\"button\">Comprar</button> \n                        <button type=\"button\">Vender</button> \n                    </div>\n                    <div class=\"converter__options--second\">\n                        <p class=\"text\">En:*</p>\n                        <button type=\"button\">ARS</button> \n                        <button type=\"button\">USD</button> \n                    </div>\n                </section>\n                <p class=\"fee-text text\">Comisi\xF3n: (si existe)</p>\n                <input type=\"text\" value=\"0\" class=\"converter__fee\" /><span class=\"percent-text\">%</span>\n            </section>\n            <section class=\"converter__result\">\n                <p class=\"text\" id=\"qt-t\">Ingrese la cantidad de la moneda seleccionada</p>\n                <input type=\"number\" id=\"qt\" placeholder=\"ej: 1000\">\n                <p class=\"text qt-unit\">ARS</p>\n                <p class=\"text\" id=\"result\">Te dar\xE1n: </p>\n                <p class=\"text\" id=\"result-disclaimer\"></p>\n            </section>\n        </section>\n                    "
}, {
  path: "/#/negocios",
  template: "\n            <main>\n                <section class=\"business\">\n                    <section class=\"business__landing\">\n                        <h1 class=\"business__landing--title\">Negocios</h1>\n                        <p class=\"business__landing--text text\">En esta seccion vas a poder administrar tus ventas en crypto, y generar los montos a pagar del cliente en una determinada criptomoneda</p>\n                        <a class=\"business__landing--button\">Empezar</a>\n                        <p class=\"business__landing--text2 text \">Los datos se guardan en local, y si se pierden los datos, no son recuperables</p>\n                    </section>\n                </section>\n            </main>\n        "
}, {
  path: "/#/negocios/create",
  template: "\n            <section class=\"bs-create\">\n                <section class=\"bs-create__sign-up\">\n                    <section class=\"bs-create__sign-up--first-cont\">\n                        <h2 class=\"bs-create__sign-up--login\">Crear sesion</h2>\n                        <p class=\"bs-create__sign-up--login-text\">Estos datos seran guardados de forma local en forma de cookies, es recomendable guardar informacion que pueda ser necesaria ya que no son recuperables</p>\n                    </section>\n                    <form action=\"\" class=\"bs-create__sign-up--form\">\n                        <h4 class=\"sign-up__form--field\">Nombre de la empresa/negocio <b class=\"required\">*</b></h4>\n                        <input type=\"text\" id=\"name\"  placeholder=\"Nombre\">\n                        <h4 class=\"sign-up__form--field\">Correo: <b class=\"required\">*</b></h4>\n                        <input type=\"text\" id=\"email\" placeholder=\"ejemplo@dominio.com\">\n                        <h4 class=\"sign-up__form--field\">CUIT: (Opcional)</h4>\n                        <input type=\"text\" id=\"cuit\" placeholder=\"11-11111111-11\">\n                        <h4 class=\"sign-up__form--field\">Direcci\xF3n: (Opcional)</h4>\n                        <input type=\"text\" id=\"address\" placeholder=\"(De la empresa/negocio) Ej: Av. Tal 1535, Ciudad, Prov.\">\n                        <h4 class=\"sign-up__form--field\">Foto de perfil: (Opcional)</h4>\n                        <input type=\"text\" id=\"profile\" placeholder=\"https://www.url.com/u/logo.png\">\n                        <a class=\"sign-up__form--button\">Crear</a>\n                    </form>\n                </section>\n            </section>\n        "
}, {
  path: "/#/negocios/dashboard",
  template: "\n        <main>\n            <section class=\"bs-dashboard\">\n                <section class=\"bs-dashboard__aside\">\n                    <img src=\"https://tmdm.com.ar/assets/favicon.png\" alt=\"\" class=\"bs-dashboard__aside--profile\">\n                    <section class=\"aside__buttons\">\n                        <img title=\"no disponible todav\xEDa\" src=\"../assets/cart.svg\" alt=\"\" class=\"aside__buttons--cart\">\n                        <img title=\"no disponible todav\xEDa\" src=\"../assets/history.svg\" alt=\"\" class=\"aside__buttons--invoices\">\n                        <img src=\"../assets/delete.svg\" alt=\"\" class=\"aside__buttons--delete\">\n                    </section>\n                </section>\n                <section class=\"bs-dashboard__main\">\n                    <h2 class=\"bs-dashboard__main--title\">Hola, %nombre% </h2>\n                    <p class=\"bs-dashboard__main--text\">Desde aqui podras crear ventas, gestionar las que ya hiciste, y enviar comprobantes por correo</p>\n                </section>\n                <section class=\"bs-dashboard__sales\">\n                    <h2 class=\"bs-dashboard__sales--title\">Ventas durante la sesion: </h2>\n                    <p class=\"bs-dashboard__sales--ars\">$127,535.00ARS</p>\n                    <p class=\"bs-dashboard__sales--usd\">$930.00USD</p>\n                    <p class=\"bs-dashboard__sales--hide\">\n                        Ocultar\n                    </p>\n                </section>\n                <section class=\"bs-dashboard__new-invoice\">\n                    <h2  class=\"bs-dashboard__new-invoice--title\">Nueva venta</h2>\n                    <input type=\"text\" placeholder=\"$0,00ARS\"><br>\n                    <a class=\"bs-dashboard__new-invoice--create\">Crear</a>\n                </section>\n            </section>\n        </main>\n        "
}, {
  path: "/#/negocios/dashboard/venta",
  template: "\n        <section class=\"sale\">\n            <section class=\"bs-dashboard__aside\">\n                <img src=\"https://tmdm.com.ar/assets/favicon.png\" alt=\"\" class=\"bs-dashboard__aside--profile\">\n                <section class=\"aside__buttons\">\n                    <img title=\"no disponible todav\xEDa\" src=\"../assets/cart.svg\" alt=\"\" class=\"aside__buttons--cart\">\n                    <img title=\"no disponible todav\xEDa\" src=\"../assets/history.svg\" alt=\"\" class=\"aside__buttons--invoices\">\n                    <img src=\"../assets/delete.svg\" alt=\"\" class=\"aside__buttons--delete\">\n                </section>\n            </section>\n            <section class=\"sale__main\">\n                <h2 class=\"sale__main--title\">Nueva venta</h2>\n                <h4 class=\"sale__main--field-title\">Monto</h4>\n                <input id=\"sale-main-inp-1\" type=\"text\" class=\"sale__main--input\">\n                <img src=\"./assets/pricetags-outline.svg\" alt=\"Monto: \" class=\"sale__main--input-img\"/>\n                <img src=\"\" alt=\"\" />\n                <h4 class=\"sale__main--field-title\">Moneda</h4>\n                <input id=\"sale-main-inp-2\" type=\"text\" class=\"sale__main--input\">\n                <img src=\"./assets/logo-bitcoin.svg\" alt=\"Moneda: \" class=\"sale__main--input-img\"/>\n                <section class=\"results-container\">\n                    <div class=\"search-result\">Escribe 2 letras <span><b>CTRL</b><b>Enter</b></span></div>\n                    <div class=\"search-result\"></div>\n                    <div class=\"search-result\"></div>\n                    <div class=\"search-result\"></div>\n                </section>\n                <h4 class=\"sale__main--field-title\">DNI</h4>\n                <input id=\"sale-main-inp-3\" type=\"text\" class=\"sale__main--input\">\n                <img src=\"./assets/person-circle-outline.svg\" alt=\"DNI: \" class=\"sale__main--input-img\"/>\n                <h4 class=\"sale__main--field-title\">Recargo(+%) / Descuento (-%)</h4>\n                <input id=\"sale-main-inp-4\" type=\"number\" class=\"sale__main--input\">\n                <img src=\"./assets/calculator-outline.svg\" alt=\"DNI: \" class=\"sale__main--input-img\"/>\n                <h4 class=\"sale__main--field-title\">Correo del cliente</h4>\n                <input type=\"text\" class=\"sale__main--input\" value=\"proximamente...\" disabled>\n                <br>\n                <button type=\"button\" class=\"sale__main--button\">Generar</button>\n                <section class=\"sale__results\">\n                    <h2 class=\"sale__results--title\">Tu cliente te tiene que enviar: </h2>\n                    <p class=\"sale__results--amount\">$0.0005BTC</p>\n                    <p class=\"sale__results--equivalent\">~1000ARS</p>\n                    <button class=\"sale__results--button\">Descargar PDF</button>\n                </section>\n            </section>\n        </section>\n            <section class=\"sale__results-pdf\">            \n                <iframe id=\"iframe\" frameborder=\"0\"></iframe>\n            </section>\n        "
}];
exports.routes = routes;
var routesError = "<h1>Esta p\xE1gina no se ha encontrado</h1>\n<p>Error 404 Not Found</p>";
exports.routesError = routesError;