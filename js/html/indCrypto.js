const indCrypto = (data, modSymbol, modifiedPriceUSD, modifiedPriceLocal, percent, modSymbolTradingview)=>{
                        return `<main>
                            <section class="main__content">
                            <section class="main__content--1">
                                <section class="content__info">
                                    <section class="content__info--name">
                                        <img class="content__info--img" src="${data[0].image}" alt="">
                                        <h2 class="mainTitle">${data[0].name}</h2>
                                        <h4 class="symbol text">${modSymbol}</h4>
                                    </section>
                                    <section class="content__info--price">
                                        <h3 class="priceCont">$${modifiedPriceLocal}ARS</h3>
                                        <h4 class="usdCont text">$${modifiedPriceUSD}USD</h4>
                                        <h4 class="change">${percent}%</h4>
                                    </section>
                                </section>
                                <section></section>
                                <section class="content__buttons--onclick ">
                                    <!-- <a href="#" class="content__buttons--btn seeOnTradingview">Ver en tradingview</a> -->
                                    <a href="#" class="content__buttons--btn-onclick">Ver en pestaña (Alta frecuencia)</a>
                                    <a href="#" class="content__buttons--btn convertir">Convertir</a>
                                </section>
                            </section>
                            <section class="main__content--2">
                                <section class="content__info">
                                    <button class="content__info--btn btn-active">Gráfico</button>
                                    <button class="content__info--btn">Convertir3</button>
                                </section>
                                <section class="graph">
                                    <div class="tradingview-widget-container">
                                        <div id="tradingview_87f40"></div>
                                        <div class="tradingview-widget-copyright"><a href="https://es.tradingview.com/symbols/BTCUSDT/" rel="noopener" target="_blank"><span class="blue-text">BTCUSDT Gráfico</span></a> por TradingView</div>
                                        <script type="text/javascript">
                                            new TradingView.widget({
                                                "width": 980,
                                                "height": 610,
                                                "symbol": "${modSymbolTradingview}",
                                                "interval": "D",
                                                "timezone": "Etc/UTC",
                                                "theme": "dark",
                                                "style": "2",
                                                "locale": "es",
                                                "toolbar_bg": "#f1f3f6",
                                                "enable_publishing": false,
                                                "allow_symbol_change": true,
                                                "container_id": "tradingview_87f40"
                                            });
                                        </script>
                                    </div>
                                </section>
                            </section>
                            </section>
                            </main>
                            `;}
export default indCrypto;