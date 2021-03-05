import {$, $$} from './selector.js'
const contactHTML = $('#contact-cont')
const initLoad = ()=>{
    const setHTML = el => {
        el.style.display = 'block';
        $('#content').innerHTML = "";
    }

    class Page{
        constructor(html, toggle){
            this.html = html;
            this.toggle = toggle;
        }
        load(){
            setHTML(this.html);
            $('.load-container').style.display = 'block'
            $('.load-container').style.animationName = 'load-cont'
            setInterval(() => {
                $('.load-container').style.animationName = 'unload-cont'
                $('.load-container').style.animationIterationCount = '1'
                setInterval(() => {
                    $('.load-container').style.display = 'none'            
                }, 500);
            }, 1000);
        }
        activeButton(){
            this.toggle.setAttribute('class', 'nav__container--item active');
        }
        enableToggle(){
            this.toggle.addEventListener('click', ()=>{
                this.load();
                this.activeButton()
            })
        }
    }
    const contactPage = new Page(contactHTML, $('#contact'));
    contactPage.enableToggle();
}
export default initLoad;

