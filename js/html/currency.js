import {$,$$} from '../selector.js'
import supportedArr from './supportedArr.js';
let sendToTabState = false;

//Cargar pagina indivudual de la criptomoneda
export const numberWithCommas = (x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export let setHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}
export const loadCrypto = (id)=>{
    let IND_API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=';
    //Elimina el "/#c/" para obtener el id de la moneda, necesario para la solicitud
    history.pushState({}, 'This works fine', id);
    id = id.slice(4);
    fetch(IND_API + id)
        .then(response => response.json())
        .then(data => {
            fetch('https://cors.bridged.cc/https://app.ripio.com/api/v3/rates/?country=AR')
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
                        let modifiedPriceLocal, modifiedPriceUSD
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
                        let intLocalPrice, intPriceUSD;
                        intLocalPrice = data[0].current_price*localValue;
                        intPriceUSD = data[0].current_price.toFixed(2);
                        let globalInterval = setInterval(() => {
                            if(location.href.indexOf(data[0].id) !== -1){
                                fetch(IND_API + id)
                                    .then(response => response.json())
                                    .then(data => {
                                        intLocalPrice = data[0].current_price*localValue;
                                        intPriceUSD = data[0].current_price.toFixed(2);
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
                                        if($('.price__cont--ars') !== undefined || $('.price__cont--ars') !== null){
                                            $('.price__cont--ars').innerHTML =`$${modifiedPriceLocal}ARS`;
                                            $('.price__cont--usd').innerHTML = `$${modifiedPriceUSD}USD`;
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
                        let val1 = data[0].high_24h - data[0].low_24h;
                        let val2 = data[0].current_price - data[0].low_24h;
                        let pricePercent = (val2/val1)*100;
                        const shortNumber = num =>{
                            if(num == null){
                                num = "Sin definir"
                            }
                            if(num >= 1000000000000){
                                num = num/1000000000000;
                                num = num.toFixed(2);
                                num = num + "T";
                            }else if(num >= 1000000000){
                                num = num/1000000000;
                                num = num.toFixed(2);
                                num = num + "B";
                            }else if(num >= 1000000){
                                num = num/1000000;
                                num = num.toFixed(2);
                                num = num + "M";
                            }else if(num > 1000){
                                num = num/1000;
                                num = num.toFixed(2);
                                num = num + "k";
                            }
                            return num;
                        }
                        const individualPage = `
                        <main>
                            <section class="currencyContainer">
                                <section class="currencyContainer__name">
                                    <section class="name__cont">
                                        <img class="name__cont--img" src="${data[0].image}" alt="">
                                        <h2 class="name__cont--title">${data[0].name}</h2>
                                        <h4 class="name__cont--symbol text">${modSymbol}</h4>
                                    </section>
                                    <section class="price__cont">
                                        <h3 class="price__cont--ars">$${modifiedPriceLocal}ARS</h3>
                                        <h4 class="price__cont--usd text">$${modifiedPriceUSD}USD</h4>
                                    </section>
                                </section>
                                <section class="currencyContainer__converter">
                                    <div class="currencyContainer__converter--input-cont">
                                        <input class="currencyContainer__converter--input" type="number" value="1">
                                        <h3 class="currencyContainer__converter--currency">${modSymbol}</h3>
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
                                        <div class="tradingview-widget-copyright"><a href="https://es.tradingview.com/symbols/${modSymbol}USDT" rel="noopener" target="_blank"><span class="blue-text">${modSymbol}USDT Gráfico</span></a> por TradingView</div>
                                        <script type="text/javascript">
                                            new TradingView.widget(
                                                {
                                                    "autosize": true,
                                                    "symbol": "${modSymbol}USDT",
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
                                            <h3 class="change__container--lowest">$${data[0].low_24h}</h3>
                                            <h3 class="change__container--highest">$${data[0].high_24h}</h3>
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
                                    <h4 class="currencyContainer__statistics--item"> <b> Capitalización: </b> ${shortNumber(data[0].market_cap)}</h4>
                                    <h4 class="currencyContainer__statistics--item"> <b> Monedas en circ.: </b> ${shortNumber(data[0].circulating_supply)}</h4>
                                    <h4 class="currencyContainer__statistics--item"> <b> Total de monedas: </b> ${shortNumber(data[0].total_supply)}</h4>
                                    <h4 class="currencyContainer__statistics--item"> <b> ATH </b> ${shortNumber(data[0].ath)}</h4>
                                </section>
                            </section>
                        </main>
                            `;
                        let element = document.querySelectorAll("[data-router]")[0];
                        setHTML(element, individualPage);
                        window.scroll(0,0);
                        let currency = $$('.currencyContainer__converter--currency-options');
                        let activeCurrency = currency[0];
                        activeCurrency.style.backgroundColor = "#06D6A090";
                        let inputs = $$('.currencyContainer__converter--input');
                        inputs[0].addEventListener('keyup',()=>{
                            if(activeCurrency == currency[0]){
                                inputs[1].value = (inputs[0].value*intLocalPrice).toFixed(2);
                            }else{
                                inputs[1].value = (inputs[0].value*intPriceUSD).toFixed(2);
                            }
                        });
                        inputs[1].addEventListener('keyup',()=>{
                            if(activeCurrency == currency[0]){
                                inputs[0].value = (inputs[1].value/intLocalPrice).toFixed(2);
                            }else{
                                inputs[0].value = (inputs[1].value/intPriceUSD).toFixed(2);
                            }
                        });
                        currency[1].addEventListener('click',()=>{
                            activeCurrency = currency[1];
                            inputs[1].value = (inputs[0].value*intPriceUSD).toFixed(2);
                            activeCurrency.style.backgroundColor = "#06D6A090";
                            currency[0].style.backgroundColor = "#505050";
                        });
                        currency[0].addEventListener('click',()=>{
                            activeCurrency = currency[0];
                            inputs[1].value = (inputs[0].value*intLocalPrice).toFixed(2);
                            activeCurrency.style.backgroundColor = "#06D6A090";
                            currency[1].style.backgroundColor = "#505050";
                        });
                    }
                });
        });
    }
export default loadCrypto;