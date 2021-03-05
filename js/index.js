const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const setBg = (element, variable) => element.style.backgroundColor = `var(--${variable})`;
const setColor = (element, variable) => element.style.color = `var(--${variable})`;
const checkDark = ()=> body.classList.contains("dark");
const body = $('.body');
const logo = $('#logoContainer');
const allText = $$('.text');
let state = true;
import obtain from './part2.js';
const applyMode = ()=>{
    if (checkDark()) {
        setBg(body, 'dark');
        allText.forEach(element => setColor(element, 'light'));
        logo.setAttribute('src', './assets/complete-logo-dark.svg');
        document.cookie = "Theme=dark; expires=Mon, 25 May 2021 11:12:13 UTC; path=/";
        $('#nightMode > img').setAttribute('src', '../assets/brightness.svg')
        $$('.down-arrow').forEach(element => element.setAttribute('src', '../assets/down-arrow-dark.svg'));
    }else{
        setBg(body, 'light');
        $$('.down-arrow').forEach(element => element.setAttribute('src', '../assets/down-arrow.svg'));
        allText.forEach(element => setColor(element, 'dark'));
        logo.setAttribute('src', './assets/complete-logo.svg');
        $('#nightMode > img').setAttribute('src', '../assets/moon.svg')
        document.cookie = "Theme=light; expires=Mon, 25 May 2021 11:12:13 UTC; path=/";
    }
}
const darkMode = ()=>{
    body.classList = "body dark"
    applyMode();
    state = false;
}
const lightMode = ()=>{
    body.classList = "body light"
    applyMode();
    state = true;
}
let aCookie;
let aCookies = document.cookie.split(";");
console.log(aCookies)
const setCurrency = (currency, text) => {
    currency.innerHTML = text;
    console.log(text)
    document.cookie = `Currency=${text}; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    $('.item-currencies').style.display = "none";
}
const setLanguage = (lang, text) => {
    lang.innerHTML = text;
    console.log(text)
    document.cookie = `Language=${text}; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    $('.item-languages').style.display = "none";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
console.log(getCookie("Theme"))

console.log(aCookies[0])
if (aCookies === [""]) {
    if(aCookies[0].indexOf("Theme") === -1){
        document.cookie = `Theme=light; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    }
    if (aCookies[1].indexOf("Currency") === -1) {
        console.log('Me ejecutaron')
        document.cookie = `Currency=USD; expires=Mon, 25 May 2021 11:12:13 UTC; path=/`;
    }
}
if (getCookie("Theme") === "dark") {
    console.log('Dark')
    darkMode();
}
if (getCookie("Theme") === "light") {
    console.log('light')
    lightMode();
}
if (getCookie("Currency")) {
    setCurrency($('.currency-label'), getCookie("Currency"));
}
if (getCookie("Language")){
    setLanguage($('.language-label'), getCookie("Language"));
}

applyMode();
const changeMode = ()=>{
    (state) ? darkMode() : lightMode()
}
const nightMode = $('#nightMode');
let tState = 0;
const toggle = el =>{
    el.addEventListener('click', ()=>{
        if (tState === 1) {
            tState--;
        }else{
            tState++;
        }
        
        changeMode();
        
    });
}
toggle(nightMode);
let dropState = 0;
const dropList = (el, target) => {
    el.addEventListener('click', ()=> {
        if (dropState === 1) {
            target.style.display = "none" 
            dropState--;
        }else{
            target.style.display = "block"
            dropState++;
        }
    })
} 

dropList($('.language'), $('.item-languages'))
dropList($('.currency'), $('.item-currencies'))
let opciones = $$('.item-currencies__options')
opciones.forEach(element => {
    element.addEventListener('click', ()=>{
        let text = element.innerHTML;
        setCurrency($('.currency-label'), text);
    })
})
let idiomas = $$('.item-languages__options')
idiomas.forEach(element => {
    element.addEventListener('click', ()=>{
        let text = element.innerHTML;
        setLanguage($('.language-label'), text);
    })
})
$('.item-languages').style.display = "none"; 
$('.item-currencies').style.display = "none"; 
let vState = 1;
const hideDropList = ()=>{
    if (screen.width < 1000) {
        vState++;
        $('.header').style.paddingBottom = '0rem';
        $('.nav__container').style.display = "none";
        $('.nav__container--hamb-icon').style.display = 'block';
        $('.nav__container--close-icon').style.display = 'none';
    }
}
const showDropList = ()=>{
    if (screen.width < 1000) {
        vState--;
        $('.header').style.paddingBottom = '15rem';
        $('.nav__container').style.display = "inline-flex";
        $('.nav__container--hamb-icon').style.display = 'none';
        $('.nav__container--close-icon').style.display = 'block';
    }
}
hideDropList();
$('.nav__container--hamb-icon').addEventListener('click', ()=>{
    (vState === 0) ? hideDropList() : showDropList();
})
$('.nav__container--close-icon').addEventListener('click', ()=>{
    (vState === 0) ? hideDropList() : showDropList();
})
obtain();