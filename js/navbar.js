import {$, $$} from './selector.js';
const navScripts = ()=>{
    let vState = 0;
    const resetNav = ()=>{
        $('#header').style.cssText = 'padding-bottom: 0rem';
        $('#nav__container').style.cssText = "display: inline-flex";
        $('#nav-close').style.cssText = 'display: none';
        $('#nav-open').style.cssText = 'display: none';
    }
    const hideDropList = ()=>{
        if (window.innerWidth < 1000) {
            vState--;
            $('#header').style.cssText = 'padding-bottom: 0rem';
            $('#nav__container').style.cssText = 'display: none';
            $('#nav-open').style.cssText = 'display: block';
            $('#nav-close').style.cssText = 'display: none';
        }
    }
    const showDropList = ()=>{
        if (window.innerWidth < 1000) {
            vState++;
            $('#header').style.paddingBottom = '30rem';
            $('#nav__container').style.cssText = "display: inline-flex";
            $('#nav-open').style.display = 'none';
            $('#nav-close').style.display = 'block';
        }else{
            resetNav();
        }
    }
    hideDropList();
    $('#nav-open').addEventListener('click', ()=>{
        showDropList();
    })
    $('#nav-close').addEventListener('click', ()=>{
        (vState === 0) ? hideDropList() : showDropList();
    })
}
export default navScripts;