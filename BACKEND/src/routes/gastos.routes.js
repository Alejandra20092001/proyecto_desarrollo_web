//Se importa el módulo Router de Express, que es una biblioteca de rutas para aplicaciones web. 
import { Router } from "express";

//Se importan los siguientes métodos del archivo gastos.controllers.js: obtenerGastos, anadirGastos, borrarGastos, inicioSesion y obtenerUsuarios. Se usan para interactuar con la base de datos de gastos y usuarios.
import { obtenerGastos, anadirGastos, borrarGastos, inicioSesion, obtenerUsuarios } from "../controllers/gastos.controllers.js";

//Se crea una variable de la clase Router de Express.
const route = Router();

//Se establece una ruta para una solicitud GET a la URL "/api-gasto" que ejecutará la función "obtenerGastos" cuando se llame.
route.get("/api-gasto", obtenerGastos);

//Se establece una ruta para una peticion POST a la URL "/api-gasto" y que ejecutará la función "anadirGastos" cuando s einvoque.
route.post("/api-gasto", anadirGastos);

//Se establece una ruta para una solicitud GET a la URL, que funcionara cuando reciba un parámetro con un ID con un formato específico (0-9 y entre 1 y 11 caracteres).
route.get("/api-gasto/:id([0-9]{1,11})", async (peticion, respuesta) => {
    //se llama a la función leer() con el parámetro de ID.
    let [error, gastos] = await leer(peticion.params.id);

    //Si hay un error, se devuelve el mensaje de error que viene de --> callback([{error : "error en la base de datos"}]); si no hay error, se devuelven los gastos que viene de --> callback([null, resultado]);
    respuesta.json(!error ? gastos : msgError);
});

//Se establece una ruta para una solicitud DELETE a la URL, lo que significa que se espera un parámetrocon un ID con un formato específico (0-9 y entre 1 y 11 caracteres). Cuando se llame a esta ruta, se ejecutará la función borrarGastos.
route.delete("/api-gasto/borrar/:id([0-9]{1,11})", borrarGastos);

//Se establece una ruta para una peticion POST a la URL "/api-gasto-login", que ejecutará la función "inicioSesion" cuando se invoque.
route.post("/api-gasto-login", inicioSesion);

//Se establece una ruta para una solicitud GET a la URL "/api-gasto-usuarios" que ejecutará la función "obtenerUsuarios" cuando se llame.
route.get("/api-gasto-usuarios", obtenerUsuarios)

//Se exportan los valores de la variable route.
export default route;