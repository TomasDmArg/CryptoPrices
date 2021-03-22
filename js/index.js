import obtain from './obtain.js';
import {initCookie} from './cookie.js';
import navScripts from './navbar.js';
import initLoad from './load.js'
window.onload = ()=>{
  initCookie();
  initLoad();
  navScripts();
  obtain();
  document.querySelector("form").addEventListener("submit", handleSubmit);
  const handleSubmit = (e) => {
    e.preventDefault()
    let myForm = document.getElementById('pizzaOrder');
    let formData = new FormData(myForm)
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    }).then(() => console.log('Form successfully submitted')).catch((error) =>
      alert(error))
}
}