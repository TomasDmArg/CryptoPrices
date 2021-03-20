
import fetchData from  './../fetch.js'
import * as all from  './../binanceFunction.js'

async function converterSellUsd(){
    const obtainSell = await fetchData(all.DOLAR_API_SELL);
    let value = all.usdtars.sellInput.value;
    let precio = obtainSell.data[1].advDetail.price;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) * parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    all.usdtars.convertedS.innerHTML = modRes;
}
export default converterSellUsd;