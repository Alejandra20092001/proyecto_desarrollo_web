//se importa REACT
import React,{useState} from "react";

import ajax from "./ajax.js";

//en esta funcion se van a almacenar todos los datos necesarios para qeu el usuario pueda iniciar sesion con su cuenta en la app
function Sesiones({usuarios, password}) {

    let [nombreUsuario, setUsuario ]= useState("");
    let [passwordUsuario, setPassword] = useState("");
    

    function enviarSesiones ( evento ) {
        evento.preventDefault();
        const datos = { usuarios : nombreUsuario, password : passwordUsuario }; 
        
        ajax("GET", "http://localhost:3000/api-gasto-login", datos ).then(resultado => {
            console.log("inicio de sesion",resultado)
        });
    };

    return (
        <form onSubmit= {enviarSesiones} >

            <div>
                <h3> introduzca su nombre de usuario </h3>
                <input 
                    type="text" 
                    value= {usuarios} 
                    placeholder= "Nombre del usuario" 
                    onChange={(evento) => { setUsuario( evento.target.value);}}
                /> 
                <h3> introduzca su contraseña </h3>
                <input 
                    type="text" 
                    value= {password} 
                    placeholder= "Contraseña " 
                    onChange={(evento) => { setPassword( evento.target.value);}}
                /> 
            </div>
            
            <input type="submit" value="añadir"  /> 
            
        </form>
    )
  
};

export default Sesiones;