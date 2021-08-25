export const routes = [
    {
        path: '/#/',
        // template: ``,
        template: `
        <main class="main">
            <section class="main__content">
                <h1 class="main__content--title">Los precios de tus criptomonedas favoritas a un click</h1>
                <p class="main__content--text text">Precios, graficos, conversiones, notificaciones y mas...</p>
                <section class="main__content--button-cont"><a href="#" class="main__content--button button active" id="seePrices">Ver mas</a></section>
            </section>
            <section>
                <img src="./home-graphic.png" alt="">
            </section>
        </main>
        `,
    },
    {
        path: '/#/precios',
        template: `
        <h1 class="top-title">Top 100 cryptomonedas por marketcap</h1>
        <p class="top-text text">Estas son las 100 cryptomonedas mas grandes en términos de capitalizacion de mercado</p>
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
            <section class="dollar-info">
                <section class="dollar-name-cont">
                    <div style="display: inline-flex; align-items: baseline"><h2>USD</h2><h4 class="text" style="font-weight: 300; margin-left: 10px;">DAI</h4></div>
                    <h3 class="quote">Compra: <span id="buyDollar">$0.00</h3>
                    <h3 class="quote">Venta: <span id="sellDollar">$0.00</h3>
                    <span style="display:none;" id="hddollar">0</span>
                    <a class="dollar-button d-active d-seemorebtn" id="seemoredollar" >Ver mas cotizaciones</a>
                </section>
            </section>
        </section>
        `
    },
    {
        path: '/#/contacto',
        template: `
        <section id="contact-cont">
            <section class="main__form">
                <h2>Envíame un mensaje:</h2>
                <p class="text">Suelo responder en un plazo de 72hrs</p>
                <form action="" data-netlify="true">
                    <img src="/assets/user.svg" alt=""><input name="Nombre" id="username" placeholder="Nombre" type="text">
                    <img src="/assets/email.svg" alt=""><input name="Correo"id="email" placeholder="Correo electrónico" type="text">
                    <img src="/assets/text.svg" alt=""><textarea name="Mensaje" id="text" placeholder="Mensaje" type="text"></textarea>
                    <input id="send" type="submit" class="nav__container--item active" value="Enviar">
                </form>
            </section>
        </section>
        `,
    },
];
export const routesError = `<h1>ERROR404</h1>
<p>no existe esta pagina</p>`;