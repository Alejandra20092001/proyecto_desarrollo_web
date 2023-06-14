//importo expreses
import { Router } from "express";

//se importan las funciones creadas en la carpeta especificada
import { obtenerGastos, anadirGastos, actualizarGastos, borrarGastos } from "../controllers/gastos.controllers.js";

const route = Router();

// si el usuario hace una peticion via get, el servidor realizara la funcion obtenerGastos
route.get("/api-gasto", obtenerGastos);

// si el usuario hace una peticion via post, el servidor realizara la funcion anadirGastos
route.post("/api-gasto", anadirGastos);

// si el usuario hace una peticion via put, el servidor realizara la funcion acualizarGastos
route.put("/api-gasto", actualizarGastos);

//se concatena con la peticion
route.get("/api-gasto/:id([0-9]{1,11})", async (peticion, respuesta) => {
    //en caso de que exista solo puede tener un gasto; en get el resultado devuelve gastos, por eso se ponen gastos
    let [error, gastos] = await leer(peticion.params.id);
    //cuando tenga la respuesta; si no tengo error que aparezca gastos que viene de --> callback([null, resultado]); y si no el msgError --> callback([{error : "error en la base de datos"}])
    respuesta.json(!error ? gastos : msgError);
});

// 
route.delete("/api-gasto/borrar/:id([0-9]{1,11})", borrarGastos);

//se exportan odos los valores de route
export default route;