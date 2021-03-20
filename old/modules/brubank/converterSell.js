import fetchData from  './../fetch.js'
import * as all from  './../brubankFunction.js'
async function converterSellUsdBrubank(){
    const obtainSell = await fetchData(all.USD_BRUBANK);
    let value = all.usdars.buyInput.value;
    let precio = obtainSell.totalAsk;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) * parseFloat(precio);
    res = res.toFixed(2);
    res = parseFloat(res);
    res = parseInt(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}ARS`;
    all.usdars.converted.innerHTML = modRes;
}
export default converterSellUsdBrubank;