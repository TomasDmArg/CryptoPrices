import {$, $$} from './selector.js';
import {getCookie} from './cookie.js';
import router from './index.js';
import {numberWithCommas} from './html/currency.js';
import initSearch from './search.js';

const EXP_DATE = "expires=Fri, 31 Dec 9999 23:59:59 GMT;";
const PATH = "path=/";
const C = ".bs-dashboard";
const setToC = (c, html) => $(`${C}__${c}`).innerHTML = html;
let monto = 0;

const isAnImage = (data)=>{
    const has = type => data.substr(data.length - type.length) == type;
    // Check if the last 4 characters are png, jpg, jpeg, gif
    if(has(".png") || has(".jpg") || has(".svg") || has(".gif") || has(".jpeg")) return true;
    return false;
}
const setCookies = (data)=>{
    if(data.cuit == undefined) data.cuit = "-";
    if(data.address == undefined) data.address = "-";
    if(data.profile == undefined || isAnImage(data.profile) == false){
        data.profile = "https://tmdm.com.ar/u/business-profile.svg"; //Img por defecto
    }
    document.cookie = `name=${data.name}; ${EXP_DATE} ${PATH}`;
    document.cookie = `email=${data.email}; ${EXP_DATE} ${PATH}`;
    document.cookie = `cuit=${data.cuit};  ${EXP_DATE} ${PATH}`;
    document.cookie = `profile=${data.profile}; ${EXP_DATE} ${PATH}`;
    document.cookie = `totalSold=0; ${EXP_DATE} ${PATH}`;
    document.cookie = `address=${data.address}; ${EXP_DATE} ${PATH}`;
}
const DNIValidations = (val, inp)=>{
    // Extra validations
    if(val.length > 8 || (val.length < 7)){
        console.log(val.length)
        //Give the input a red border
        inp.style.border = "3px solid #ff411f90";
        return true;
    }else{
        console.log(val.length)
        inp.style.border = "none";
        return false;
    }
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
                    profile: $('#profile').value,
                    address: $('#address').value,
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
                totalSold: 0,
                history: getCookie("history"),
                address: getCookie("address"),
            }
            all.totalSold = parseFloat(getCookie("totalSold"));
            if(all.totalSold == undefined) all.totalSold = 0;
            //Load the name and the total sales value in ars
            $(`${C}__main--title`).innerText = `Hola, ${all.name}!`;
            $(`${C}__sales--ars`).innerText = `$${all.totalSold.toFixed(2)}ARS`;

            //Load the total sales value in usd
            fetch('https://bitso-api-v3.herokuapp.com/api/ticker?book=usd_ars')
                .then(response => response.json())
                .then(data2 => {
                        setToC("sales--usd", `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`);
                });

            //Load the profile image
            $(`${C}__aside--profile`).setAttribute('src', getCookie("profile"));
            
            // Button to show or hide the sales value
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
                                $(`${C}__sales--usd`).innerText = `$${(all.totalSold/data2.payload.bid).toFixed(3)}USD`;
                        });
                    $(`${C}__sales--hide`).innerText = "Ocultar";
                }
            });
            $('.aside__buttons--delete').addEventListener('click', ()=>{
                if(confirm("Estas seguro de que quieres borrar tu cuenta?, Los datos serán irrecuperables")){
                    //Delete cookies
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
            const generateInvoice = () => {
                if($('.bs-dashboard__new-invoice > input').value > 0){
                    monto = $('.bs-dashboard__new-invoice > input').value;
                    router.loadRoute(8, '/#/negocios/dashboard/venta');
                    initBs(3);
                }else{
                    // if there isn't a paragraph error insert one
                    if($$('.bs-dashboard__new-invoice > p').length == 0){
                        $('.bs-dashboard__new-invoice').insertAdjacentHTML('beforeend', 
                            `<p class="bs-dashboard__new-invoice--error">El monto debe ser mayor a 0</p>`);
                    }
                }
            }
            // Click event to generate a new invoice
            $('.bs-dashboard__new-invoice--create').addEventListener('click', ()=>{
                generateInvoice();
            });
            // Generate a new invoice if the user press Enter
            $('.bs-dashboard__new-invoice > input').addEventListener('keyup', (e)=>{
                if(e.keyCode == 13) generateInvoice();
            });
            hotkeys("enter", ()=>{
                //if the input has a positive value, generate a new invoice
                generateInvoice();
            });
            break;

        // Invoice creation page
        case 3:
            let all2 = {
                name: getCookie("name"),
                email: getCookie("email"),
                cuit: getCookie("cuit"),
                profile: getCookie("profile"),
                totalSold: getCookie("total"),
                history: getCookie("history")
            }
            if(all2.totalSold == undefined) all2.totalSold = 0;
            //Carga la imagen de perfil
            $(`${C}__aside--profile`).setAttribute('src', getCookie("profile"));
            $('#sale-main-inp-1').value = numberWithCommas(monto) + 'ARS';
            let val;
            let errors = [];
            let inputs = [$('#sale-main-inp-1'), $('#sale-main-inp-3'), $('#sale-main-inp-2')];
            //The currency button doesn't need this ($('#sale-main-inp-2'))
            for(let i = 0; i < inputs.length-1; i++){
                inputs[i].addEventListener('focus', ()=>{
                    // Remove commas
                    val = inputs[i].value.replace(/,/g, '');
                    inputs[i].value = parseFloat(val);
                    // Select all text
                    inputs[i].select();
                })
                let extraText = (i == 0) ? "ARS" : "";
                inputs[i].addEventListener('blur', ()=>{
                    val = inputs[i].value;
                    // DNI extra validations
                    (i == 1 && DNIValidations(val, inputs[i])) ? errors[i] = true : errors[i] = false;
                    val = parseFloat(val);
                    (i == 0) ? val.toFixed(2) : val.toFixed(1);
                    // Check if the values are positive
                    if(val >= 0){
                        inputs[i].value = numberWithCommas(val) + extraText;
                        // If there isn't any error, remove the border
                        if(errors[i] == false) inputs[i].style.border = "none";
                        errors[0] = false;
                    }else{
                        //Give the input a red border
                        inputs[i].style.border = "3px solid #ff411f90";
                        errors[0] = true;
                    }
                })
            }
            // Display the search form
            initSearch(2);
            break;
        default:
            break;
    }
}
export default initBs;
