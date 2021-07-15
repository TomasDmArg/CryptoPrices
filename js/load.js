import {$, $$} from './selector.js';
import initSearch from './search.js';
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
        setTo(ione, itwo){
            $$('.nav__container--item')[ione].setAttribute('class', 'nav__container--item');
            $$('.nav__container--item')[ione].style.color = "var(--light)";
            $$('.nav__container--item')[ione].style.backgroundColor = "var(--dark)";
            $$('.nav__container--item')[itwo].style.backgroundColor = "var(--dark)";
            $$('.nav__container--item')[itwo].setAttribute('class', 'nav__container--item');
            $$('.nav__container--item')[itwo].style.color = "var(--light)";
        }
        enableToggle(){
            this.toggle.addEventListener('click', ()=>{
                this.load();
                this.activeButton();
                $$('.nav__container--item')[this.index].style.backgroundColor = "var(--principal-green)";
                $$('.nav__container--item')[this.index].style.color = "var(--dark)";
                switch (this.index){
                    case 0:
                        this.setTo(1,2);
                        const seePrices = new Page($('.main__content--button'), '/#/precios', 1);
                        seePrices.enableToggle();
                        break;
                    case 1:
                        this.setTo(0,2);
                        initSearch();
                        break;
                    case 2:
                        this.setTo(0,1);
                        break;
                }
            })
        }
    }
    const contactPage = new Page($('#contact'), '/#/contacto', 2);
    const home = new Page($('#home'), '/#/', 0);
    const pricesPage = new Page($('#prices'), '/#/precios', 1);
    if($$('.main__content--button').length === 1){
        const seePrices = new Page($('.main__content--button'), '/#/precios', 1);
        seePrices.enableToggle();
    }
    contactPage.enableToggle();
    pricesPage.enableToggle();
    home.enableToggle();
    // seePrices.enableToggle();
}
export default initLoad;

