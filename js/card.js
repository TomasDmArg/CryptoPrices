import {$, $$, allText} from './selector.js'
import {applyMode, darkMode, checkDark} from './theme.js'
import createCard from './html/card.js'
import {loadCrypto, setHTML} from './html/currency.js'
import getValue from './binanceP2P.js';
import Router from './router.js';
import {askForDollars} from './askForDolars.js';
import {routes} from './routes.js';
// const nameArr = $$('.card__name-container > h2');
// const symbolArr = $$('.card__name-container > h4');
// const priceArr = $$('.card-container > section > .price');
// const changeArr = $$('.percent');
// const imgArr = $$('.card-image-img');
// const converterTextArr = $$('.bg-text');

// const converterInputArr = $$('.converter-input');
// const converterCurrencyArr = $$('.converter-currency');
let cardsArr = $$('.all-card-container');
const initCards = ()=>{
    const setDown = i =>{
        $$('.percent')[i].style.color = '#ff411f';
        // $$('.card-container')[i].style.border = '5px solid #ff411f';
        $$('.card__name-container > h2')[i].style.color = '#ff411f';
        $$('.buttons > .active')[i].style.backgroundColor = '#ff411f';
        $$('.buttons > .active')[i].style.border = '5px solid #ff411f';
        $$('.buttons > .convert')[i].style.border = '5px solid #ff411f';
        $$('.buttons > .convert')[i].addEventListener('mouseover', ()=>{
            $$('.buttons > .convert')[i].style.backgroundColor = '#ff411f';
        })
        $$('.buttons > .convert')[i].addEventListener('mouseleave', ()=>{
            $$('.buttons > .convert')[i].style.backgroundColor = '#ff411f00';
        })
        $$('.bg')[i].style.backgroundColor = '#ff411f';
        $$('.card-image-img')[i].style.border = '4px solid #ff411f';
    }
    const setUp = i =>{
        $$('.percent')[i].style.color = '#06D6A0';
        // $$('.card-container')[i].style.border = '5px solid #06D6A0';
        $$('.card__name-container > h2')[i].style.color = '#06D6A0';
        $$('.buttons > .active')[i].style.backgroundColor = '#06D6A0';
        $$('.buttons > .active')[i].style.border = '5px solid #06D6A0';
        $$('.buttons > .convert')[i].style.border = '5px solid #06D6A0';
        $$('.buttons > .convert')[i].addEventListener('mouseover', ()=>{
            $$('.buttons > .convert')[i].style.backgroundColor = '#06D6A0';
        })
        $$('.buttons > .convert')[i].addEventListener('mouseleave', ()=>{
            $$('.buttons > .convert')[i].style.backgroundColor = '#06D6A000';
        })
        $$('.bg')[i].style.backgroundColor = '#06D6A0';
        $$('.card-image-img')[i].style.border = '4px solid #06D6A0';
    }
    fetch('https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
                $('#seemoredollar').addEventListener('click', ()=>{
                    document.title = "Dolar - CryptoPrices";
                    history.pushState({}, 'This works fine', '/#/dolar');
                    setHTML(document.querySelectorAll("[data-router]")[0], routes[4].template);
                    askForDollars();
                });
                if ($$('.card-container').length < 99) {
                    for (let i = 0; i < 100; i++) {
                        let name = data[i].name;
                        let symbol = data[i].symbol.toUpperCase();
                        if (name.split(" ").length > 2) {
                            name = symbol;
                        }
                        let price = data[i].current_price.toFixed(3);
                        let change = data[i].price_change_percentage_24h;
                        let image = data[i].image;
                        let id = data[i].id;
                        
                        createCard(name, symbol, price, change, image, id);
                        $$('.seemorebtn')[i].addEventListener('click', ()=>{
                            let url = "/#c/" + data[i].id;
                            loadCrypto(url);
                        });
                        if (name.length >= 10) {
                            $$('.card__name-container > h2')[i].style.fontSize = '2rem'
                        }
                        if (name.split(" ").length === 2){
                            $$('.card__name-container > h2')[i].style.fontSize = '2rem'
                        }
                        ($$('.percent')[i].innerHTML.indexOf("-") >= 0) ? setDown(i) : setUp(i);
                        $$('.convert')[i].addEventListener('click',()=>{
                            $$('.bg')[i].style.animationName = 'converter';
                            setTimeout(() => {
                                $$('.title')[i].style.display = 'block';
                                $$('.title')[i].style.animationName = 'showup';
                                $$('.converter-input')[i].style.display = 'block';
                                $$('.converter-input')[i].style.animationName = 'showup-inp';
                                $$('.value')[i].style.display = 'block';
                                $$('.value')[i].style.animationName = 'showup';
                                $$('.bg-close')[i].style.display = 'block';
                                $$('.bg-close')[i].style.animationName = 'showup';
                                $$('.bg-close')[i].addEventListener('click', ()=>{
                                    $$('.title')[i].style.display = 'none';
                                    $$('.title')[i].style.animationName = 'hide';
                                    $$('.converter-input')[i].style.display = 'none';
                                    $$('.converter-input')[i].style.animationName = 'hide';
                                    $$('.value')[i].style.display = 'none';
                                    $$('.value')[i].style.animationName = 'hide';
                                    $$('.bg-close')[i].style.display = 'none';
                                    $$('.bg-close')[i].style.animationName = 'hide';
                                    setTimeout(() => {
                                        $$('.bg')[i].style.animationName = 'converter-hide';
                                    }, 200);
                                })
                            }, 800);
                        })
                    $$('.card__name-container')[i].style.animationDuration = '0s';
                    $$('.price')[i].style.animationDuration = '0s';
                    $$('.card-image')[i].style.animationDuration = '0s';
                    $$('.card-image')[i].style.backgroundColor = '#eeeeee50';
                    $$('.card-image-img')[i].style.borderRadius = '50%';
                    }
                    for (let i = 0; i < cardsArr.length; i++) {
                        ($$('.percent')[i].innerHTML.indexOf("-") >= 0) ? setDown(i) : setUp(i);
                        $$('.convert')[i].addEventListener('click',()=>{
                            $$('.bg')[i].style.animationName = 'converter';
                            setTimeout(() => {
                                $$('.title')[i].style.display = 'block';
                                $$('.title')[i].style.animationName = 'showup';
                                $$('.converter-input')[i].style.display = 'block';
                                $$('.converter-input')[i].style.animationName = 'showup-inp';
                                $$('.value')[i].style.display = 'block';
                                $$('.value')[i].style.animationName = 'showup';
                                $$('.bg-close')[i].style.display = 'block';
                                $$('.bg-close')[i].style.animationName = 'showup';
                                $$('.bg-close')[i].addEventListener('click', ()=>{
                                    $$('.title')[i].style.display = 'none';
                                    $$('.title')[i].style.animationName = 'hide';
                                    $$('.converter-input')[i].style.display = 'none';
                                    $$('.converter-input')[i].style.animationName = 'hide';
                                    $$('.value')[i].style.display = 'none';
                                    $$('.value')[i].style.animationName = 'hide';
                                    $$('.bg-close')[i].style.display = 'none';
                                    $$('.bg-close')[i].style.animationName = 'hide';
                                    setTimeout(() => {
                                        $$('.bg')[i].style.animationName = 'converter-hide';
                                    }, 200);
                                })
                            }, 400);
                        })
                    }
                    }
                });
                    getValue();
                    fetch('https://cors.bridged.cc/https://app.ripio.com/api/v3/rates/?country=AR')
                        .then(response => response.json())
                        .then(data2 => {
                            $('.buyDollar').innerHTML = "$" + data2[4].buy_rate;
                            $('.sellDollar').innerHTML = "$" + data2[4].sell_rate;
                            const getCurrencyValue = (id)=>{
                                let element = $('.settings__active');
                                let hiddenValue = $$('.hidden-value')[id].innerHTML;
                                if (element.innerHTML == "ARS") {
                                    return hiddenValue*data2[4].buy_rate;
                                }else{
                                    return hiddenValue;
                                }
                            };
                            for (let i = 0; i < $$('input[type=number]').length; i++) {
                                let input = $$('input[type=number')[i];
                                $$('input[type=number]')[i].addEventListener('keydown', ()=>{
                                    setTimeout(() => {
                                        if (input.value > 20000000) {
                                            return false;
                                        }
                                        let currency = getCurrencyValue(i);
                                        let value = (input.value*currency).toFixed(2)
                                        $$('.value-converted')[i].innerHTML = `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                                    },100)
                                })
                            }
    })
}
export default initCards;