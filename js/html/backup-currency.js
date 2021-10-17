import {$,$$} from '../selector.js'
import supportedArr from './supportedArr.js';
let sendToTabState = false;

//Cargar pagina indivudual de la criptomoneda
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    fetch(IND_API + id)
        .then(response => response.json())
        .then(data => {
            fetch('https://cors.bridged.cc/https://app.ripio.com/api/v3/rates/?country=AR', {
                method: 'GET',
                'x-cors-grida-api-key': '3c235d81-ceb2-4234-b162-a6b76c886268',
            })
                .then(response => response.json())
                .then(data2 => {
                    //Comprueba si el id existe
                    if (data.length === 0) {
                        console.log(data);
                        console.log('No se encontró la criptomoneda');
                    }else{
                        //data2 Es la api de Ripio, y localvalue hace referencia al 
                        // valor de compra del dolar
                        let localValue = data2[4].buy_rate;
                        //localValue = parseFloat(localValue);
                        let modSymbol = data[0].symbol;
                        modSymbol = modSymbol.toUpperCase();
                        let modSymbolTradingview = modSymbol + "USDT";
                        console.log(localValue);
                        //El formato de los precios que agrega comas en funcion de los dígitos, ej. 50000.0 > 50,000.0 
                        //En monedas con precios muy inferiores a 1 ej. SHIB o SAFEMOON, tienen tantos digitos flotantes
                        //que es necesario dejarlo como está sin convertir el número
                        let modifiedPriceLocal, modifiedPriceUSD;
                        if(data[0].current_price < 0.0005){
                            modifiedPriceLocal = (data[0].current_price*localValue).toFixed(8);
                            modifiedPriceUSD = data[0].current_price.toFixed(8);
                        }else if(data[0].current_price < 1){
                            modifiedPriceLocal = (data[0].current_price*localValue).toFixed(4);
                            modifiedPriceUSD = data[0].current_price.toFixed(4);
                        }else{
                            modifiedPriceLocal = numberWithCommas((data[0].current_price*localValue).toFixed(2));
                            modifiedPriceUSD = numberWithCommas(data[0].current_price.toFixed(2));
                        }
                        let globalInterval = setInterval(() => {
                            if(location.href.indexOf(data[0].id) !== -1){
                                fetch(IND_API + id)
                                    .then(response => response.json())
                                    .then(data => {
                                        if(data[0].current_price < 0.0005){
                                            modifiedPriceLocal = (data[0].current_price*localValue).toFixed(8);
                                            modifiedPriceUSD = data[0].current_price.toFixed(8);
                                        }else if(data[0].current_price < 1){
                                            modifiedPriceLocal = (data[0].current_price*localValue).toFixed(4);
                                            modifiedPriceUSD = data[0].current_price.toFixed(4);
                                        }else{
                                            modifiedPriceLocal = numberWithCommas((data[0].current_price*localValue).toFixed(2));
                                            modifiedPriceUSD = numberWithCommas(data[0].current_price.toFixed(2));
                                        }
                                        if($('.priceCont') !== undefined || $('.priceCont') !== null){
                                            $('.priceCont').innerHTML =`$${modifiedPriceLocal}ARS`;
                                            $('.usdCont').innerHTML = `$${modifiedPriceUSD}USD`;
                                        }
                                        if(sendToTabState === false){
                                            document.title = `${modSymbol}: $${modifiedPriceUSD} - CryptoPrices`;
                                        }
                                    });
                            }else{
                                clearInterval(globalInterval);
                            }
                        }, 10000);
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
                                
                                <section></section>
                                <section class="content__buttons--onclick ">
                                    <!-- <a href="#" class="content__buttons--btn seeOnTradingview">Ver en tradingview</a> -->
                                    <a href="/#c/${data[0].id}" class="content__buttons--btn-onclick" id="sendToTab">Enviar precio a la pestaña (binance)</a>
                                    <a href="/#c/${data[0].id}" class="content__buttons--btn convertir" id="convert">Convertir</a>
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
                            `;
                        let element = document.querySelectorAll("[data-router]")[0];
                        setHTML(element, individualPage);
                        const sendToTab = ()=>{
                            let symbol = data[0].symbol;
                            symbol = symbol.toUpperCase();
                            if(supportedArr.indexOf(symbol) == -1 || symbol == "USDT"){
                                $('#sendToTab').style.opacity = '0.5';
                            }else{
                                $('#sendToTab').addEventListener('click', ()=>{
                                    let state = false;
                                    let interval = setInterval(() => {
                                        if(location.href.indexOf( [0].id) !== -1){
                                            fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}USDT`)
                                                .then(response => response.json())
                                                .then(data => {
                                                    let price = data.price;
                                                    price = parseFloat(price);
                                                    const pedirDecimales = ()=>{
                                                        let decimales = prompt("Escribe la cantidad de decimales que quieres ver: Máx 12");
                                                        if(decimales < 12){
                                                            price = price.toFixed(decimales);
                                                            document.title = `${symbol}: $${price} - (Binance) CryptoPrices`;
                                                            state = true;
                                                            console.log(data[0].id);
                                                        }else{
                                                            pedirDecimales();
                                                        }
                                                    }
                                                    if(state == false) pedirDecimales();
                                                    $('#sendToTab').innerText = "Enviado!";
                                                });
                                                sendToTabState = true;
                                        }else{
                                            sendToTabState = false;
                                            clearInterval(interval);
                                        }
                                    }, 2000);
                                });
                            }
                        }
                        sendToTab();
                    }
                });
        });
    }
export default loadCrypto;