import {$, $$} from './selector.js';
import {changeMode} from './theme.js';
import {setCurrency, setLanguage} from './cookie.js'
const navScripts = ()=>{
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
            $('.header').style.paddingBottom = '30rem';
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
}
export default navScripts;