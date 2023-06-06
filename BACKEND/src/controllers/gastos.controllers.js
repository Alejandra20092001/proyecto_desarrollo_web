
// se invocan los modulos de db
import {leer, crear, actualizarEstado, actualizarTexto, borrar} from "../database/db.js"
//se invoca el body-parser
import bodyParser from "body-parser";

export const obtenerGastos = async (peticion, respuesta) => {
    //estas dos variables saldran de leer 
    let [error, gastos] = await leer();
    //cuando tenga la respuesta; si no tengo error que aparezca gastos que viene de --> callback([null, resultado]); y si no el msgError --> callback([{error : "error en la base de datos"}])
    respuesta.json(!error ? gastos : msgError)
};

