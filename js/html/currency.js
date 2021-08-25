//Cargar pagina indivudual de la criptomoneda
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getLocalValue(){
    console.log("i");
    let res = fetch('https://cors.bridged.cc/https://api.exchange.ripio.com/api/v1/rate/DAI_ARS/')
            .then(response => response.json())
            .then(data => {
                console.log(data.ask);
                return data.ask;
            });
    return res;
}
let setHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
      .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}
const loadCrypto = (id)=>{
    let IND_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=';
    //Elimina el "/#c/" para obtener el id de la moneda, necesario para la solicitud
    history.pushState({}, 'This works fine', id);
    id = id.slice(4);
    console.log(id);
    fetch(IND_API + id)
        .then(response => response.json())
        .then(data => {
            //Comprueba si el id existe
            if (data.length === 0) {
                console.log(data);
                console.log('No se encontró la criptomoneda');
            }else{
                fetch('https://cors.bridged.cc/https://api.exchange.ripio.com/api/v1/rate/DAI_ARS/')
                .then(response => response.json())
                .then(data2 => {                    
                    let localValue = data2.bid;
                    let modSymbol = data[0].symbol;
                    modSymbol = modSymbol.toUpperCase();
                    let modSymbolTradingview = modSymbol + "USDT";
                    console.log(modSymbolTradingview);
                    //El formato de los precios que agrega comas en funcion de los dígitos, ej. 50000.0 > 50,000.0 
                    //En monedas con precios muy inferiores a 1 ej. SHIB o SAFEMOON, tienen tantos digitos flotantes
                    //que es necesario dejarlo como está sin convertir el número
                    let modifiedPriceLocal, modifiedPriceUSD;
                    if(data[0].current_price < 1){
                        modifiedPriceLocal = (data[0].current_price*localValue).toFixed(2);
                        modifiedPriceUSD = data[0].current_price.toFixed(2);
                         
                    }else{
                        modifiedPriceLocal = numberWithCommas((data[0].current_price*localValue).toFixed(2));
                        modifiedPriceUSD = numberWithCommas(data[0].current_price.toFixed(2));
                    }
                    document.title = `${modSymbol}: $${modifiedPriceUSD} - CryptoPrices`;
                    let percent = data[0].price_change_percentage_24h;
                    percent = percent.toFixed(2);
                    percent = numberWithCommas(percent);
                    const individualPage = `
                    <main>
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
                            <section class="content__buttons">
                                <a href="#" class="content__buttons--btn seeOnTradingview">Ver en tradingview</a>
                                <a href="#" class="content__buttons--btn">Alerta de precio (client side)</a>
                                <a href="#" class="content__buttons--btn convertir">Convertir</a>
                            </section>
                            <section></section>
                            <section class="content__buttons--onclick ">
                                <!-- <a href="#" class="content__buttons--btn seeOnTradingview">Ver en tradingview</a> -->
                                <a href="#" class="content__buttons--btn-onclick">Alerta de precio (client side)</a>
                                <a href="#" class="content__buttons--btn convertir">Convertir</a>
                            </section>
                        </section>
                        <section class="main__content--2">
                            <section class="content__info">
                                <button class="content__info--btn btn-active">Gráfico</button>
                                <button class="content__info--btn">Mercados</button>
                                <button class="content__info--btn">Convertir</button>
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
                                            "interval": "30",
                                            "timezone": "Etc/UTC",
                                            "theme": "dark",
                                            "style": "10",
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
                        `;
                        console.log(individualPage);
                        let element = document.querySelectorAll("[data-router]")[0];
                        setHTML(element, individualPage);
                    });
                }
        });
};
export default loadCrypto;