export const getPage = (img, name, symbol, ars, usd, 
    intLocalPrice, low, high, pricePercent, percent, 
    mkp, circulating, total, ath) => {
    return `
    <main>
        <section class="currencyContainer">
            <section class="currencyContainer__name">
                <section class="name__cont">
                    <img class="name__cont--img" src="${img}" alt="">
                    <h2 class="name__cont--title">${name}</h2>
                    <h4 class="name__cont--symbol text">${symbol}</h4>
                </section>
                <section class="price__cont">
                    <h3 class="price__cont--ars">$${ars}ARS</h3>
                    <h4 class="price__cont--usd text">$${usd}USD</h4>
                </section>
            </section>
            <section class="currencyContainer__converter">
                <div class="currencyContainer__converter--input-cont">
                    <input class="currencyContainer__converter--input" type="number" value="1">
                    <h3 class="currencyContainer__converter--currency">${symbol}</h3>
                </div> <br>
                <div class="currencyContainer__converter--input-cont">
                    <input class="currencyContainer__converter--input inp2" type="number" value="${intLocalPrice}">
                    <h3 class="currencyContainer__converter--currency-options">$</h3>
                    <h3 class="currencyContainer__converter--currency-options">U$</h3>
                </div>
            </section>
            <section class="currencyContainer__graph">
                <div class="tradingview-widget-container">
                    <div id="tradingview_6001e"></div>
                    <div class="tradingview-widget-copyright"><a href="https://es.tradingview.com/symbols/${symbol}USDT" rel="noopener" target="_blank"><span class="blue-text">${symbol}USDT Gráfico</span></a> por TradingView</div>
                    <script type="text/javascript">
                        new TradingView.widget(
                            {
                                "autosize": true,
                                "symbol": "${symbol}USDT",
                                "interval": "60",
                                "timezone": "America/Argentina/Buenos_Aires",
                                "theme": "dark",
                                "style": "1",
                                "locale": "es",
                                "toolbar_bg": "#f1f3f6",
                                "enable_publishing": false,
                                "allow_symbol_change": true,
                                "container_id": "tradingview_6001e"
                            }
                        );
                    </script>
                </div>
            </section>
            <section class="currencyContainer__24hrschange">
                <section class="change__container">
                    <div class="change__container--title-container">
                        <h3 class="change__container--lowest">$${low}</h3>
                        <h3 class="change__container--highest">$${high}</h3>
                    </div>
                    <div class="change__container--bar-bg">
                        <div class="change__container--bar" style="min-width: ${pricePercent}%"></div>
                    </div>
                </section>
            </section>
            <section class="currencyContainer__statistics">
                <h2 class="currencyContainer__statistics--title">
                    Estadísticas: 
                </h2>
                <h4 class="currencyContainer__statistics--item"> <b> Cambio 24hrs: </b> ${percent}%</h4>
                <h4 class="currencyContainer__statistics--item"> <b> Capitalización: </b> ${mkp}</h4>
                <h4 class="currencyContainer__statistics--item"> <b> Monedas en circ.: </b> ${circulating}</h4>
                <h4 class="currencyContainer__statistics--item"> <b> Total de monedas: </b> ${total}</h4>
                <h4 class="currencyContainer__statistics--item"> <b> ATH </b> ${ath}</h4>
            </section>
        </section>
    </main>
    `;
}