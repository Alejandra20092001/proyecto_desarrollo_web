
// se importan los modulos creados en la db
import {leer, crear, actualizarEstado, borrar, iniciarSesion, leerUsuarios} from "../database/db.js"

//se invoca el body-parser
import bodyParser from "body-parser";

//se crea la constante obtenerGastos, la cual va a enviar de respuesta la funcion leer con la cual obtiene los datos. Pero para obener esa respuesta se tiene que esperar a obtener los resultados de leer y que odo haya salido correcto
export const obtenerGastos = async (peticion, respuesta) => {
    //estas dos variables salen de leer. Error hace referencia al primer valor de la funcion leer y gastos al segundo, es decir al resultado 
    let [error, gastos] = await leer();

    const msgError = "hay error a la hora de obtener datos"
    //cuando este la respuesta; si no hay error que aparezcan los gastos, que vienen de --> callback([null, resultado]); y si no el msgError --> callback([{error : "error en la base de datos"}])
    respuesta.json(!error ? gastos : msgError);
};

//se crea la constante anadirGastos, la cual va a hacer una petición al body para obtener el valor que se haya puesto y lo devolvera creando un nuevo gasto
export const anadirGastos =  async (peticion, respuesta) => {

    const msgError = "error a la hora de añadir datos"

    //se envia datos de db.js; concretamente se envia gasto,es decir el id, usuario y cantidad
    let gasto = peticion.body;
    //va a preguntar el equivalente boolean; si existe gasto y si es trim (elimina los espacios en blanco), y es diferente de vacio (tiene texto) hara la siguiente funcion 
    if(gasto){
        //se crea el gasto una vez ha salido bien la respuesta crear y ha recibido los valores que se han puesto en el body
        let [error, resultado] = await crear(gasto);
        //si no hay error hace esta funcion
        if(!error){
            //si la consulta salio mal que muestre "ko"
            let resultadoConsulta = {resultado : "ko"}
            //si resultado ha afectado a las filas y es mayor que 0; es decir funciona, realizara esos cambios
            if(resultado.affectedRows > 0){
                //se cambia el mensaje del resultadoConsulta de ko por ok
                resultadoConsulta.resultado = "ok";
                //a resultadoConsulta se le añade un id
                resultadoConsulta.id = resultado.insertId;
            }
            //retorna un json con el objeto resultadoConsulta
            return respuesta.json(resultadoConsulta)
        }
    };
    //si no se envio eso correctamente que muestr el msgError
    respuesta.json(msgError);
};

//se crea la contante borrarGastos, la cual permite eliminar los gastos, para ello elminina directamene el id de ese gasto de esa forma se borran todos los datos relacionados a el
export const borrarGastos = async (peticion, respuesta) => {
    //la funcion borrar recibe el id del gasto qeu se quiere eliminar
    let [error, resultado] = await borrar(peticion.params.id);
    //si no hay error:
    if(!error){
        //se pone en json, si el resultado afecta a las filas y es mayor que 0, es decir se ha producido un cambio; que aprezca "ok" y si no "ko" (que es cuando no hay nada que borrar)
        return respuesta.json({resultado : resultado.affectedRows > 0 ? "ok" : "ko"})
    }
    respuesta.json(msgError);
};

export const inicioSesion = async (peticion, respuesta) => {
    let [error, datos] = await iniciarSesion(peticion.body);

    respuesta.json(!error ? datos : error);
};

export const obtenerUsuarios = async (peticion, respuesta) => {
    let [error, datos] = await leerUsuarios();

    respuesta.json(!error ? datos : error);
};