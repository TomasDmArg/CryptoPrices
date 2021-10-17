const getAll = ()=>{
    fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(response => response.json())
        .then(function data (){
            return data;
        })
}
const list = getAll();
export default list;