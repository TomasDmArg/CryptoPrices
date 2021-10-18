import initCards from './card.js';
import loadCrypto from './html/currency.js';
import {askForDollars} from './askForDolars.js';
import initSearch from './search.js';
import {matchColors} from './theme.js';
import {$, $$} from './selector.js';
import initBs from './businessMain.js';
import {getCookie} from './cookie.js';
class Router {
    constructor(routes){
        this.routes = routes;
        this.el = document.querySelectorAll("[data-router]")[0];
        this.pricesState = 0;
    }
    getUrl(){
        return window.location.href;
    }
    notFound(){
        this.el.innerHTML = 'Not found err 404'
    }
    loadRoute(index, url){
        document.title = "CryptoPrices";
        history.pushState({}, 'This works fine', url)
        if (index === 1) {
            if (this.pricesState >= 1) {
                this.el.innerHTML = this.routes[index].template;
                initCards();
                initSearch();
                matchColors();
                if($$('#seemoredollar').length == 1){
                    $('#seemoredollar').addEventListener('click', ()=>{
                        this.loadRoute(4, '/#/dolar');
                        askForDollars();
                    });
                }
            }
            this.pricesState++;
            this.el.innerHTML = this.routes[index].template;
            initCards();
            initSearch();
            matchColors();
            if($$('#seemoredollar').length == 1){
                $('#seemoredollar').addEventListener('click', ()=>{
                    this.loadRoute(4, '/#/dolar');
                    askForDollars();
                });
            }
        }
        this.el.innerHTML = this.routes[index].template;
        matchColors();
    }
    loadCryptoIndividual(url){
        history.pushState({}, 'This works fine', url)
        loadCrypto(url);
        matchColors();
    }
    loadPage(){
        let url = this.getUrl();
        let index = url.indexOf('/#/');
        let index2 = url.indexOf('/#c/');
        let mod = url.slice(index);
        if(index2 === -1){
            switch (mod) {
                case '/#/precios':
                    this.loadRoute(1, mod);
                    $('#seemoredollar').addEventListener('click', ()=>{
                        this.loadRoute(4, '/#/dolar');                    
                        askForDollars();
                    });
                    // initCards();
                    initSearch();
                    break;
                case '/#/contacto':
                    this.loadRoute(2, mod);
                    matchColors();
                    break;
                case '/#/negocios':
                    this.loadRoute(5, mod);
                    matchColors();
                    if(getCookie("name") != undefined){
                        this.loadRoute(7, '/#/negocios/dashboard');
                        initBs(2);
                    }
                    $('.business__landing--button').addEventListener('click', ()=>{
                        this.loadRoute(6, '/#/negocios/crear');                    
                    });
                    break;
                case '/#/negocios/crear':
                    this.loadRoute(6, mod);
                    matchColors();
                    initBs(1);
                    if(getCookie("name") != undefined){
                        this.loadRoute(7, '/#/negocios/dashboard');
                        initBs(2);
                    }
                    $('.sign-up__form--button').addEventListener('click', ()=>{
                        this.loadRoute(7, '/#/negocios/dashboard');
                        initBs(2);
                    })
                    break;
                case '/#/negocios/dashboard':
                    this.loadRoute(7, mod);
                    matchColors();
                    initBs(2);
                    if(getCookie("name") == undefined){
                        this.loadRoute(5, '/#/negocios');
                        initBs(1);
                    }
                    break;
                case '/#/negocios/dashboard/venta':
                    this.loadRoute(8, mod);
                    matchColors();
                    break;
                case '/#/dolar':
                    this.loadRoute(4, mod);
                    matchColors();
                    askForDollars();
                    break;
                case '/':
                    this.loadRoute(0, mod);
                    matchColors();
                    break;
                case '/#/':
                    this.loadRoute(0, mod);
                    matchColors();
                    break;
                case '/#':
                    this.loadRoute(0, mod);
                    matchColors();
                    break;
                default:
                    this.loadRoute(3, "/#/not-found");
                    matchColors();
                    break;
            }
        }else{
            mod = url.slice(index2);
            this.loadCryptoIndividual(mod);
        }
    }
}
export default Router;