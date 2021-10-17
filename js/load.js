import {$, $$} from './selector.js';
import initSearch from './search.js';
const contactHTML = $('#contact-cont');
import initBs from './businessMain.js';
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
        //SetTo des-selecciona el resto de botones de la barra de navegacion
        setTo(selected){
            for(let i = 0; i < $$('nav__container--item').length; i++){
                if(i != selected){
                    let el = $$('.nav__container--item')[i];
                    el.style.backgroundColor = "var(--dark)";
                    el.setAttribute('class', 'nav__container--item');
                    el.style.color = "var(--light)";
                }else{
                    $$('.nav__container--item')[i].style.backgroundColor = "var(--principal-green)";
                    $$('.nav__container--item')[i].style.color = "var(--dark)";
                }
            }
        }
        enableToggle(){
            this.toggle.addEventListener('click', ()=>{
                this.load();
                this.activeButton();
                switch (this.index){
                    //Id: Nro de elemento del array de botones
                    //Botón Home Id:0
                    case 0:
                        this.setTo(0);
                        //Botón de ver mas en el home/landing
                        const seePrices = new Page($('.main__content--button'), '/#/precios', 1);
                        seePrices.enableToggle();
                        break;
                    //Botón Precios Id:1
                    case 1:
                        this.setTo(1);
                        initSearch();
                        break;
                    //Botón Contacto Id:3
                    case 2:
                        this.setTo(3);
                        break;
                    //Botón Negocios (Main) Id:2
                    case 5:
                        this.setTo(2);
                        const createAcc = new Page($('.business__landing--button'), '/#/negocios/crear', 6);
                        createAcc.enableToggle();
                        break;
                    //Botón Negocios (Crear) Id:2
                    case 6:
                        this.setTo(2);
                        initBs(1);
                        const dashboard = new Page($('.sign-up__form--button'), '/#/negocios/dashboard', 7);
                        dashboard.enableToggle();
                        break;
                }
            })
        }
    }
    const contactPage = new Page($('#contact'), '/#/contacto', 2);
    const home = new Page($('#home'), '/#/', 0);
    const pricesPage = new Page($('#prices'), '/#/precios', 1);
    const businessPage = new Page($('#business'), '/#/negocios', 5);
    if($$('.main__content--button').length === 1){
        const seePrices = new Page($('.main__content--button'), '/#/precios', 1);
        seePrices.enableToggle();
    }
    contactPage.enableToggle();
    pricesPage.enableToggle();
    home.enableToggle();
    businessPage.enableToggle();
    // seePrices.enableToggle();
}
export default initLoad;

