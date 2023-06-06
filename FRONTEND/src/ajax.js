
//la funcion ajax retorna una promesa de lo que me devuelva la API
function ajax (metodo, url, datos){
    //se crera esta variable, con el valor de method para que corresponda al metodo de petiicon usado, y asi hacer un codigo mas limpio
    let configuracion = {
        method : metodo
    }
    //si el metodo que pase es POST o PUT, qlo que hace es selecionar esos datos que hayan pasado por la peticion del body y los convierte a JSON
    if(metodo == "POST" || metodo == "PUT"){
        configuracion.body = JSON.stringify(datos);
        configuracion.headers = {"Content-type" : "application/json"}
    }
    //con este fetch con conectamos a la API
    return fetch(url, configuracion).then(respuesta => respuesta.json())
};

//se exporta ajax
export default ajax