//se incluye el modulo de express
import express from "express"

//se invoca el body-parser
import bodyParser from "body-parser";

//se importa la variable route, del archivo de gastos.routes.js
import sitioRoute from "./routes/gastos.routes.js"

// se invoca el express, llamandolo rutas
const app = express();

//esta constante muestra un mensaje en el que pone error, que aparecera cada vez que haya un error en el sistema
const msgError = {resultado : "error"};

//con cors, se unen ambos front y back
app.use((peticion, respuesta, siguiente) => {
    //se mete dentro de una misma constante las rutas tanto del front como del back
    const rutasOriginales = ['http://localhost:5173', 'http://localhost:3000'];
    //
    const originales = peticion.headers.origin;
    //
    if(rutasOriginales.includes(originales)) {
        respuesta.setHeader('Access-Control-Allow-Origin', originales);
    };
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    respuesta.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    respuesta.setHeader('Access-Control-Allow-Credentials', 'true');
    siguiente();
});


// para cualquier peticion que entre con content-type
app.use(bodyParser.json())

//se le indica que la app use la funcion router() 
app.use(sitioRoute);


// si a mi rutas se le hace cualquier tipo de peticion que no entre por las anteriores enviamos el mensaje error
//¡¡CUALQUIER ERROR PASA POR AQUI!!
app.use((error, peticion, respuesta, siguiente) => {
    // con el json se convierte en objeto json la respuesta
    respuesta.json(msgError)
});

app.use((peticion, respuesta) => {
    // con el json se convierte en objeto json la respuesta
    respuesta.json(msgError)
});

//el rutas en el puerto 3000
app.listen(3000)
console.log("servidor corriendo en 3000")
