import fetchData from  './../fetch.js'
import * as all from  './../buenbitFunction.js'
async function converterSellDai(){
    const obtainSell = await fetchData(all.DAI_BUENBIT);
    let value = all.daiars.buyInput.value;
    let precio = obtainSell.ask;
    precio = parseFloat(precio);
    value = parseFloat(value);
    let res = parseFloat(value) / parseFloat(precio);
    res = res.toFixed(3);
    res = parseFloat(res);
    // res = parseInt(res);
    let modRes = res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    modRes = `$${modRes}DAI`;
    all.daiars.converted.innerHTML = modRes;
}
export default converterSellDai;