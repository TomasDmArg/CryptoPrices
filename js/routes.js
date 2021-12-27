export const routes = [
    {
        path: '/#/',
        // template: ``,
        template: `
        <main>
            <section class="main">
                <section class="main__content">
                    <h1 class="main__content--title">Dólar y cripto, <br> unificados</h1>
                    <p class="main__content--text text">Precios, graficos, conversiones, notificaciones y mas...</p>
                    <section class="main__content--button-cont">
                        <a href="/#/precios" class="main__content--button button active" id="seePrices">Ver mas</a>
                    </section>
                </section>
                <section class="main__image">
                    <img src="./home-graphic.png" alt="">
                </section>
            </section>
        </main>
        `,
    },
    {
        path: '/#/precios',
        template: `
        <h1 class="top-title">Top 100 criptomonedas por marketcap</h1>
        <p class="top-text text">Estas son las 100 criptomonedas mas grandes en términos de capitalizacion de mercado</p>
        <section class="search-container">
            <div class="search"><input type="text" placeholder="Buscar" class="search-input"><span><b>CTRL</b><b>B</b></span></div>
            <section class="results-container">
                <div class="search-result">Escribe 2 letras <span><b>CTRL</b><b>Enter</b></span></div>
                <div class="search-result"></div>
                <div class="search-result"></div>
                <div class="search-result"></div>
                <div class="search-result"></div>
                <div class="search-result"></div>
                <div class="search-result"></div>
            </section>
            
        </section>
        <section id="content" class="all-card-container">
            <section class="dollar-info-main">
                <section class="dollar-name-cont-main">
                    <div style="display: inline-flex; align-items: baseline"><h2>USD</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Bitso</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
                    <a class="dollar-button d-active d-seemorebtn" id="seemoredollar" >Ver mas cotizaciones</a>
            </section>
        </section>
        `
    },
    {
        path: '/#/contacto',
        template: `
        <section id="contact-cont">
            <h2 class="contact-title">Medios de contacto:</h2>
            <p class="text ">Suelo responder en un plazo de menos de 48hrs</p>
            <section class="contact-info">
                <div class="contact-info-image">
                    <img class="contact-info-image-img" src="./assets/at-outline.svg" alt="">
                </div>
                <p class="contact-info-text">Correo: <a class="contact-link" href="mailto:info@tmdm.com.ar" target="_blank">info@tmdm.com.ar</a></p>
            </section>
            <section class="contact-info">
                <div class="contact-info-image">
                    <img class="contact-info-image-img" src="./assets/telegram.svg" alt="">
                </div>
                <p class="contact-info-text">Telegram: <a class="contact-link" href="https://t.me/tomasdmarg" target="_blank">@tomasdmarg</a></p>
            </section>
        </section>
        `,
    },
    {
        path: '/#/not-found',
        template: `
        <section id="not-found">
            <img src="./assets/404.webp">
            <h1>Esta página no se ha encontrado</h1>
            <p>Error 404 Not Found</p>
            <a href="/">Ir al inicio</a>
        </section>
        `,
    },
    {
        path: '/#/dolar',
        template: `
        <h1 class="top-title">Cotizaciones dolar hoy</h1>
        <p class="top-text text">Estas son las diferentes cotizaciones del dolar al dia de hoy. Fuentes: Cryptoya/DolarSi/Ripio</p>
        <section id="content" class="all-card-container">
        <section class="dollar-info">
        <section class="dollar-name-cont">
        <div style="display: inline-flex; align-items: baseline"><h2>Oficial</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Banco Nación*</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
            </section>
            <section class="dollar-info">
                <section class="dollar-name-cont">
                    <div style="display: inline-flex; align-items: baseline"><h2>Blue</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">DolarSi</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
                </section>
            <section class="dollar-info">
                <section class="dollar-name-cont">
                    <div style="display: inline-flex; align-items: baseline"><h2>DAI</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Ripio</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
            </section>
            <section class="dollar-info">
            <section class="dollar-name-cont">
            <div style="display: inline-flex; align-items: baseline"><h2>USDT</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Binance P2P*</h4></div>
            <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
            <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
            </section>
            </section>
            <section class="dollar-info">
                <section class="dollar-name-cont">
                    <div style="display: inline-flex; align-items: baseline"><h2>Dolar Bolsa</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Dolarsi</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
            </section>
            <section class="dollar-info">
                <section class="dollar-name-cont">
                    <div style="display: inline-flex; align-items: baseline"><h2>Dolar CCL</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">Dolarsi</h4></div>
                    <h3 class="quote">Compra: <span class="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span class="sellDollar">$0.00</h3>
                </section>
            </section>
        </section>
        <section class="dollar-converter">
            <div class="dollar-name-cont"><img src="assets/calculator-outline.svg" alt="" class="emoji-img" /><h2>Calculadora</h2></div>
            <section class="converter__config">
                <div class="converter__type">
                        <p class="text">Tipo de dolar:</p>
                        <button type="button">Oficial</button> 
                        <button type="button"  title="Oficial + imp. pais + percepcion ganancias">Tarjeta</button> 
                        <button type="button" >Blue</button> 
                        <button type="button" >USDT Bitso</button> 
                        <button type="button" >USDT Binance P2P</button> 
                        <button type="button" >Bolsa</button> 
                        <button type="button" >CCL</button> 
                </div>
                <section class="converter__options">
                    <div class="converter__options--first">
                        <p class="text">Quiero:</p>
                        <button type="button">Comprar</button> 
                        <button type="button">Vender</button> 
                    </div>
                    <div class="converter__options--second">
                        <p class="text">En:*</p>
                        <button type="button">ARS</button> 
                        <button type="button">USD</button> 
                    </div>
                </section>
                <p class="fee-text text">Comisión: (si existe)</p>
                <input type="text" value="0" class="converter__fee" /><span class="percent-text">%</span>
            </section>
            <section class="converter__result">
                <p class="text" id="qt-t">Ingrese la cantidad de la moneda seleccionada</p>
                <input type="number" id="qt" placeholder="ej: 1000">
                <p class="text qt-unit">ARS</p>
                <p class="text" id="result">Te darán: </p>
                <p class="text" id="result-disclaimer"></p>
            </section>
        </section>
                    `
                },
    {
        path: "/#/negocios",
        template: `
            <main>
                <section class="business">
                    <section class="business__landing">
                        <h1 class="business__landing--title">Negocios</h1>
                        <p class="business__landing--text text">En esta seccion vas a poder administrar tus ventas en crypto, y generar los montos a pagar del cliente en una determinada criptomoneda</p>
                        <a class="business__landing--button">Empezar</a>
                        <p class="business__landing--text2 text ">Los datos se guardan en local, y si se pierden los datos, no son recuperables</p>
                    </section>
                </section>
            </main>
        `
    },
    {
        path: "/#/negocios/create",
        template: `
            <section class="bs-create">
                <section class="bs-create__sign-up">
                    <section class="bs-create__sign-up--first-cont">
                        <h2 class="bs-create__sign-up--login">Crear sesion</h2>
                        <p class="bs-create__sign-up--login-text">Estos datos seran guardados de forma local en forma de cookies, es recomendable guardar informacion que pueda ser necesaria ya que no son recuperables</p>
                    </section>
                    <form action="" class="bs-create__sign-up--form">
                        <h4 class="sign-up__form--field">Nombre de la empresa/negocio <b class="required">*</b></h4>
                        <input type="text" id="name"  placeholder="Nombre">
                        <h4 class="sign-up__form--field">Correo: <b class="required">*</b></h4>
                        <input type="text" id="email" placeholder="ejemplo@dominio.com">
                        <h4 class="sign-up__form--field">CUIT: (Opcional)</h4>
                        <input type="text" id="cuit" placeholder="11-11111111-11">
                        <h4 class="sign-up__form--field">Dirección: (Opcional)</h4>
                        <input type="text" id="address" placeholder="(De la empresa/negocio) Ej: Av. Tal 1535, Ciudad, Prov.">
                        <h4 class="sign-up__form--field">Foto de perfil: (Opcional)</h4>
                        <input type="text" id="profile" placeholder="https://www.url.com/u/logo.png">
                        <a class="sign-up__form--button">Crear</a>
                    </form>
                </section>
            </section>
        `
    },
    {
        path: "/#/negocios/dashboard",
        template: `
        <main>
            <section class="bs-dashboard">
                <section class="bs-dashboard__aside">
                    <img src="https://tmdm.com.ar/assets/favicon.png" alt="" class="bs-dashboard__aside--profile">
                    <section class="aside__buttons">
                        <img title="no disponible todavía" src="../assets/cart.svg" alt="" class="aside__buttons--cart">
                        <img title="no disponible todavía" src="../assets/history.svg" alt="" class="aside__buttons--invoices">
                        <img src="../assets/delete.svg" alt="" class="aside__buttons--delete">
                    </section>
                </section>
                <section class="bs-dashboard__main">
                    <h2 class="bs-dashboard__main--title">Hola, %nombre% </h2>
                    <p class="bs-dashboard__main--text">Desde aqui podras crear ventas, gestionar las que ya hiciste, y enviar comprobantes por correo</p>
                </section>
                <section class="bs-dashboard__sales">
                    <h2 class="bs-dashboard__sales--title">Ventas durante la sesion: </h2>
                    <p class="bs-dashboard__sales--ars">$127,535.00ARS</p>
                    <p class="bs-dashboard__sales--usd">$930.00USD</p>
                    <p class="bs-dashboard__sales--hide">
                        Ocultar
                    </p>
                </section>
                <section class="bs-dashboard__new-invoice">
                    <h2  class="bs-dashboard__new-invoice--title">Nueva venta</h2>
                    <input type="text" placeholder="$0,00ARS"><br>
                    <a class="bs-dashboard__new-invoice--create">Crear</a>
                </section>
            </section>
        </main>
        `
    },
    {
        path: "/#/negocios/dashboard/venta",
        template: `
        <section class="sale">
            <section class="bs-dashboard__aside">
                <img src="https://tmdm.com.ar/assets/favicon.png" alt="" class="bs-dashboard__aside--profile">
                <section class="aside__buttons">
                    <img title="no disponible todavía" src="../assets/cart.svg" alt="" class="aside__buttons--cart">
                    <img title="no disponible todavía" src="../assets/history.svg" alt="" class="aside__buttons--invoices">
                    <img src="../assets/delete.svg" alt="" class="aside__buttons--delete">
                </section>
            </section>
            <section class="sale__main">
                <h2 class="sale__main--title">Nueva venta</h2>
                <h4 class="sale__main--field-title">Monto</h4>
                <input id="sale-main-inp-1" type="text" class="sale__main--input">
                <img src="./assets/pricetags-outline.svg" alt="Monto: " class="sale__main--input-img"/>
                <img src="" alt="" />
                <h4 class="sale__main--field-title">Moneda</h4>
                <input id="sale-main-inp-2" type="text" class="sale__main--input">
                <img src="./assets/logo-bitcoin.svg" alt="Moneda: " class="sale__main--input-img"/>
                <section class="results-container">
                    <div class="search-result">Escribe 2 letras <span><b>CTRL</b><b>Enter</b></span></div>
                    <div class="search-result"></div>
                    <div class="search-result"></div>
                    <div class="search-result"></div>
                </section>
                <h4 class="sale__main--field-title">DNI</h4>
                <input id="sale-main-inp-3" type="text" class="sale__main--input">
                <img src="./assets/person-circle-outline.svg" alt="DNI: " class="sale__main--input-img"/>
                <h4 class="sale__main--field-title">Recargo(+%) / Descuento (-%)</h4>
                <input id="sale-main-inp-4" type="number" class="sale__main--input">
                <img src="./assets/calculator-outline.svg" alt="DNI: " class="sale__main--input-img"/>
                <h4 class="sale__main--field-title">Correo del cliente</h4>
                <input type="text" class="sale__main--input" value="proximamente..." disabled>
                <br>
                <button type="button" class="sale__main--button">Generar</button>
                <section class="sale__results">
                    <h2 class="sale__results--title">Tu cliente te tiene que enviar: </h2>
                    <p class="sale__results--amount">$0.0005BTC</p>
                    <p class="sale__results--equivalent">~1000ARS</p>
                    <button class="sale__results--button">Descargar PDF</button>
                </section>
            </section>
        </section>
            <section class="sale__results-pdf">            
                <iframe id="iframe" frameborder="0"></iframe>
            </section>
        ` 
    } 
];
export const routesError = `<h1>Esta página no se ha encontrado</h1>
<p>Error 404 Not Found</p>`;