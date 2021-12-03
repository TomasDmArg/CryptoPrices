import {$, $$} from './selector.js';
import {getCookie} from './cookie.js';
import router from './index.js';
const EXP_DATE = "expires=Fri, 31 Dec 9999 23:59:59 GMT;";
const PATH = "path=/";
const C = ".bs-dashboard";
const setToC = (c, html) => $(`${C}__${c}`).innerHTML = html;

const isAnImage = (data)=>{
    const has = type => data.substr(data.length - type.length) == type;
    // Check if the last 4 characters are png, jpg, jpeg, gif
    if(has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
    return false;
}
const setCookies = (data)=>{
    if(data.cuit == undefined){
        data.cuit = "-";
    }
    if(data.profile == undefined || isAnImage(data.profile) == false){
        data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
    }
    document.cookie = `name=${data.name}; ${EXP_DATE} ${PATH}`;
    document.cookie = `email=${data.email}; ${EXP_DATE} ${PATH}`;
    document.cookie = `cuit=${data.cuit};  ${EXP_DATE} ${PATH}`;
    document.cookie = `profile=${data.profile}; ${EXP_DATE} ${PATH}`;
}
const initBs = (type) =>{
    switch(type){
        //Data = {name, email, cuit, profile}
        case 1:
            $('.sign-up__form--button').addEventListener('click', ()=>{
                let data = {
                    name: $('#name').value,
                    email: $('#email').value, 
                    cuit: $('#cuit').value, 
                    profile: $('#profile').value
                };
                setCookies(data);
            })
            break;
        case 2:
            let all = {
                name: getCookie("name"),
                email: getCookie("email"),
                cuit: getCookie("cuit"),
                profile: getCookie("profile"),
                totalSold: getCookie("total"),
                history: getCookie("history")
            }
            if(all.totalSold == undefined || all.totalSold === 0){
                all.totalSold = 0;
            }

            //Carga el nombre y lo que vendió el usuario en pesos
            $(`${C}__main--title`).innerHTML = `Hola, ${all.name}!`;
            $(`${C}__sales--ars`).innerHTML = `$${all.totalSold.toFixed(2)}ARS`;

            //Carga el total de ventas en Dolares tomando como referencia el precio del usd
            fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
                .then(response => response.json())
                .then(data2 => {
                        setToC("sales--usd", `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`);
                });

            //Carga la imagen de perfil
            $(`${C}__aside--profile`).setAttribute('src', getCookie("profile"));
            
            // Boton para ocultar o mostrar el saldo
            $(`${C}__sales--hide`).addEventListener('click', ()=>{
                if($(`${C}__sales--ars`).innerHTML.indexOf("*") === -1) {
                    setToC("sales--ars", "*****,**ARS");
                    setToC("sales--usd", "***,**USD");
                    $(`${C}__sales--hide`).innerText = "Mostrar";
                }else{
                    $(`${C}__sales--ars`).innerHTML = `$${all.totalSold.toFixed(2)}ARS`;
                    fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
                        .then(response => response.json())
                        .then(data2 => {
                                $(`${C}__sales--usd`).innerHTML = `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`;
                        });
                    $(`${C}__sales--hide`).innerText = "Ocultar";
                }
            });
            $('.aside__buttons--delete').addEventListener('click', ()=>{
                if(confirm("Estas seguro de que quieres borrar tu cuenta?, Los datos serán irrecuperables")){
                    //Borrar cookies
                    let cookies = document.cookie.split(";");
                    for (let i = 0; i < cookies.length; i++) {
                        let cookie = cookies[i];
                        let eqPos = cookie.indexOf("=");
                        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }
                    router.loadRoute(0, '/#/home')
                }
            })
        default:
            break;
    }
}
export default initBs;
