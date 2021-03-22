import {$} from '../selector.js'
const createCard = (name, symbol, price, change, image) => {
    let currency = $('.currency-label').innerText;
    const template = `
    <section class="card-container">
        <section>
                <section class="card__name-container">
                    <h2>${name}</h2>
                    <h4 class="text">${symbol}</h4>
                </section>
                <h3 class="text price">$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                <p class="hidden-value">${price}</p>
                <h4 class="up percent">${change.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%"}</h4>
                <section class="card-image">
                    <img src="${image}" class="card-image-img" alt="">
                </section>
                <section class="buttons">
                    <a class="card-button active" >Ver mas</a>
                    <a class="card-button  convert text" >Convertir</a>
                </section>
                <div class="bg"></div>
                <h2 class="bg-text title">Convertir ${name} a ${currency}</h2>
                <input type="number" placeholder="${symbol}..." class="converter-input" />    
                <p class="bg-text value"><b class="value-converted">0</b><b class="converter-curency">${currency}</b></p>
                <img src="/assets/close.svg" alt="" class="bg-close">
        </section>
    </section>
    `;
    $('#content').insertAdjacentHTML('beforeend', template);
}
export default createCard;