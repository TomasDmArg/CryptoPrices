import obtain from './obtain.js';
import {initCookie} from './cookie.js';
import navScripts from './navbar.js';
import initLoad from './load.js';
//cargar
import {$, $$} from './selector.js';
import Router from './router.js';
import {routes} from './routes.js';
const router = new Router(routes);
const load = ()=>{
    initCookie();
    router.loadPage();
    if ($('[data-router]').innerHTML !== "") {
      initLoad();
      navScripts();
      obtain();
    }
    if ($('.currency-label').style.color === '#eeeeee' ||$('.currency-label').style.color === 'var(--light)') {
          for (let i = 0; i < $$('.text').length; i++) {
              $$('.text')[i].style.color = "#eeeeee";
          }
      }
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