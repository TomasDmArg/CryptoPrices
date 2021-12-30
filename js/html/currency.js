import {$,$$} from '../selector.js'
import { getPage } from './individualPage.js';
import supportedArr from './supportedArr.js';
let sendToTabState = false;

//Cargar pagina indivudual de la criptomoneda
export const numberWithCommas = (x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export let setHTML = async function(elm, html) {
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
            fetch('https://criptoya.com/api/binancep2p/sell/usdt/ars/5')
                .then(response => response.json())
                .then(data2 => {
                    //Comprueba si el id existe
                    if (data.length === 0) {
                        console.log(data);
                        console.log('No se encontró la criptomoneda');
                    }else{
                        // valor de venta del dolar
                        let promVent = 0;
                        for(let i = 0; i < 5; i++){
                            promVent+=parseFloat(data2.data[i].adv.price);
                        }
                        promVent = promVent/5;
                        let localValue = promVent.toFixed(3);
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
                            if(num == null || num == undefined || num == 0) num = "No disponible";
                            if(num >= 1000000000000){
                                num = (num/1000000000000).toFixed(2) + "T";
                            }else if(num >= 1000000000){
                                num = (num/1000000000).toFixed(2) + "B";
                            }else if(num >= 1000000){
                                num = (num/1000000).toFixed(2) + "M";
                            }else if(num > 1000){
                                num = (num/1000).toFixed(2) + "K";
                            }
                            return num;
                        }
                        const individualPage = getPage(
                            data[0].image, data[0].name, 
                            modSymbol, modifiedPriceLocal, 
                            modifiedPriceUSD, intLocalPrice, data[0].low_24h, 
                            data[0].high_24h, pricePercent, percent, 
                            shortNumber(data[0].market_cap), 
                            shortNumber(data[0].circulating_supply),
                            shortNumber(data[0].total_supply),
                            shortNumber(data[0].ath)
                        );
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