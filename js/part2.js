const obtain = ()=>{
    fetch('https://cors.bridged.cc/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ce38fba1-db16-49a7-802e-94ad5d7d0902')
    .then(response => response.json())
    .then(data => console.log(data))
}

export default obtain;
// obtain
// let aCookie;
// let aCookies = document.cookie.split(";");
// console.log(aCookies)
// console.log(aCookies[2])
// if (aCookies[2] === " Theme=dark") {
//     console.log('Dark')
//     darkMode();
// }
// if (aCookies[2] === " Theme=light") {
//     console.log('light')
//     lightMode();
// }
// applyMode();
// const changeMode = ()=>{
//     (state) ? darkMode() : lightMode()
// }
// const nightMode = $('#nightMode');
// let tState = 0;
// const toggle = el =>{
//     el.addEventListener('click', ()=>{
//         if (tState === 1) {
//             tState--;
//         }else{
//             tState++;
//         }
        
//         changeMode();
        
//     });
// }
// toggle(nightMode);



