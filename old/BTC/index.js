const PROXY_URL = "https://quiet-plains-83026.herokuapp.com/";
const API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ce38fba1-db16-49a7-802e-94ad5d7d0902';

const obtain = async ()=>{
    try {
        const obtainData = await fetchData(PROXY_URL + API);
        const obtenerMostrar = num => {
            let precio = obtainData.data[num].quote.USD.price;

        }
        obtenerMostrar(0);
    }
    catch (error){
        console.error(error)
    }


const alertar = (num, target, direccion, criptomoeda)=>{
    let obtenerPrecio = elementoPrecioOculto[num].innerHTML;
    obtenerPrecio = parseFloat(obtenerPrecio);
    if (direccion == "true") {
        if (target >= obtenerPrecio) {
            obtenerPrecio = obtenerPrecio.toFixed(3);
            obtenerPrecio = obtenerPrecio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            obtenerPrecio = `$ ${obtenerPrecio} USD`;
            elementoNombreOculto[num].innerHTML = obtainData.data[num].name;
            const notificar = (titulo, cuerpo) =>{
                let opciones = {
                    body: cuerpo,
                    logo: './assets/Bitcoin.svg',
                }
                let notificacion =  new Notification(titulo, opciones);
                setTimeout(notificacion.close.bind(notificacion), 5000);
            }
            notificar('Alerta:', `El precio del ${criptomoeda} es: ${obtenerPrecio}`);
        }
    }else if (direccion == "false") {
        if (target <= obtenerPrecio) {
            obtenerPrecio = obtenerPrecio.toFixed(3);
            obtenerPrecio = obtenerPrecio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            obtenerPrecio = `$ ${obtenerPrecio} USD`;
            elementoNombreOculto[num].innerHTML = obtainData.data[num].name;
            const notificar = (titulo, cuerpo) =>{
                let opciones = {
                    body: cuerpo,
                    logo: './assets/Bitcoin.svg',
                }
                let notificacion =  new Notification(titulo, opciones);
                setTimeout(notificacion.close.bind(notificacion), 5000);
            }
            notificar('Alerta:', `El precio del ${criptomoeda} es: ${obtenerPrecio}`);
        }
    }
};