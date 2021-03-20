import fetchData from  './../fetch.js'
import * as all from  './../binanceFunction.js'

async function converterBuyUsd(){
    const obtainBuy = await fetchData(all.DOLAR_API_BUY);
    let value = all.usdtars.buyInput.value;
    let precio = obtainBuy.data[1].advDetail.price;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) / parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}USDT`;
    all.usdtars.converted.innerHTML = modRes;
}
export default converterBuyUsd;