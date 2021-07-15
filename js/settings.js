import {$, $$} from './selector.js';
let settingsMainButton = $('#settings');
let settingsPanel = $('.settings_items');
let button = $('.currency_items');
let buttonChilds = $$('.currency_items > span');
const checkHover = () =>{
    settingsPanel.addEventListener('mouseover', ()=>{
        return true;
    });
    settingsPanel.addEventListener('mouseleave', ()=>{
        settingsPanel.style.display = 'none';
    });
    return false;
}
const initSettings = ()=>{
    settingsMainButton.addEventListener('mouseover', ()=>{
        settingsPanel.style.display = 'block';
    });
    settingsMainButton.addEventListener('mouseleave', ()=>{
        setTimeout(() => {
            if(checkHover(settingsPanel)){
                settingsPanel.style.display = 'none';
            }
        }, 1200)
    });
    for (let i = 0; i < buttonChilds.length; i++) {
        let el = buttonChilds;
        el[i].addEventListener('click', ()=>{
            el[i].setAttribute('class', 'settings__active');
            (i == 1) ? el[0].setAttribute('class', '') : el[1].setAttribute('class', '');
        });
    }
};
export default initSettings;