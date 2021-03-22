import {$, $$, body, logo, allText} from './selector.js'
const setBg = (element, variable) => element.style.backgroundColor = `var(--${variable})`;
const setColor = (element, variable) => element.style.color = `var(--${variable})`;
export const checkDark = ()=> body.classList.contains("dark");
let state = true;
export const applyMode = ()=>{
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
export const darkMode = ()=>{
    body.classList = "body dark"
    applyMode();
    state = false;
}
export const lightMode = ()=>{
    body.classList = "body light"
    applyMode();
    state = true;
}
export const changeMode = ()=>{
    (state) ? darkMode() : lightMode()
}
