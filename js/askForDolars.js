import {numberWithCommas} from './html/currency.js';    
export const askForDollars = ()=>{
    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(response => response.json())
    .then(data => {
        let createValue;
        let elements = document.querySelectorAll('.dollar-info');
        let setDolar = (el, id )=>{
            console.log(data[id]);
            createValue = data[id].casa.venta;
            elements[el].querySelector(".buyDollar").innerHTML = createValue;
            createValue = data[id].casa.compra;
            elements[el].querySelector(".sellDollar").innerHTML = createValue;
        };
        setDolar(0, 0);
        setDolar(1, 1);
        setDolar(4, 3);
        setDolar(5, 4);
        fetch('https://cors.bridged.cc/https://app.ripio.com/api/v3/rates/?country=AR')
            .then(response => response.json())
            .then(data2 => {
                data2.forEach(indData => {
                    if(indData.ticker == "DAI_ARS"){
                        createValue = indData.buy_rate;
                        elements[2].querySelector(".buyDollar").innerHTML = createValue;
                        createValue = indData.sell_rate;
                        elements[2].querySelector(".sellDollar").innerHTML = createValue;
                    }
                });
            });
        fetch("https://criptoya.com/api/binancep2p/buy/usdt/ars/1")
            .then(response => response.json())
            .then(data3 => {
                createValue = data3.data[0].adv.price;
                elements[3].querySelector(".buyDollar").innerHTML = createValue;
            });
        fetch("https://criptoya.com/api/binancep2p/sell/usdt/ars/1")
            .then(response => response.json())
            .then(data4 => {
                createValue = data4.data[0].adv.price;
                elements[3].querySelector(".sellDollar").innerHTML = createValue;
            })
    });
}