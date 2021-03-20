import fetchData from  './fetch.js'
import Calculator from  './calculator.js'
export const usdtars = new Calculator(1);
export const DOLAR_API_BUY = 'https://cors.bridged.cc/https://criptoya.com/api/binancep2p/buy/usdt/2';
export const DOLAR_API_SELL = 'https://cors.bridged.cc/https://criptoya.com/api/binancep2p/sell/usdt/2';
const DOLAR_SELL_ELEMENT = document.querySelector('#usdsell');
const DOLAR_BUY_ELEMENT = document.querySelector('#usdbuy');

export async function obtainDolar(){
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
// export default {obtainUsdBrubank(), usdars, USD_BRUBANK};