
//Esta función ajax realiza una petición a una API. 
function ajax (metodo, url, datos){

    //Esta variable, con el valor de method corresponde al método de petición usado, y asi hacer un codigo mas limpio.
    let configuracion = {
        method : metodo
    };

    //Si el metodo de la petición que pase es POST o PUT, selecciona esos datos que hayan pasado por la peticion del body y los convierte a formato JSON.
    if(metodo == "POST" || metodo == "PUT"){
        configuracion.body = JSON.stringify(datos);
        configuracion.headers = {"Content-type" : "application/json"};
    };

    //Con fetch, puede conectarse a la API y devuelve una respuesta en formato JSON.
    return fetch(url, configuracion).then(respuesta => respuesta.json());
};

//Se exporta la función ajax.
export default ajax;