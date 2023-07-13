//Se importa la biblioteca mysql2/promise, que es una biblioteca de promesas para MySQL. Esto permite conectar y ejecutar consultas en una base de datos MySQL.
import mysql from "mysql2/promise";

//Esta función que esta siendo exportada, se usa para conectarse a una base de datos MySQL. Utiliza la promesa asincrónica para crear una conexión con los parámetros especificados. Si hay un error, se devuelve en el primer elemento del array de callback. Si no hay errores, se devuelve null en el primer elemento del array y la conexión en el segundo elemento.
export function conectar(){
    return new Promise(async callback => {
        try{
            //Se crea una constante en la que se indica que tiene que esperar a que se cree la conexion con la base de datos gastos_grupales.
            let conexion = await mysql.createConnection({
                host : "localhost",
                user : "root",
                password : "",
                database : "gastos_grupales",
            });
            callback([null, conexion]) //[error, conexion]
        }catch(error){
            callback([error]);
        };
    });
};

//Se usa para realizar una consulta a la base de datos. 
export function leer(id){
    return new Promise( async callback => {
        //Se invoca la función conectar() para establecer una conexión con la base de datos.
        let [error, conexion] = await conectar();

        //En caso de que no haya error:
        if(!error){
            //Se crea una variable llamada consulta, que selecciona todos los valores de la tabla gasto y cada usuario de la tabla usuarios, y une las dos tablas mediante el id de cada usuario.
            let consulta = `SELECT gasto.*, usuarios.usuario FROM gasto INNER JOIN usuarios ON (gasto.id_usuario = usuarios.id) ${id ? "WHERE gasto.id = ?" : "" } `;

            //Se hace la consulta, en la que se selecciona la consulta y se le indica que si hay un id especificado, se agregará a la consulta.
            let [resultado] = await conexion.query(consulta, id ? [id] : null);
          
            //Se ejecuta la consulta y se cierra la conexión.
            conexion.close();
            callback([null, resultado]);
        }else{
            //El callback se ejecutará cuando se produzca un error en la base de datos.
            callback([{error : "error en la base de datos"}]);
        };
    });
};

//Se utiliza para eliminar un registro de la base de datos. 
export function borrar(id){
    return new Promise( async callback => {
        //Se invoca la función conectar() para establecer una conexión con la base de datos.
        let [error, conexion] = await conectar();

        //En caso de que no haya error:
        if(!error){
            //Se ejecuta una consulta DELETE para eliminar el registro especificado por el parámetro id.
            let [resultado] = await conexion.query("DELETE FROM gasto WHERE id = ?", [id]);
          
            //Se ejecuta la consulta y se cierra la conexión.
            conexion.close();
            callback([null, resultado]);
        }else{
            //El callback se ejecutará cuando se produzca un error en la base de datos.
            callback([{error : "error en la base de datos"}]);
        }
    });
};

//Se crea un nuevo registro en la db con los datos indicados.
export function crear(datos){
    return new Promise( async callback => {
        //Se invoca la función conectar() para establecer una conexión con la base de datos.
        let [error, conexion] = await conectar();

        //En caso de que no haya error:
        if(!error){
            //Se asignan variables a los valores de un objeto llamado datos. La variable gasto se asigna al valor del objeto datos con la clave "gasto".
            const gasto = datos.gasto;
            //La variable cantidad se asigna al valor del objeto datos con la clave "cantidad". 
            const cantidad = datos.cantidad;
            //La variable id_usuario se asigna al valor del objeto datos con la clave "id_usuario".
            const id_usuario = datos.id_usuario;

            //Construye una consulta SQL para insertar los datos especificados en la tabla gasto            
            //NOW() --> obtiene la fecha actual para añadirla a la base de datos
            let [resultado] = await conexion.query("INSERT INTO gasto (gasto, cantidad, id_usuario, fecha_gasto) VALUES (?,?,?,NOW() )", [gasto, cantidad, id_usuario]);
            
            //Se ejecuta la consulta y se cierra la conexión.
            conexion.close();
            callback([null, resultado]);
        }else{
            //El callback se ejecutará cuando se produzca un error en la base de datos.
            callback([{error : "error en la base de datos"}]);
        };
    });
};

//Se utiliza para iniciar sesión en una aplicación. Luego, se recuperan los datos de usuario y contraseña del objeto "datos" 
export function iniciarSesion(datos) {
    return new Promise( async callback =>  {
        //Se invoca la función conectar() para establecer una conexión con la base de datos.
        let [error, conexion] = await conectar();

        //Se seleccionan los datos de usuario y contraseña del objeto "datos" 
        const usuario = datos.nombreUsuario;
        const password = datos.passwordUsuario;

        //Realiza una consulta a la base de dats para verificar si el usuario existe.
        let [resultado] = await conexion.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}' AND password = '${password}'` , [usuario, password]);
        console.log(datos.body)

        //Si el resultado es mayor que cero, el callback devolverá los resultados
        if(resultado.length > 0 ){
            callback([null, resultado]);
        }else{
            //El callback se ejecutará cuando se produzca un error en la base de datos.
            callback([{error: "error de usuario y/o clave"}, null]);
        };
    });
};

//Lee los usuarios de la base de datos.
export function leerUsuarios(){
    return new Promise( async callback => {
        //Se invoca la función conectar() para establecer una conexión con la base de datos.
        let [error, conexion] = await conectar();

        //En caso de que no haya error:
        if(!error){
            //Ejecuta una consulta para obtener los usuarios
            let consulta = `SELECT id, usuario FROM usuarios `;

            //Ejecuta una consulta en una base de datos y almacena el resultado en la variable "resultado".
            let [resultado] = await conexion.query(consulta);
          
            //Se ejecuta la consulta y se cierra la conexión.
            conexion.close();
            callback([null, resultado]);
        }else{
            //El callback se ejecutará cuando se produzca un error en la base de datos.
            callback([{error : "error en obtener usuarios"}]);
        };
    });
};