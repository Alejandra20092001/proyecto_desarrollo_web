//se incluye el modulo de express
import express from "express"

//se invoca el body-parser
import bodyParser from "body-parser";


// se invoca el express, llamandolo rutas
const app = express();

//esta constante muestra un mensaje en el que pone error, que aparecera cada vez que haya un error en el sistema
const msgError = {resultado : "error"};

// para cualquier peticion que entre con content-type
app.use(bodyParser.json())

//se vincula la ruta del rutas con la carpeta ..
//app.use("/", express.static(""))



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
