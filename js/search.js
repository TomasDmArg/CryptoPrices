import {$, $$} from './selector.js';
import list from './cryptolist.js';
const initSearch = ()=>{
    const INP = $('.search-container > div > input');
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
                    window.location.href('http://127.0.0.1:5501/')
                    alert('Click')
                })
                INP.addEventListener('focus', ()=>{
                    $$('.search-result')[i].style.display = 'block';
                })
                INP.addEventListener('blur', ()=>{
                    //$$('.search-result')[i].style.display = 'none';
                })
            }
        }else{
            for (let i = 0; i < arr.length; i++){
                $$('.search-result')[i].innerHTML = `${arr[i].name} 22`;
                $$('.search-result')[i].style.display = 'block';
                $$('.search-result')[i].addEventListener('click', ()=>{
                    
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
    console.log(list);
    INP.addEventListener('focus', ()=>{
        INP.addEventListener('keyup', (e)=>{
            if (INP.value.length >= 2) {
                let val = INP.value.toUpperCase();
                let data = list;
                let filterResult = data.filter( data => data.name.includes(val));
                if (filterResult.length === 0) {
                    console.log("Ningun resultado encontrado");
                }else{
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
                if (e.key === 'i') {
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