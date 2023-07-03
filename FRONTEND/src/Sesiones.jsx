//se importa REACT
import React,{useState} from "react";

import ajax from "./ajax.js";

//en esta funcion se van a almacenar todos los datos necesarios para qeu el usuario pueda iniciar sesion con su cuenta en la app
function Sesiones({usuarios, password}) {

    let [nombreUsuario, setUsuario ]= useState("");
    let [passwordUsuario, setPassword] = useState("");
    

    function enviarSesiones ( evento ) {
        evento.preventDefault();

        const datos = {"usuario" : nombreUsuario, "password" : passwordUsuario }; 

        //usa POST ya que envía los datos que ha escrito el usuario, para combrobar que coincidan con la base de datos
        ajax("POST", "http://localhost:3000/api-gasto-login", datos).then(resultado => {
            console.log("inicio de sesion",resultado)
        });
    };

    return (
        <form onSubmit= {enviarSesiones} >

            <div>
                <label> Introduzca su nombre de usuario: </label>
                <input 
                    type="text" 
                    value= {usuarios} 
                    required
                    placeholder= "Usuario" 
                    onChange={(evento) => { setUsuario( evento.target.value);}}
                /> 
                <label> Introduzca su contraseña: </label>
                <input 
                    type="text" 
                    value= {password} 
                    required
                    placeholder= "****" 
                    onChange={(evento) => { setPassword( evento.target.value);}}
                /> 
            </div>
            
            <input type="submit" value="añadir" /> 
            
        </form>
    )
  
};

export default Sesiones;