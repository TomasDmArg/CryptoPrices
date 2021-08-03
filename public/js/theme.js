import {$, $$, body, logo, allText} from './selector.js'
const setBg = (element, variable) => element.style.backgroundColor = `var(--${variable})`;
const setColor = (element, variable) => element.style.color = `var(--${variable})`;
export const checkDark = ()=> body.classList.contains("dark");
let state = true;
export const matchColors = ()=>{
    let currentColor = '#eeeeee'
    let text = $$('.text');
    for (let i = 0; i < text.length; i++) {
        text[i].style.color = currentColor;
    }
};
export const applyMode = ()=>{
    if (checkDark()) {
        setBg(body, 'dark');
        allText.forEach(element => setColor(element, 'light'));
        logo.setAttribute('src', './assets/complete-logo-dark.svg');
        $$('.down-arrow').forEach(element => element.setAttribute('src', '../assets/down-arrow-dark.svg'));
        matchColors();
    }else{
        setBg(body, 'light');
        $$('.down-arrow').forEach(element => element.setAttribute('src', '../assets/down-arrow.svg'));
        allText.forEach(element => setColor(element, 'dark'));
        logo.setAttribute('src', './assets/complete-logo.svg');
        $('#nightMode > img').setAttribute('src', '../assets/moon.svg')
        matchColors();
    }
};
export const darkMode = ()=>{
    body.classList = "body dark";
    matchColors();
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            matchColors();
        }, 1000);
    }
    applyMode();
    state = false;
}
export const lightMode = ()=>{
    body.classList = "body light";
    matchColors();
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            matchColors();
        }, 1000);
    }
    applyMode();
    state = true;
}
export const changeMode = ()=>{
    (state) ? darkMode() : lightMode()
}
