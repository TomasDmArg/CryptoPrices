import initCards from './card.js';
import loadCrypto from './html/currency.js';
import initSearch from './search.js';
import {matchColors} from './theme.js';
import {$, $$} from './selector.js';
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
                        router.loadRoute(4, '/#/dolar');
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
                    router.loadRoute(4, '/#/dolar');
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
                        console.log("Hola");
                    });
                    // initCards();
                    initSearch();
                    break;
                case '/#/contacto':
                    this.loadRoute(2, mod);
                    matchColors();
                    break;
                case '/#/dolar':
                    this.loadRoute(4, mod);
                    matchColors();
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