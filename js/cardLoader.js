//cargar la tarjeta
import {$, $$} from './selector.js';
import Router from './router.js';
import {routes} from './routes.js';
const load = ()=>{
    const results = $$('.search-result');
    const router = new Router(routes);
    router.loadPage();
}
export default load;