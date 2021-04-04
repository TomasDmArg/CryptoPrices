import {$, $$} from './selector.js';
const contactHTML = $('#contact-cont');
import router from './index.js';
const initLoad = ()=>{
    let active
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
                this.activeButton();
                switch (this.index){
                    case 0:
                        $$('.nav__container--item')[1].setAttribute('class', 'nav__container--item');
                        $$('.nav__container--item')[2].setAttribute('class', 'nav__container--item');
                        break;
                    case 1:
                        $$('.nav__container--item')[0].setAttribute('class', 'nav__container--item');
                        $$('.nav__container--item')[2].setAttribute('class', 'nav__container--item');
                        break;
                    case 2:
                        $$('.nav__container--item')[0].setAttribute('class', 'nav__container--item');
                        $$('.nav__container--item')[2].setAttribute('class', 'nav__container--item');
                        break;
                    default:
                        $$('.nav__container--item')[0].setAttribute('class', 'nav__container--item');
                        $$('.nav__container--item')[1].setAttribute('class', 'nav__container--item');
                        $$('.nav__container--item')[2].setAttribute('class', 'nav__container--item');
                        break;
                }
            })
        }
    }
    const contactPage = new Page($('#contact'), '/#/contacto', 1);
    const home = new Page($('#home'), '/#/', 0);
    const pricesPage = new Page($('#prices'), '/#/precios', 2);
    // const seePrices = new Page($('#seePrices'), '/#/precios', 2);
    contactPage.enableToggle();
    pricesPage.enableToggle();
    home.enableToggle();
    // seePrices.enableToggle();
}
export default initLoad;

