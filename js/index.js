import obtain from './obtain.js';
import {initCookie} from './cookie.js';
import navScripts from './navbar.js';
import initLoad from './load.js';
//cargar
import {$, $$} from './selector.js';
import Router from './router.js';
import {routes} from './routes.js';
import {matchColors} from './theme.js'
import initSettings from './settings.js'

export const router = new Router(routes);
var currencyValue = "ARS";
const load = ()=>
{
    initCookie();
    router.loadPage();
    window.onpopstate = function() {
      router.loadPage();
    };
    if ($('[data-router]').innerHTML !== "") {
      initLoad();
      navScripts();
      obtain();
    }
    // setTimeout(() => {
    //   matchColors();
    // }, 1000);

}
load();
export default router;