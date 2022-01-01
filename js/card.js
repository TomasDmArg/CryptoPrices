import {$, $$, allText} from './selector.js'
import {applyMode, darkMode, checkDark} from './theme.js'
import createCard from './html/card.js'
import loadCrypto from './html/currency.js'
import getValue from './binanceP2P.js';
import Router from './router.js';
import {routes} from './routes.js';
let cardsArr = $$('.all-card-container');
const initCards = ()=>{
    const setDown = i =>{
        $$('.price')[i].style.color = '#ff411f';
        // $$('.card__name-container > h2')[i].style.color = '#ff411f';
        $$('.buttons > .active')[i].style.backgroundColor = '#ff411f';
        $$('.buttons > .active')[i].style.border = '5px solid #ff411f';
        $$('.bg')[i].style.backgroundColor = '#ff411f';
        // $$('.card-image-img')[i].style.border = '4px solid #ff411f';
    }
    const setUp = i =>{
        $$('.price')[i].style.color = '#06D6A0';
        // $$('.card__name-container > h2')[i].style.color = '#06D6A0';
        $$('.buttons > .active')[i].style.backgroundColor = '#06D6A0';
        $$('.buttons > .active')[i].style.border = '5px solid #06D6A0';
        $$('.bg')[i].style.backgroundColor = '#06D6A0';
        // $$('.card-image-img')[i].style.border = '4px solid #06D6A0';
        $$('.buttons > .active')[i].style.border = '5px solid #06D6A0';
    }
    fetch('https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
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
                        if($$('.seemorebtn').length > 0) {
                            $$('.seemorebtn')[i].addEventListener('click', ()=>{
                                let url = "/#c/" + data[i].id;
                                loadCrypto(url);
                            });
                        }
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
                    fetch('https://criptoya.com/api/binancep2p/sell/usdt/ars/5')
                        .then(response => response.json())
                        .then(data2 => {
                            let promVent = 0;
                            for(let i = 0; i < 5; i++){
                                promVent+=parseFloat(data2.data[i].adv.price);
                            }
                            promVent = promVent/5;
                            fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
                                .then(response => response.json())
                                .then(data3 => {
                                    $('.buyDollar').innerHTML = "$" + data3[1].casa.venta;
                                    $('.sellDollar').innerHTML = "$" + data3[1].casa.compra;
                                });
                            const getCurrencyValue = (id)=>{
                                let hiddenValue = $$('.hidden-value')[id].innerHTML;
                                return hiddenValue*promVent;
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