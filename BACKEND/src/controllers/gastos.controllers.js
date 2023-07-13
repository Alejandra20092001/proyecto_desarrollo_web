
//Importa las funciones que fueron exportadas desde el archivo db.js. Estas funciones se usan para interactuar con la base de datos.
import {leer, crear, borrar, iniciarSesion, leerUsuarios} from "../database/db.js"

//Es un middleware que analiza el cuerpo de la solicitud  y extrae los datos en formato JSON
import bodyParser from "body-parser";

//Se utiliza para obtener los gastos de la base de datos. Utiliza y luego devuelve los gastos si no hay errores, y en caso de que los haya un mensaje de error..
export const obtenerGastos = async (peticion, respuesta) => {
    //Esta funcion obtiene los gastos. Esos dos parametrosvienen de la funcion leer. Error hace referencia al primer valor de la funcion leer y gastos al segundo, es decir al resultado.
    let [error, gastos] = await leer();

    //Esta variable msgError, mostrará el mensaje "hay error a la hora de obtener datos en la funcion obtenerGastos"  cuando sea invocada
    const msgError = "hay error a la hora de obtener datos en la funcion obtenerGastos";

    //Comprueba si hay un error en la solicitud. Si no hay errores, devuelve los gastos, que vienen de --> callback([null, resultado]); de lo contrario devuelve un mensaje de error.
    respuesta.json(!error ? gastos : msgError);
};

//Se utiliza para añadir gastos a la base de datos.
export const anadirGastos =  async (peticion, respuesta) => {
    //Esta variable msgError, mostrará el mensaje "error a la hora de añadir datos, en la función anadirGasto"  cuando sea invocada
    const msgError = "error a la hora de añadir datos, en la función anadirGastos";

    //Asigna el cuerpo de la solicitud (petición) a una variable llamada gasto.
    let gasto = peticion.body;

    //Comprueba si se ha creado un gasto correctamente. 
    if(gasto){
        //Se creará el gasto una vez ha salido correcta la funcion crear y ha recibido los valores que se han puesto en el body.
        let [error, resultado] = await crear(gasto);

        //Si no hay error:
        if(!error){
            //Si la consulta no se realiza correctamente, el resultado será "ko".
            let resultadoConsulta = {resultado : "ko"};

            //Si resultado ha afectado a las filas y es mayor que 0; es decir funciona:
            if(resultado.affectedRows > 0){
                //Si la consulta sale bien, el resultado será "ok" y se añadirá un ID al objeto resultadoConsulta.
                resultadoConsulta.resultado = "ok";
                resultadoConsulta.id = resultado.insertId;
            };

            //El objeto resultadoConsulta se devuelve como respuesta en formato JSON.
            return respuesta.json(resultadoConsulta);
        };
    };

    //Si hay algún error, devuelve msgError: "error a la hora de añadir datos, en la función anadirGastos".
    respuesta.json(msgError);
};

//Se utiliza para borrar los gastos de la base de datos.
export const borrarGastos = async (peticion, respuesta) => {
    //Esta variable msgError, mostrará el mensaje "error a la hora de borrar datos, en la función borrarGastos"  cuando sea invocada
    const msgError = "error a la hora de borrar datos, en la función borrarGastos";
    
    //Recibe como parámetro el ID (pasado en la petición) y devuelve el resultado y el posible error.
    let [error, resultado] = await borrar(peticion.params.id);
    
    //Si no hay error:
    if(!error){
        //Devuelve un objeto JSON con una clave "resultado", que contiene el valor "ok" si el resultado afecta a las filas y es mayor que 0, es decir se ha producido un cambio, o "ko" en caso contrario.
        return respuesta.json({resultado : resultado.affectedRows > 0 ? "ok" : "ko"});
    };

    //Si hay algún error, devuelve msgError: "error a la hora de borrar datos, en la función borrarGastos".
    respuesta.json(msgError);
};

//Se utiliza para poder inicar sesion con los datos de los usuarios creados.
export const inicioSesion = async (peticion, respuesta) => {
    //Se llama a la función iniciarSesion con el cuerpo de la petición como argumento.
    let [error, datos] = await iniciarSesion(peticion.body);

    //Si no hay errores, se devuelven los datos, de lo contrario se devuelve el error.
    respuesta.json(!error ? datos : error);
};

//Se utiliza para obtener los usuarios de la base de datos.
export const obtenerUsuarios = async (peticion, respuesta) => {
    //Asigna los valores devueltos por la función leerUsuarios() a dos variables, error y datos. 
    let [error, datos] = await leerUsuarios();

    //Si no hay errores, se devuelven los datos, de lo contrario se devuelve el error.
    respuesta.json(!error ? datos : error);
};