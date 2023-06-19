//se incluye el modulo de mysql2, para tener acceso a la base de datos
import mysql from "mysql2/promise";

//se crea una funcion para poder conectarse a la base de datos
export function conectar(){
    //retorna una promesa asincrona, con un callback 
    return new Promise(async callback => {
        try{
            //se crea una constante en la que se tiene que esperar a que se cree el mysql
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
        //se invoca la funcion conectar con las dos posibilidades de error y conexion; de esta forma logra conectarse a la db
        let [error, conexion] = await conectar();


        console.log(error)
        //si no hay error:
        if(!error){
            //la variable consulta, selecciona todos los valores de la tabla gasto y cada usuario de la tabla usuarios,  y a su vez de la base de daos gasto. Y une la tabla usuarios, con el id de cada usuario de ambas tablas y se indica que para ello el id tiene que enr un valor
            let consulta = `SELECT gasto.*, usuarios.usuario FROM gasto INNER JOIN usuarios ON (gasto.id_usuario = usuarios.id) ${id ? "WHERE gasto.id = ?" : "" } `;

            // Debuh de cconsulta
            console.log("consulta sql es:",consulta)
            //se hace la consulta, en el que selecciona la consulta y le indica que si hay id se seleccione y si no que ese valor sea nulo 
            let [resultado] = await conexion.query(consulta, id ? [id] : null);
          
            //se cierra la conexion porque ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa,  pero indicando que hay un error en la base de datos
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
export function crear(datos){
    return new Promise( async callback => {
        //se invoca la funcion conectar con las dos posibilidades de error y conexion
        //esta linea intenta conectarse y depende de si conecta o no va hacia if o else 
        let [error, conexion] = await conectar();

        if(!error){
            const gasto = datos.gasto;
            const cantidad = datos.cantidad;
            const id_usuario = datos.id_usuario;

            console.log( "datos vaale", datos)

            //se hace la consulta, en el que se selecciona la gasto y en (?) iria el texto de la gasto que se incluye con  [gasto]
            //NOW() --> obtiene la fecha actual de la base de datos
            let [resultado] = await conexion.query("INSERT INTO gasto (gasto, cantidad, id_usuario, fecha_gasto) VALUES (?,?,?,NOW() )", [gasto, cantidad, id_usuario]);
          
            //se cierra la conexion pq ya se ha usado y esta el resultado
            conexion.close();
            callback([null, resultado]);
        }else{
            //si tengo error se cumple la promesa, indicando que hay un error en la base de datos
            callback([{error : "error en la base de datos"}])
        }
    });
};

