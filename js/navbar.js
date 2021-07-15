import {$, $$} from './selector.js';
const navScripts = ()=>{
    let vState = 0;
    const hideDropList = ()=>{
        if (screen.width < 1000) {
            vState--;
            $('.header').style.paddingBottom = '0rem';
            $('.nav__container').style.display = "none";
            $('.nav__container--hamb-icon').style.display = 'block';
            $('.nav__container--close-icon').style.display = 'none';
        }
    }
    const showDropList = ()=>{
        if (screen.width < 1000) {
            vState++;
            $('.header').style.paddingBottom = '30rem';
            $('.nav__container').style.display = "inline-flex";
            $('.nav__container--hamb-icon').style.display = 'none';
            $('.nav__container--close-icon').style.display = 'block';
        }
        // if (screen.width > 1000) {
        //     vState++;
        //     $('.header').style.paddingBottom = '30rem';
        //     $('.nav__container').style.display = "inline-flex";
        //     $('.nav__container--hamb-icon').style.display = 'none';
        //     $('.nav__container--close-icon').style.display = 'none';
        // }
    }
    hideDropList();
    $('.nav__container--hamb-icon').addEventListener('click', ()=>{
        showDropList();
    })
    $('.nav__container--close-icon').addEventListener('click', ()=>{
        (vState === 0) ? hideDropList() : showDropList();
    })
}
export default navScripts;