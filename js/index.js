import obtain from './obtain.js';
import {initCookie} from './cookie.js';
import navScripts from './navbar.js';
import initLoad from './load.js';
//cargar
import {$, $$} from './selector.js';
import Router from './router.js';
import {routes} from './routes.js';
import {matchColors} from './theme.js'

const router = new Router(routes);

const load = ()=>{
    initCookie();
    router.loadPage();
    if ($('[data-router]').innerHTML !== "") {
      initLoad();
      navScripts();
      obtain();
    }
    setTimeout(() => {
      matchColors();
    }, 1000);
}
load();
//   document.querySelector("form").addEventListener("submit", handleSubmit);
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     let myForm = document.getElementById('pizzaOrder');
//     let formData = new FormData(myForm)
//     fetch('/', {
//       method: 'POST',
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams(formData).toString()
//     }).then(() => console.log('Form successfully submitted')).catch((error) =>
//       alert(error))
// }
export default router;