//Falta el conversor vender (rojo) USDT/ARS
//Conversores (todos) USD/ARS

//FETCH DATA
const fetchData = (api_url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', api_url, true);
        xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Test Error', api_url))
        }
    }
    xhttp.send();
    });
}
class Calculator{
    constructor(num){ 
        this.window = document.querySelector(`.calculator__section-${num}`);
        this.pair = document.querySelector(`.pair-${num}`);
        this.exchange = document.querySelector(`.exchange-${num}`);
        this.buy = document.querySelector(`#buy-${num}`);
        this.sell = document.querySelector(`#sell-${num}`);
        this.buyInput = document.querySelector(`.buy-input-${num}`);
        this.sellInput = document.querySelector(`.sell-input-${num}`);
        this.button = document.querySelector(`.calc-img-${num}`);
        this.closeButton = document.querySelector(`#closeBtn-${num}`);
        this.nextButton = document.querySelector(`.img-${num}`);
        this.nextButtonS = document.querySelector(`.img-${num}-s`);
        this.convertedS = document.querySelector(`.p-${num}-s`);
        this.converted = document.querySelector(`.p-${num}`);
    }
    show(){
        this.window.style.display = 'block';
    }
    hide(){
        this.window.style.display = 'none';
    }
}
//obtain
let API = 'https://cors.bridged.cc/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ce38fba1-db16-49a7-802e-94ad5d7d0902'
const elementoNombre = document.querySelectorAll('.nombre');
const elementoSimbolo = document.querySelectorAll('.simbolo');
const elementoVariacion = document.querySelectorAll('.variacion');
const elementoImagen = document.querySelectorAll('.img');
const elementoUsd = document.querySelectorAll('.usd');
const elementoInput = document.querySelectorAll('.input');
const elementoPrecioOculto = document.querySelectorAll('.precioOculto');
const elementoBoton = document.querySelectorAll('.boton');
const elementoBotonSat = document.querySelectorAll('.botonsat');
const elementoInputSatoshis = document.querySelectorAll('.inputSat');
const elementoUsdSat = document.querySelectorAll('.usdsat');
const elementoPrecio = document.querySelectorAll('.precio');

const obtain = async ()=>{
    try {
        const obtainData = await fetchData(API);
        
//         let precio = obtainData.data[0].quote.USD.price;
//         precio = precio.toFixed(2);
//         precio = precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         precio = `$ ${precio} USD`;
//         elementoPrecio.innerHTML = precio;
// //--------------------------------------------------------
        const obtenerMostrar = num => {
            let precio = obtainData.data[num].quote.USD.price;
            elementoPrecioOculto[num].innerHTML = precio;
            precio = precio.toFixed(2);
            precio = precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            precio = `$ ${precio} USD`;
            elementoPrecio[num].innerHTML = precio;
            elementoNombre[num].innerHTML = obtainData.data[num].name;
            elementoSimbolo[num].innerHTML = obtainData.data[num].symbol;
            let variacion = obtainData.data[num].quote.USD.percent_change_24h;
            variacion = variacion.toFixed(2);
            if (variacion.includes('-')) {
                variacion = variacion.slice(1, -1);
                variacion = variacion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                variacion = `-%${variacion}`;
                elementoVariacion[num].style.color = '#FC5130';
            }else{
                variacion = variacion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                variacion = `%${variacion}`;
            }
            switch (obtainData.data[num].name) {
                case 'Bitcoin':
                    elementoImagen[num].setAttribute('src', 'assets/Bitcoin.svg');
                    break;
                case 'XRP':
                    elementoImagen[num].setAttribute('src', 'assets/XRP.svg');
                    break;
                case 'Ethereum':
                    elementoImagen[num].setAttribute('src', 'assets/Ethereum.svg');
                    break;
                case 'Tether':
                    elementoImagen[num].setAttribute('src', 'assets/Tether.svg');
                    break;
                case 'Litecoin':
                    elementoImagen[num].setAttribute('src', 'assets/Litecoin.svg');
                    break;
                case 'Bitcoin Cash':
                    elementoImagen[num].setAttribute('src', 'assets/Bitcoin cash.svg');
                    break;
                case 'Chainlink':
                    elementoImagen[num].setAttribute('src', 'assets/chainlink.svg');
                    break;
                case 'Doge':
                    elementoImagen[num].setAttribute('src', 'assets/doge.svg');
                    break;
                case 'Zcash':
                    elementoImagen[num].setAttribute('src', 'assets/zcash.svg');
                    break;
                case 'Stellar':
                    elementoImagen[num].setAttribute('src', 'assets/stellar.svg');
                    break;
                case 'Binance Coin':
                    elementoImagen[num].setAttribute('src', 'assets/Binance Coin.svg');
                    break;
                default:
                    elementoImagen[num].setAttribute('src', 'assets/other.svg');
                    break;
            }
            elementoVariacion[num].innerHTML = variacion;
        }
        obtenerMostrar(0);
        obtenerMostrar(1);
        obtenerMostrar(2);
        obtenerMostrar(3);
        obtenerMostrar(4);
        obtenerMostrar(5);
        obtenerMostrar(6);
        obtenerMostrar(7);
        obtenerMostrar(8);
        obtenerMostrar(9);
        
        
        const convertirADolares = num =>{
            let convertirPrecio = elementoPrecioOculto[num].innerHTML;
            elementoBoton[num].addEventListener('click', ()=>{
                let conversion = elementoInput[num].value*convertirPrecio;
                if (num === 5) {
                    conversion = conversion.toFixed(7);
                }else{
                    conversion = conversion.toFixed(4);
                }

                elementoUsd[num].innerHTML = conversion;
            });
        }
        const convertirSatoshis = () =>{
            elementoBotonSat[0].addEventListener('click', ()=>{
                let convertirPrecio = elementoPrecioOculto[0].innerHTML;
                let conversion = elementoInputSatoshis[0].value*convertirPrecio;
                conversion = conversion/100000000;
                conversion = conversion.toFixed(7);
                elementoUsdSat[0].innerHTML = conversion;
            });
        }
        convertirSatoshis();
        convertirADolares(0);
        convertirADolares(1);
        convertirADolares(2);
        convertirADolares(3);
        convertirADolares(4);
        convertirADolares(5);
        convertirADolares(6);
        convertirADolares(7);
        convertirADolares(8);
        convertirADolares(9);
    } catch (error) {
        console.error(error)
    }
}



//----Binance----//

//BINANCE FUNCTION
const usdtars = new Calculator(1);
const DOLAR_API_BUY = 'https://cors.bridged.cc/https://criptoya.com/api/binancep2p/buy/usdt/2';
const DOLAR_API_SELL = 'https://cors.bridged.cc/https://criptoya.com/api/binancep2p/sell/usdt/2';
const DOLAR_SELL_ELEMENT = document.querySelector('#usdsell');
const DOLAR_BUY_ELEMENT = document.querySelector('#usdbuy');

async function obtainDolar(){
    const obtainBuy = await fetchData(DOLAR_API_BUY);
    const obtainSell = await fetchData(DOLAR_API_SELL);
    let buyPrice = obtainBuy.data[1].advDetail.price;
    buyPrice = parseFloat(buyPrice);
    buyPrice = buyPrice.toFixed(1);
    let sellPrice = obtainSell.data[1].advDetail.price;
    sellPrice = parseFloat(sellPrice);
    sellPrice = sellPrice.toFixed(1);
    let modObtainBuy = buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainBuy = `$${modObtainBuy}ARS`;
    let modObtainSell = sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainSell = `$${modObtainSell}ARS`;
    usdtars.sell.innerHTML = modObtainBuy;
    usdtars.buy.innerHTML = modObtainSell;
    DOLAR_SELL_ELEMENT.innerHTML = modObtainBuy;
    DOLAR_BUY_ELEMENT.innerHTML = modObtainSell;
}
// export default obtainDolar;
usdtars.closeButton.addEventListener('click', ()=>{
    usdtars.hide();
})
//BINANCE BUY CONVERTER
async function converterBuyUsd(){
    const obtainBuy = await fetchData(DOLAR_API_BUY);
    let value = usdtars.buyInput.value;
    let precio = obtainBuy.data[1].advDetail.price;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) / parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}USDT`;
    usdtars.converted.innerHTML = modRes;
}
//BINANCE SELL CONVERTER
async function converterSellUsd(){
    const obtainSell = await fetchData(DOLAR_API_SELL);
    let value = usdtars.sellInput.value;
    let precio = obtainSell.data[1].advDetail.price;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) * parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    usdtars.convertedS.innerHTML = modRes;
}




//----Buenbit----//
//BUENBIT FUNCTION
const DAI_SELL_ELEMENT = document.querySelector('#daisell');
const DAI_BUY_ELEMENT = document.querySelector('#daibuy');
const DAI_BUENBIT = 'https://cors.bridged.cc/https://criptoya.com/api/buenbit/dai/ars';
const daiars = new Calculator(2);
async function obtainDai(){
    const obtainAll = await fetchData(DAI_BUENBIT);
    let modObtainBuy = obtainAll.ask.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainBuy = `$${modObtainBuy}ARS`;
    DAI_SELL_ELEMENT.innerHTML = modObtainBuy;
    daiars.sell.innerHTML = modObtainBuy;
    let modObtainSell = obtainAll.bid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainSell = `$${modObtainSell}ARS`;
    DAI_BUY_ELEMENT.innerHTML = modObtainSell;
    daiars.buy.innerHTML = modObtainSell;
}
daiars.button.addEventListener('click', ()=>{
    daiars.show();
})
daiars.closeButton.addEventListener('click', ()=>{
    daiars.hide();
})
//BUENBIT BUY CONVERTER
async function converterBuyDai(){
    const obtainSell = await fetchData(DAI_BUENBIT);
    let value = daiars.buyInput.value;
    let precio = obtainSell.ask;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) / parseFloat(precio);
    res = res.toFixed(3);
    res = parseFloat(res);
    // res = parseInt(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}DAI`;
    daiars.converted.innerHTML = modRes;
}

//BUENBIT SELL CONVERTER
async function converterSellDai(){
    const obtainSell = await fetchData(DAI_BUENBIT);
    let value = daiars.sellInput.value;
    let precio = obtainSell.bid;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) * parseFloat(precio);
    res = res.toFixed(3);
    res = parseFloat(res);
    // res = parseInt(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    daiars.convertedS.innerHTML = modRes;
}

//----Brubank----//
const USD_BRUBANK = 'https://cors.bridged.cc/https://criptoya.com/api/brubank';
const BRUBANK_BUY_ELEMENT = document.querySelector('#brubuy');
const BRUBANK_SELL_ELEMENT = document.querySelector('#brusell');

const usdars = new Calculator(3);
async function obtainUsdBrubank(){
    const obtainAll = await fetchData(USD_BRUBANK)
    let buyPrice = obtainAll.totalAsk;
    buyPrice = buyPrice.toFixed(1);
    let sellPrice = obtainAll.totalBid;
    sellPrice = sellPrice.toFixed(1);
    let modObtainBuy = buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainBuy = `$${modObtainBuy}ARS`;
    let modObtainSell = sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modObtainSell = `$${modObtainSell}ARS`;
    BRUBANK_SELL_ELEMENT.innerHTML = modObtainBuy;
    BRUBANK_BUY_ELEMENT.innerHTML = modObtainSell;
    usdars.buy.innerHTML = modObtainSell;
    usdars.sell.innerHTML = modObtainBuy;
}
usdars.button.addEventListener('click', ()=>{
    usdars.show();
})
usdars.closeButton.addEventListener('click', ()=>{
    usdars.hide();
})
//BRUBANK BUY CONVERTER
async function converterBuyUsdBrubank(){
    const obtainSell = await fetchData(USD_BRUBANK);
    let value = usdars.sellInput.value;
    let precio = obtainSell.totalBid;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) * parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    res = parseInt(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    usdars.convertedS.innerHTML = modRes;
}
//BRUBANK SELL CONVERTER
async function converterSellUsdBrubank(){
    const obtainSell = await fetchData(USD_BRUBANK);
    let value = usdars.buyInput.value;
    let precio = obtainSell.totalAsk;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) / parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}USD`;
    usdars.converted.innerHTML = modRes;
}

// let API ='https://quiet-plains-83026.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ce38fba1-db16-49a7-802e-94ad5d7d0902'

document.querySelector('.live-text').innerHTML = 'Cargando.... <a href="#" id="question"></a>';
obtain();
let errorCount = 0;


async function converterBuyDai(){
    const obtainAll = await fetchData(DAI_BUENBIT);
    let value = daiars.buyInput.value;
    let precio = obtainAll.ask;
    value = parseFloat(value);
    let res = value / precio;
    res = res.toFixed(2);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}USD`;
    daiars.converted.innerHTML = modRes;
}
async function converterSellDai(){
    const obtainAll = await fetchData(DAI_BUENBIT);
    let value = daiars.sellInput.value;
    let precio = obtainAll.bid;
    value = parseFloat(value);
    let res = value * precio;
    res = res.toFixed(2);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    daiars.convertedS.innerHTML = modRes;
}







const ALL_CALC_BTN = document.querySelectorAll('.calc-img');
const ALL_CLOSE_BTN = document.querySelectorAll('.close-btn');
const openCalc = ()=>{
    for (let i = 0; i < ALL_CLOSE_BTN.length; i++) {
        switch (i) {
            case 0:
                console.log('Cerrar')
                ALL_CLOSE_BTN[0].addEventListener('click', ()=>{
                    usdtars.window.style.display = 'none';
                })
                break;
                
                default:
                    break;
                }
            }
            for (let i = 0; i < ALL_CALC_BTN.length; i++) {
        switch (i) {
            case 0:
                ALL_CALC_BTN[0].addEventListener('click', ()=>{
                    usdtars.window.style.display = 'block';
                })
                break;
                
                default:
                    break;
                }
            }
        }
        openCalc();
        obtainUsdBrubank();
        obtainDai();
        obtainDolar();
        
        daiars.nextButton.addEventListener('click', ()=>{
            converterBuyDai();
        })
        daiars.nextButtonS.addEventListener('click', ()=>{
            converterSellDai();
        })
        
        usdtars.nextButton.addEventListener('click', ()=>{
            converterBuyUsd();
        })
        usdtars.nextButtonS.addEventListener('click', ()=>{
            converterSellUsd();
        })
        
        usdars.nextButton.addEventListener('click', ()=>{
            converterSellUsdBrubank();
        })
        usdars.nextButtonS.addEventListener('click', ()=>{
            converterBuyUsdBrubank();
        })
        
        
setInterval(() => {
        if (elementoPrecio[0].innerHTML === "") {
                document.querySelector('.live-text').innerHTML = 'Cargando...';
                errorCount ++;
                if (errorCount > 3) {
            document.querySelector('.live-text').innerHTML = 'Hubo un error.';
            document.querySelector('.live').style.backgroundColor = '#F42C04';
        }
    }else{
            document.querySelector('.live-text').innerHTML = 'En vivo ';
            document.querySelector('.live').style.backgroundColor = '#1EFFBC';
            errorCount = 0;
        }
    }, 1000);
    setInterval(() => {
            obtain();
        }, 60000);
setInterval(() => {
        obtainUsdBrubank();
        obtainDai();
        obtainDolar();
    }, 120000);