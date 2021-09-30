import {$, $$} from './selector.js';
import list from './cryptolist.js';
import loadCrypto from './html/currency.js';
let state = 0;
let getResult;
const initSearch = ()=>{
        let INP = $('.search-container > div > input');
        INP.addEventListener('focus', ()=>{
            $('.search-result').style.display = 'block';
        })
        // INP.addEventListener('blur', ()=>{
        //     $$('.search-result')[0].style.display = 'none';
        //     $$('.search-result')[1].style.display = 'none';
        //     $$('.search-result')[2].style.display = 'none';
        //     $$('.search-result')[3].style.display = 'none';
        //     $$('.search-result')[4].style.display = 'none';
        //     $$('.search-result')[5].style.display = 'none';
        //     $$('.search-result')[6].style.display = 'none';
        // })
            const show = ()=>{
                INP.focus();
                state++;
            }
            hotkeys("ctrl+b, command+b", ()=>{
                    show();
                }
            )
        const showResults = (arr)=>{
            if (arr.length > 6) {
                for (let i = 0; i < 6; i++){
                    $$('.search-result')[i].innerHTML = `${arr[i].name}`;
                    $$('.search-result')[i].style.display = 'block';
                    $$('.search-result')[i].addEventListener('click', ()=>{
                        loadCrypto("/#c/" + getResult[i].id);
                    })
                    INP.addEventListener('focus', ()=>{
                        $$('.search-result')[i].style.display = 'block';
                    })
                    INP.addEventListener('blur', ()=>{
                        $$('.search-result')[i].style.display = 'block';
                        setTimeout(() => {
                            $$('.search-result')[i].style.display = 'none !important';
                        }, 1200)
                    })
                }
            }else{
                for (let i = 0; i < arr.length; i++){
                    $$('.search-result')[i].innerHTML = `${arr[i].name}`;
                    $$('.search-result')[i].style.display = 'block';
                    $$('.search-result')[i].addEventListener('click', ()=>{
                        loadCrypto("/#c/" + getResult[i].id);
                    })
                    INP.addEventListener('focus', ()=>{
                        $$('.search-result')[i].style.display = 'block';
                    })
                    // INP.addEventListener('blur', ()=>{
                    //     $$('.search-result')[i].style.display = 'none';
                    // })
                }
            }
        };
        for (let i = 0; i < list.length; i++) {
            let name = list[i].name;
            let symbol = list[i].symbol;
            list[i].name = `${name.toUpperCase()}`;
        }
        INP.addEventListener('focus', ()=>{
            console.log(INP.value)
            INP.addEventListener('keyup', (e)=>{
                if (INP.value.length >= 2) {
                    console.log(INP.value)
                    let val = INP.value.toUpperCase();
                    let data = list;
                    let filterResult = data.filter( data => data.name.includes(val));
                    if (filterResult.length === 0) {
                        console.log("Ningun resultado encontrado");
                    }else{
                        getResult = filterResult;
                        showResults(filterResult);
                    }
                }
                if(e.key === 'Escape'){
                    for (let i = 0; i < 6; i++){
                        $$('.search-result')[i].style.display = 'none';
                        INP.blur();
                    }
                }
                if(e.key === 'Ctrl'){
                    if (e.key === 'b') {
                        for (let i = 0; i < 6; i++){
                            $$('.search-result')[i].style.display = 'none';
                        }
                        INP.blur();
                    }
                };
            });
        });
}
export default initSearch;