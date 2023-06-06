//se incluye el modulo de mysql2
import mysql from "mysql2/promise"

//se crea una funcion para conectarme a la base de datos
export function conectar(){
    //retorna una promesa asincrona, con un callback 
    return new Promise(async callback => {
        try{
            //se crea una constante en la que se tiene uqe esperar a que se cree el mysql
            let conexion = await mysql.createConnection({
                host : "localhost",
                user : "root",
                password : "",
                database : "gastos_grupales",
            });
            //se invoca el callback y retorna un array
            //null seria el error, pero al poner null se deja claro qeu no habra error
            callback([null, conexion]) //[error, conexion]
        }catch(error){
            callback([error]);
        }
    });
};

export function leer(id){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){
            //se crea el texto de la consulta
            let consulta = `SELECT gasto.*, usuarios.usuario FROM gasto INNER JOIN usuarios ON (gasto.id_usuario = usuarios.id) ${id ? "WHERE gasto.id = ?" : "" } `;

            //se hace la consulta, en el que selecciona la consulta y le dice que si hay id se seleecione y si no qeu sea nulo 
            let [resultado] = await conexion.query(consulta, id ? [id] : null);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};


//actualizarEstado solo recibe el id 
export function actualizarEstado(id){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){

            //se edita
            let [resultado] = await conexion.query("UPDATE gasto SET terminada = NOT terminada WHERE id = ?", [id]);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};

//actualizarEstado solo recibe el id 
export function actualizarTexto(id, gasto){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){

            //se pone primero gasto en [gasto, id] --< para que en el set coja ese parametro ya que si se pone [id, gasto] cogeria primero el id
            let [resultado] = await conexion.query("UPDATE gasto SET gasto = ? WHERE id = ?", [gasto, id]);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};

//borrar solo recibe el id 
export function borrar(id){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){

            //se edita
            let [resultado] = await conexion.query("DELETE FROM gasto WHERE id = ?", [id]);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};

//se le pasa el texto de la gasto
export function crear(gasto){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){

            //se hace la consulta, en el que se selecciona la gasto y en (?) iria el texto de la gasto que se incluye con  [gasto]
            let [resultado] = await conexion.query("INSERT INTO gasto (gasto) VALUES (?)", [gasto]);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};

//para exportar los modulos
//module.exports = {leer, crear, actualizarEstado, actualizarTexto, borrar}