import {$, $$} from './selector.js';
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
        data.profile = "https://tmdm.com.ar/u/business-profile.svg";
    }
    document.cookie = `name=${data.name};     expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    document.cookie = `email=${data.email};   expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    document.cookie = `cuit=${data.cuit};    expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    document.cookie = `profile=${data.profile}; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
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
        default:
            break;
    }
}
export default initBs;
