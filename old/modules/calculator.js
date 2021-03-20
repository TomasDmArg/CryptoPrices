class Calculator{
    constructor(num){ 
        this.window = document.querySelector(`.calculator__section-${num}`);
        this.pair = document.querySelector(`.pair-${num}`);
        this.exchange = document.querySelector(`.exchange-${num}`);
        this.buy = document.querySelector(`#buy-${num}`);
        this.sell = document.querySelector(`#sell-${num}`);
        this.buyInput = document.querySelector(`.buy-input-${num}`);
        this.sellInput = document.querySelector(`.sell-input-${num}`);
        this.button = document.querySelector(`.calc-img-${num}`);
        this.closeButton = document.querySelector(`#closeBtn-${num}`);
        this.nextButton = document.querySelector(`.img-${num}`);
        this.nextButtonS = document.querySelector(`.img-${num}-s`);
        this.convertedS = document.querySelector(`.p-${num}-s`);
        this.converted = document.querySelector(`.p-${num}`);
    }
    show(){
        this.window.style.display = 'block';
    }
    hide(){
        this.window.style.display = 'none';
    }
}
export default Calculator;