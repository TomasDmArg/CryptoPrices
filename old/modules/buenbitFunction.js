import fetchData from  './fetch.js'
import Calculator from  './calculator.js'
const DAI_SELL_ELEMENT = document.querySelector('#daisell');
const DAI_BUY_ELEMENT = document.querySelector('#daibuy');
export const DAI_BUENBIT = 'https://cors.bridged.cc/https://criptoya.com/api/buenbit/dai/ars';
export const daiars = new Calculator(2);

export async function obtainDai(){
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
export default obtainDai;
// export default {obtainUsdBrubank(), usdars, USD_BRUBANK};