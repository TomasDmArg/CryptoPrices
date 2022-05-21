import {numberWithCommas} from './html/currency.js';   
import {$, $$} from './selector.js';
//This is to be able to add more cards in a scalable way.
const createDollarCard = (uObj)=>{
    let card = document.createElement('section');
    card.classList.add('dollar-info');
    let child = document.createElement('section');
    child.classList.add('dollar-name-cont');
    if(uObj.t == "Dolar Contado con Liqui") uObj.t = "Dolar CCL";
    let templateHTML = `
        <div class="dollar-name">
            <h2>${uObj.t}</h2><h4 class="text">${uObj.p}</h4>
        </div>
        <h3 class="quote">Compra: <span class="buyDollar">${uObj.c}</h3>
        <h3 class="quote">Venta: <span class="sellDollar">${uObj.v}</h3>
    `;
    child.innerHTML = templateHTML;
    card.appendChild(child);
    document.querySelector('.all-card-container').insertAdjacentHTML('beforeend',card.outerHTML);
}
let states = {
    dollarType: 0,
    dollarPrices: { 
        buy: 0,
        sell: 0,
    },
    orderType: 0,
    baseCurrency: 0,
    quantity: 0,
    firstTimeUpdate: false,
    fee: 0,
};
const calculateRes = ()=>{
    let res;
    let target = $('#result');
    let price = (states.orderType === 0) ? states.dollarPrices.buy : states.dollarPrices.sell
    if(states.baseCurrency === 0) {
        // How many dollars you can buy with these pesos? or
        // How many dollars you need to sell to get these pesos?
        if(states.dollarType == 1) res = states.quantity * 1.65;
        else res = states.quantity / price;
    } else if(states.baseCurrency === 1) {
        // How many pesos you can buy with these dollars? or
        // How many pesos you need to sell to get these dollars?
        res = states.quantity * price;
        if(states.dollarType == 1) res = res * 1.65;
    }

    // FV = PV * (1 + i);
    res = res * (1 + (states.fee / 100));
    res.toFixed(3);
    const texts = ["Te darán: ", "Tendras que dar: ", "Tendrás que vender: ", " Te cobrarán: "];
    const texts2 = [" por ", " para recibir ", " para recibir "];
    let st = states.orderType;
    let st2 = states.baseCurrency;
    let st3 = 2;
    if(st == st2) st3 = 0;
    else if(st == 0 && st2 == 1) st3 = 1;
    if(states.dollarType != 1){
        target.innerText = texts[st3] + numberWithCommas(res.toFixed(3)) + 
            (st2 ? 'ARS' : 'USD') + 
            texts2[st3] + states.quantity + " " + 
            ((!st2) ? 'ARS' : 'USD');
    }else{
        target.innerText = texts[3] + numberWithCommas(res.toFixed(3)) + "ARS";
    }
};
let isThereAnyError = false;
let errorArr = [];
const sendError = error => {
    isThereAnyError = true;
    errorArr.push(error);
}
const errorCheck = () => {
    // Scalable error detection
    if(states.dollarType == 0 && states.firstTimeUpdate === false) {
        // This fixes the bug where the first time the calculator is loaded,
        // the price is zero due to the time that the fetch takes to load.
        // Replace commas for dots if there's any
        let buy =  $(`${container} > .buyDollar`).innerText.replace(/,/g, '.');
        let sell = $(`${container} > .sellDollar`).innerText.replace(/,/g, '.');
        states.dollarPrices.buy = parseFloat(buy);
        states.dollarPrices.sell = parseFloat(sell);
        if(states.dollarPrices.sell != 0){
            states.firstTimeUpdate = true;
        } 
    }
    // Zero Price
    if(states.dollarPrices.sell == 0 && states.dollarPrices.buy == 0) sendError('Precio no disponible');
    // "Dolar tarjeta" can't be sold, it's only for payments
    if(states.dollarType == 1 && states.orderType == 1){
        sendError('El dolar tarjeta no se puede vender, es solo para pagos con tarjeta');
    }
    // Negative or zero quantity
    if(states.quantity < 0) sendError('La cantidad no puede ser negativa');
    if(states.quantity == 0) sendError('La cantidad no puede ser 0 (cero)');

    // Show erors or calculate res
    if(isThereAnyError){
        let text = "";
        for(let i = 0; i < errorArr.length; i++){
            text += "Error " + (i+1) + ": " + errorArr[i] + '\n';
        }
        $('#result').innerText = text;
        isThereAnyError = false;
        errorArr = [];
    } else {
        calculateRes();
    }
}
const disclaimers = ()=>{
    let res;
    if(states.dollarType == 1){
        res = "*Valores de referencia, puede variar, ya que el precio puede ser distinto dependiendo el banco, pueden aplicar otros impuestos";
    }else if(states.dollarType == 2){
        res = "*Puede cambiar cotización dependiendo de la cueva, valores de refencia";
    }else if(states.dollarType == 4){
        res = "*Valores de referencia, ya que pueden haber sido tomadas órdenes, los vendedores pueden no ser la mejor opción, o no tienen la liquidez necesaria, o uno no llegar al mínimo"
    }else{
        res = "*La cotización puede variar, valores de refencia";
    }
    $('#result-disclaimer').innerText = res;
}
const container = ".dollar-info > .dollar-name-cont > .quote";
const updateState = (state, value) => {
    states[state] = value;
    if(state === 'baseCurrency') $('.qt-unit').innerText = (states.baseCurrency === 0) ? 'ARS' : 'USD';
    errorCheck();
    disclaimers();
}
const initCalculator = ()=>{
    const dollarTypeOptions = $$('.converter__type > button');
    const orderType = $$('.converter__options--first > button');
    const baseCurrency = $$('.converter__options--second > button');
    dollarTypeOptions[states.dollarType].id = 'd-ac';
    orderType[states.orderType].id = 'o-ac';
    baseCurrency[states.baseCurrency].id = 'c-ac';
    disclaimers();
    dollarTypeOptions.forEach(option => {
        option.addEventListener('click', ()=>{
            dollarTypeOptions.forEach(option => {
                option.id = '';
            });
            option.id = 'd-ac'; 
            let elArray = Array.from(dollarTypeOptions);
            updateState('dollarType', elArray.indexOf(option));
            // Get buy and sell values 
            let getPrices = {
                buy: undefined,
                sell: undefined,
            };
            const allBuyPrices = $$('.dollar-info > .dollar-name-cont > .quote >  .buyDollar');
            const allSellPrices = $$('.dollar-info > .dollar-name-cont > .quote >  .sellDollar');
            let x = states.dollarType;
            if(x === 0 || x === 1){
                // Replace commas for dots if there's any
                let buy = allBuyPrices[0].innerText.replace(/,/g, '.');
                let sell = allSellPrices[0].innerText.replace(/,/g, '.');
                getPrices.buy = parseFloat(buy);
                getPrices.sell = parseFloat(sell);
            }else{
                let buy = allBuyPrices[x-1].innerText.replace(/,/g, '.');
                let sell = allSellPrices[x-1].innerText.replace(/,/g, '.');
                getPrices.buy = parseFloat(buy);
                getPrices.sell = parseFloat(sell);
            }
            updateState('dollarPrices', getPrices);
        });
    });
    orderType.forEach(option => {
        option.addEventListener('click', ()=>{
            orderType.forEach(option => {
                option.id = '';
            });
            option.id = 'o-ac';
            let elArray = Array.from(orderType);
            updateState('orderType', elArray.indexOf(option));
        });
    });
    baseCurrency.forEach(option => {
        option.addEventListener('click', ()=>{
            baseCurrency.forEach(option => {
                option.id = '';
            });
            option.id = 'c-ac';
            let elArray = Array.from(baseCurrency);
            updateState('baseCurrency', elArray.indexOf(option));
        });
    });
    const quantityInput = $('#qt');
    quantityInput.addEventListener('keyup', ()=>{
        updateState('quantity', quantityInput.value);
    });
    const feeInput = $('.converter__fee');
    let feeRes;
    feeInput.addEventListener('keyup', ()=>{
        feeRes = feeInput.value.replace(/,/g, '.');
        updateState('fee', feeRes);
    });
} 
export async function askForDollars(){
    await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then(response => response.json())
    .then(data => {
        let createValue;
        let elements = document.querySelectorAll('.dollar-info');
        let setdollar = (el, id )=>{
            let nombre = data[id].casa.nombre;
            let comp = data[id].casa.venta;
            let vent = data[id].casa.compra;
            let rObj = {    
                t: nombre,
                p: "Dolar si",
                c: comp,
                v: vent,
            };
            createDollarCard(rObj);
        };
        setdollar(0, 0);
        setdollar(1, 1);
        setdollar(4, 3);
        setdollar(5, 4);
    });
    await fetch('https://api.bitso.com/v3/ticker?book=usd_ars')
        .then(response => response.json())
        .then(data2 => {
            let comp = data2.payload.ask;
            let vent = data2.payload.bid;
            let rObj = {    
                t: "USDT",
                p: "Bitso",
                c: comp,
                v: vent,
            };
            createDollarCard(rObj);
        });
    await fetch("https://criptoya.com/api/binancep2p/buy/usdt/ars/5")
        .then(response => response.json())
        .then(data3 => {
            fetch("https://beta.belo.app/public/price")
                .then(response => response.json())
                .then(data4 => {
                    let promComp = 0, promVent = 0;
                    for(let i = 0; i < 5; i++){
                        promComp+=parseFloat(data3.data[i].adv.price);
                        promVent+=parseFloat(data4.data[i].adv.price);
                    }
                    promComp = promComp/5;
                    promVent = promVent/5;
                    let rObj = {    
                        t: "USDT",
                        p: "Binance P2P",
                        c: promComp.toFixed(3),
                        v: promVent.toFixed(3),
                    };
                    createDollarCard(rObj);
                })
            });
    await fetch("https://beta.belo.app/public/price")
        .then(response => response.json())
        .then(data5 => {
            let counter = 0;
            let value;
            while (counter != data5.length) {
                if (data5[counter].pairCode === "USDT/ARS") {
                    value = {
                        c: data5[counter].ask,
                        v: data5[counter].bid,
                    };
                    counter = data5.length-1;
                }
                counter++;
            }
            let rObj = {    
                t: "USDT",
                p: "Belo",
                c: parseFloat(value.c).toFixed(3),
                v: parseFloat(value.v).toFixed(3),
            };
            createDollarCard(rObj);
        });
    await fetch("https://criptoya.com/api/buenbit/dai/ars")
            .then(response => response.json())
            .then(data6 => {
                let rObj = {    
                    t: "DAI",
                    p: "Buenbit",
                    c: data6.ask,
                    v: data6.bid,
                };
                createDollarCard(rObj);
            });
    // Brubank API
    await fetch("https://criptoya.com/api/brubank")
        .then(response => response.json())
        .then(data7 => {
            let rObj = {
                t: "Dolar",
                p: "Brubank",
                c: `${data7.totalAsk}`,
                v: data7.bid,
            };
            createDollarCard(rObj);
        });
    initCalculator();
}   
