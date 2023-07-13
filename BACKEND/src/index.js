// Se importa el modulo de express y se la asigna a una variable llamada "express". Express es un marco web para Node.js que proporciona un conjunto de características para crear aplicaciones web y APIs.
import express from "express";

//El bodyParser es un módulo de Node.js que proporciona un middleware para analizar el cuerpo de la solicitud entrante y extraer los datos en formato JSON. Esto le permite a la aplicación manejar los datos de la solicitud entrante y usarlos para realizar cualquier acción necesaria.
import bodyParser from "body-parser";

//Esta línea de código importa el archivo gastos.routes.js desde la carpeta routes. El archivo gastos.routes.js tiene las rutas de la aplicación.
import sitioRoute from "./routes/gastos.routes.js";

// Se crea una variable llamada app, de la aplicación Express; de esta forma se invoca Express.
const app = express();

// Establece un objeto llamado msgError con una propiedad llamada resultado que contiene el valor "error". De esta forma cada vez que se produzca un error en la app, aparecera este mensaje en la consola.
const msgError = { resultado: "error" };

//Se configuran las dos rutas existentes que tienen puertos diferentes, para permitir el intercambio de datos entre los dos orígenes específicos. 
app.use((peticion, respuesta, siguiente) => {
    //Se establece dentro de una misma constante llamada "rutasOriginales", que contiene las rutas url tanto del front como del back
    const rutasOriginales = ['http://localhost:5173', 'http://localhost:3000'];

    //Guarda los encabezados de origen de una solicitud en una variable llamada "originales".
    const originales = peticion.headers.origin;

    //Comprueba si el valor de la variable "rutasOriginales" contiene el valor de la variable "originales". Si es así, establece un encabezado HTTP llamado "Access-Control-Allow-Origin" con el valor de la variable "originales".
    if (rutasOriginales.includes(originales)) {
        respuesta.setHeader('Access-Control-Allow-Origin', originales);
    };

    ////Establece los encabezados Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers y Access-Control-Allow-Credentials para permitir que el navegador realice solicitudes CORS desde un origen específico.
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    respuesta.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    respuesta.setHeader('Access-Control-Allow-Credentials', 'true');
    
    //Esta función permite que el programa continue y realice la función especifica.
    siguiente();
});

// Usa el módulo bodyParser para analizar los datos JSON enviados en las solicitudes HTTP.
app.use(bodyParser.json());

//El metodo "use" de Express indica que todas las rutas, definidas en el archivo "sitioRoute", se deben usar para manejar las solicitudes entrantes.
app.use(sitioRoute);

//Esta función maneja los errores, y titne cuatro parametros: error, petición, respuesta y siguiente. La respuesta se convierte en un objeto JSON con el mensaje de error indicado anteriormente.
app.use((error, peticion, respuesta, siguiente) => {
    // con el json se convierte en objeto json la respuesta
    respuesta.json(msgError);
});

app.use((peticion, respuesta) => {
    // con el json se convierte en objeto json la respuesta
    respuesta.json(msgError);
});

//Le dice al servidor que escuche las solicitudes entrantes en el puerto 3000. Esto significa que cualquier solicitud entrante en ese puerto será manejada por el servidor.
app.listen(3000);
//Se muestra un mensaje en la consola para indicar que el servidor esta corriendo en el puerto 3000.
console.log("Servidor corriendo en el puerto 3000");
