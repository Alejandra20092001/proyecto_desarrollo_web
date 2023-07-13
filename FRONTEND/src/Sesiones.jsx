//Se importa el módulo React y la función useState desde el paquete "react".
import React,{useState} from "react";

//Se importa la función ajax del archivo ajax.js.
import ajax from "./ajax.js";

//Se crea la función SEsiones, que se utiliza para iniciar sesión en una aplicación, con el parametro onIniciarSesion.
function Sesiones({ onIniciarSesion }) {

    //Se establece una variable de estado llamada nombreUsuario con un valor inicial vacio. La función useState devuelve dos valores, el primero es el valor actual del estado y el segundo es una función para actualizar el valor del estado.
    let [nombreUsuario, setUsuario ] = useState("");

    //Usa la función useState de React para crear una variable llamada passwordUsuario y una función llamada setPassword. Esto le permite al usuario guardar y actualizar el valor de la variable passwordUsuario.
    let [passwordUsuario, setPassword] = useState("");
    
    //Intenta iniciar sesión. 
    const enviarSesiones = async (evento) => {
        //Cancela el envío automatico del evento, del formulario.
        evento.preventDefault();

        //Almacena los valores de nombreUsuario y passwordUsuario, en la variable datos
        const datos = { nombreUsuario, passwordUsuario }; 

        const conectar =  await (
            //Usa el método POST para enviar los datos de nombre de usuario y contraseña al servidor, para comprobar que coincidan con la base de datos
            ajax("POST", "http://localhost:3000/api-gasto-login", datos).then(resultado => {

                //Si los datos coinciden con la base de datos, se iniciará la sesión y se mostrará un mensaje de éxito. Si los datos no coinciden, se mostrará un mensaje de error.
                if(resultado.length > 0){
                    onIniciarSesion(true);
                    console.log("Sesión iniciada");
                }else{
                    console.log("Sesion incorrecta");
                    alert("Sesion incorrecta")
                };
            })
        );

        if(conectar) {
            // Inicio de sesión exitoso
            console.log("Inicio de sesión exitoso");
        } 
    };

    return (
        //Se ejecuta cuando el usuario envíe el formulario. La clase "inicioSesion" se utiliza para aplicar estilos CSS al formulario.
        <form onSubmit= {enviarSesiones} className="inicioSesion">

            <div>
                <label> Introduzca su nombre de usuario: </label>
                <input 
                    type="text" 
                    value= {nombreUsuario} 
                    required
                    placeholder= "Usuario" 
                    onChange={(evento) => { setUsuario(evento.target.value);}}
                /> 
            </div> 

            <div>   
                <label> Introduzca su contraseña: </label>
                <input 
                    type="password" 
                    value= {passwordUsuario} 
                    required
                    placeholder= "Clave" 
                    onChange={(evento) => { setPassword(evento.target.value);}}
                /> 
            </div>
            
            <input type="submit" value="Iniciar sesion" /> 
            
        </form>
    );
};

//Se exporta la función Sesiones
export default Sesiones;