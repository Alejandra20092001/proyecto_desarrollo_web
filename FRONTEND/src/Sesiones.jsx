//se importa REACT
import React,{useState} from "react";

import ajax from "./ajax.js";

//en esta funcion se van a almacenar todos los datos necesarios para qeu el usuario pueda iniciar sesion con su cuenta en la app
function Sesiones( ) {

    let [nombreUsuario, setUsuario ] = useState("");
    let [passwordUsuario, setPassword] = useState("");
    

    const enviarSesiones = async (evento) => {
        evento.preventDefault();

        const datos = { nombreUsuario, passwordUsuario }; 
        console.log(nombreUsuario, passwordUsuario)

        //usa POST ya que envía los datos que ha escrito el usuario, para combrobar que coincidan con la base de datos
        const conectar =  await (
            ajax("POST", "http://localhost:3000/api-gasto-login", datos).then(resultado => {
                datos.nombreUsuario;
                datos.passwordUsuario;
                console.log("inicio de sesion",resultado)
            })
        )
        if(conectar) {
            // Inicio de sesión exitoso
            console.log("Inicio de sesión exitoso");
        } 
    };

    return (
        <form onSubmit= {enviarSesiones} >

            <div>
                <label> Introduzca su nombre de usuario: </label>
                <input 
                    type="text" 
                    value= {nombreUsuario} 
                    required
                    placeholder= "Usuario" 
                    onChange={(evento) => { setUsuario(evento.target.value);}}
                /> 
                <label> Introduzca su contraseña: </label>
                <input 
                    type="password" 
                    value= {passwordUsuario} 
                    required
                    placeholder= "****" 
                    onChange={(evento) => { setPassword(evento.target.value);}}
                /> 
            </div>
            
            <input type="submit" value="añadir" /> 
            
        </form>
    )
  
};

export default Sesiones;