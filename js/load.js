import {$, $$} from './selector.js';
const contactHTML = $('#contact-cont');
import router from './index.js';
const initLoad = ()=>{
    class Page{
        constructor(toggle, url, index){
            this.toggle = toggle;
            this.url = url;
            this.index = index;
            this.state = 0;
        }
        load(){
            router.loadRoute(this.index, this.url)
            $('.load-container').style.display = 'block';
            $('.load-container').style.animationName = 'load-cont';
            setInterval(() => {
                $('.load-container').style.animationName = 'unload-cont';
                $('.load-container').style.animationIterationCount = '1';
                setInterval(() => {
                    $('.load-container').style.display = 'none';  
                }, 500);
            }, 1000);
        }
        activeButton(){
            this.toggle.setAttribute('class', 'nav__container--item active');
            this.state = 1;
        }
        disableButton(){
            this.toggle.setAttribute('class', 'nav__container--item');
            this.state = 0;
        }
        enableToggle(){
            this.toggle.addEventListener('click', ()=>{
                this.load();
                (this.state === 0 ) ? this.activeButton() : this.disableButton();
            })
        }
    }
    const contactPage = new Page($('#contact'), '/#/contacto', 1);
    const pricesPage = new Page($('#prices'), '/#/precios', 2);
    contactPage.enableToggle();
    pricesPage.enableToggle();
}
export default initLoad;

