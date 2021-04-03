import {applyMode, darkMode, lightMode, changeMode} from './theme.js';
import initCards from './card.js';
import initSearch from './search.js';
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
        history.pushState({}, 'This works fine', url)
        if (index === 2) {
            if (this.pricesState >= 1) {
                this.el.innerHTML = this.routes[index].template;
                initCards();
                initSearch();
            }
            this.pricesState++;
            this.el.innerHTML = this.routes[index].template;
        }
        this.el.innerHTML = this.routes[index].template;

    }
    loadPage(){
        let url = this.getUrl();
        let index = url.indexOf('/#/')
        let mod = url.slice(index)
        console.log(index)
        console.log(mod)
        switch (mod) {
            case '/#/precios':
                this.loadRoute(2, mod);
                console.log('Precios ---')
                initCards();
                initSearch();
                break;
            case '/#/contacto':
                this.loadRoute(1, mod);
                break;
            case '/':
                this.loadRoute(0, mod);
                break;
            case '/#/':
                this.loadRoute(0, mod);
                break;
        
            default:
                this.notFound();
                break;
        }
    }
}
export default Router;