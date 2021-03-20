const fetchData = (api_url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', api_url, true);
        xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Test Error', api_url))
        }
    }
    xhttp.send();
    });
}
async function convertBuyDai(){
    const obtainAll = await fetchData('https://cors.bridged.cc/https://criptoya.com/api/buenbit/dai/ars');
    console.log(obtainAll);
}