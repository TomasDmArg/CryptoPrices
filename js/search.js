import {$, $$} from './selector.js';
//import list from './cryptolist.js';
import loadCrypto from './html/currency.js';
import {generatePDF} from './pdf.js';
import {getCookie} from './cookie.js';

let state = 0;
let getResult;
const reduceDecimals = (x)=>{
    let num = parseFloat(x);
    num = 0.0000001;
    for(let i = 10; i > 2; i--) {
        if(x < num) return x.toFixed(i);
        num *= 10;
    }
    if(x > 1) return x.toFixed(2);
}
const getPrice = (currencyId, symbol) => {
    // Get the coingecko usd price for the given currency
    fetch(`https://api.coingecko.com/api/v3/coins/${currencyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
            .then(response => response.json())
            .then(data2 => {
                $('.sale__main--button').addEventListener('click', ()=>{
                    let ars = $('#sale-main-inp-1').value;
                    let dni = $('#sale-main-inp-3').value;
                    // check for dni and fees values
                    if(dni === '') dni = '-';
                    let fees = ($('#sale-main-inp-4').value !== null) ? $('#sale-main-inp-4').value : 0
                    // display the result
                    $('.sale__results').style.display = 'block';
                    // if ars is a string, remove commas on ars
                    if(typeof ars === 'string') ars = ars.replace(/,/g, '');
                    ars = parseFloat(ars);
                    // Calculate the total with the fee or discount
                    let arsPlusFees = ars * (1 + (fees / 100));
                    arsPlusFees = arsPlusFees.toFixed(2);

                    let arsValue = data2.payload.bid; //Get dolar price on Bitso
                    let price = data.market_data.current_price.usd; //Get usd price on Coingecko
                    let result = (arsPlusFees/arsValue)/price; //Calculate the result
                    result = reduceDecimals(result);
                    $('.sale__results--amount').innerHTML = `$${result}${symbol}`;
                    $('.sale__results--equivalent').innerHTML = `~$${arsPlusFees}ARS`;
                    // Add the ars amount to the cookie
                    let sold = getCookie('totalSold');
                    sold = parseFloat(sold);
                    sold += ars;
                    sold = sold.toFixed(2);
                    document.cookie = `totalSold=${sold}; expires=Fri, 31 Dec 9999 23:59:59 GMT;"`;
                    // Generar PDF
                    $('.sale__results--button').addEventListener('click', ()=>{
                        let data = {
                            businessName: getCookie('name'),
                            direction: getCookie('address') || '-',
                            CUIT: getCookie('cuit'),
                            currency: symbol,
                            currencyQt: result,
                            ars: arsPlusFees,
                            date: new Date().toLocaleDateString(),
                            hour: new Date().toLocaleTimeString(),
                            dni: dni,
                        }
                        let filename = `Factura-${data.date}-${data.hour}`;
                        generatePDF(data.businessName, data.direction, data.CUIT, data.currency,
                            data.currencyQt, data.ars, data.date, data.hour, data.dni, filename);
                    });
                })
                return getResult;
            });
    });
};
const initSearch = (type = 1)=>{
    fetch('https://api.coingecko.com/api/v3/coins/list', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(list => {
            let max = (type === 1) ? 6 : 3;
            let INP = (type === 1) ? $('.search-container > div > input') : $('#sale-main-inp-2');
            // disable suggestions for the input
            INP.setAttribute('autocomplete', 'off');
            INP.addEventListener('focus', ()=>{
                $('.search-result').style.display = 'block';
            });
            const show = ()=>{
                INP.focus();
                state++;
            }
            hotkeys("ctrl+b, command+b", ()=>{
                show();
            });
            const load = ()=>{
                if(type === 1) loadCrypto("/#c/" + getResult[0].id);
                if(type === 2) {
                    // Put the symbol on the input and disable the input
                    INP.value = getResult[0].symbol.toUpperCase();
                    INP.disabled = true;
                    // Hide results-container
                    for (let i = 0; i < max; i++){
                        $$('.search-result')[i].style.display = 'none';
                    }
                    // Get the price
                    getPrice(getResult[0].id, 
                        INP.value);
                }
            }
            let el = $$('.search-result');
            for(let i = 0; i < el.length-1; i++){
                el[i].addEventListener('click', ()=>{
                    load();
                })
            }
            INP.addEventListener('focus', ()=>{
                for (let i = 0; i < el.length-1; i++){
                    if(el[i].innerText != '') $$('.results-container')[i].style.display = 'block';
                }
            })
            INP.addEventListener('blur', ()=>{
                setTimeout(()=>{
                    if(el.length != 0) $('.results-container').style.display = 'none';
                }, 600);
            })

            const showResults = (arr)=>{
                if (arr.length > max) {
                    for (let i = 0; i < max; i++){
                        $$('.search-result')[i].innerHTML = `${arr[i].name}`;
                        $$('.search-result')[i].style.display = 'block';
                    }
                }else{
                    for (let i = 0; i < arr.length; i++){
                        if(arr.length < max){
                            arr.push({
                                name: " ",
                            });
                        }
                        $$('.search-result')[i].innerHTML = `${arr[i].name}`;
                        $$('.search-result')[i].style.display = 'block';
                        if(arr[i].name === " "){
                            $$('.search-result')[i].style.display = 'none';
                        }
                        
                        INP.addEventListener('focus', ()=>{
                            $$('.search-result')[i].style.display = 'block';
                        })
                        // INP.addEventListener('blur', ()=>{
                        //     $$('.search-result')[i].style.display = 'none';
                        // })
                    }
                }
            };
            for (let i = 0; i < list.length; i++) {
                let name = list[i].name;
                let symbol = list[i].symbol;
                list[i].name = `${name.toUpperCase()}`;
            }
            INP.addEventListener('focus', ()=>{
                console.log(INP.value)
                INP.addEventListener('keyup', (e)=>{
                    if (INP.value.length >= 2) {
                        let val = INP.value.toUpperCase();
                        let data = list;
                        let filterResult;
                        if(type === 1){
                            filterResult = data.filter( data => data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        }else{
                            // Filter by symbol
                            filterResult = data.filter( data => data.symbol.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        }
                        if (filterResult.length === 0) {
                            filterResult.push({name: "Ninguna moneda encontrada"});
                            showResults(filterResult);
                        }else{
                            getResult = filterResult;
                            if(type === 1){
                                //Si el elemento tiene en mayor porcentaje x cantidad de caracteres va primero
                                filterResult.sort(function st (a, b){
                                    return a.name.length - b.name.length;
                                });
                            }else{
                                //Si el elemento tiene en mayor porcentaje x cantidad de caracteres va primero
                                filterResult.sort(function st (a, b){
                                    return a.symbol.length - b.symbol.length;
                                });
                            }
                            showResults(filterResult);
                            if (e.keyCode === 13) {
                                load();
                            }
                        }
                    }
                    if(e.key === 'Escape'){
                        for (let i = 0; i < max; i++){
                            $$('.search-result')[i].style.display = 'none';
                            INP.blur();
                        }
                    }
                    if(e.key === 'Ctrl'){
                        if (e.key === 'b') {
                            for (let i = 0; i < max; i++){
                                $$('.search-result')[i].style.display = 'none';
                            }
                            INP.blur();
                        }
                    };
                });
            });

        })
}
export default initSearch;