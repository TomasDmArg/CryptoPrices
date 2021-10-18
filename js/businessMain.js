import {$, $$} from './selector.js';
import {getCookie} from './cookie.js';
import router from './index.js';
const isAImage = (data)=>{
    const has = (type)=> data.indexOf(type) != -1;
    if(has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
    return false;
}
const setCookies = (data)=>{
    if(data.cuit == undefined){
        data.cuit = "-";
    }
    if(data.profile == undefined || isAImage(data.profile) == false){
        data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
    }
    document.cookie = `name=${data.name};     expires=Mon, 25 May 2022 11:12:13 UTC; path=/`;
    document.cookie = `email=${data.email};   expires=Mon, 25 May 2022 11:12:13 UTC; path=/`;
    document.cookie = `cuit=${data.cuit};    expires=Mon, 25 May 2022 11:12:13 UTC; path=/`;
    document.cookie = `profile=${data.profile}; expires=Mon, 25 May 2022 11:12:13 UTC; path=/`;
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
                //console.log("Hola");
                //initBs(2);
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
            $('.bs-dashboard__main--title').innerHTML = `Hola, ${all.name}!`;
            $('.bs-dashboard__sales--ars').innerHTML = `$${all.totalSold.toFixed(2)}ARS`;
            fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
                .then(response => response.json())
                .then(data2 => {
                        $('.bs-dashboard__sales--usd').innerHTML = `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`;
                });
                $('.bs-dashboard__aside--profile').setAttribute('src', getCookie("profile"));
            $('.bs-dashboard__sales--hide').addEventListener('click', ()=>{
                if($('.bs-dashboard__sales--ars').innerHTML.indexOf("*") === -1) {
                    $('.bs-dashboard__sales--ars').innerHTML = "$*****,**ARS";
                    $('.bs-dashboard__sales--usd').innerHTML = "$***,**USD";
                    $('.bs-dashboard__sales--hide').innerText = "Mostrar";
                }else{
                    $('.bs-dashboard__sales--ars').innerHTML = `$${all.totalSold.toFixed(2)}ARS`;
                    fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
                        .then(response => response.json())
                        .then(data2 => {
                                $('.bs-dashboard__sales--usd').innerHTML = `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`;
                        });
                    $('.bs-dashboard__sales--hide').innerText = "Ocultar";
                }
            })
            $('.aside__buttons--delete').addEventListener('click', ()=>{
                if(confirm("Estas seguro de que quieres borrar tu cuenta?, Los datos quedan irrecuperables")){
                    document.cookie = "";
                    router.loadRoute(5, '/#/negocios')
                }
            })
        default:
            break;
    }
}
export default initBs;
