import fetchData from  './fetch.js'
import Calculator from  './calculator.js'
export const USD_BRUBANK = 'https://cors.bridged.cc/https://criptoya.com/api/brubank';
const BRUBANK_BUY_ELEMENT = document.querySelector('#brubuy');
const BRUBANK_SELL_ELEMENT = document.querySelector('#brusell');

export const usdars = new Calculator(3);
export async function obtainUsdBrubank(){
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
// export default {obtainUsdBrubank(), usdars, USD_BRUBANK};