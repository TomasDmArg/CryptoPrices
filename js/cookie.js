import {$} from './selector.js'
import {applyMode, darkMode, lightMode, changeMode} from './theme.js';
export const setCurrency = (currency, text) => {
    currency.innerHTML = text;
    document.cookie = `Currency=${text}; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    $('.item-currencies').style.display = "none";
}
export const setLanguage = (lang, text) => {
    lang.innerHTML = text;
    document.cookie = `Language=${text}; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    $('.item-languages').style.display = "none";
}
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export const initCookie = ()=>{
    let aCookies = document.cookie.split(";");


    if (aCookies === [""]) {
        if(aCookies[0].indexOf("Theme") === -1){
            document.cookie = `Theme=light; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
        }
        if (aCookies[1].indexOf("Currency") === -1) {
            document.cookie = `Currency=USD; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
        }
    }
    if (getCookie("Theme") === "dark") {
        darkMode();
    }
    if (getCookie("Theme") === "light") {
        lightMode();
    }
    if (getCookie("Currency")) {
        setCurrency($('.currency-label'), getCookie("Currency"));
    }
    if (getCookie("Language")){
        setLanguage($('.language-label'), getCookie("Language"));
    }

applyMode();
}