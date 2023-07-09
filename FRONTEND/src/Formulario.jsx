//se importa react
import React, {useState, useEffect} from "react"; 

import ajax from "./ajax.js";

//se crea la funcion formulario. la cual va a contener toda la informacion para su creacion y manejo de los datos
function Formulario({onCrearGasto}){

    // Datos del Formulario
    const [gasto, setGasto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [usuario, setUsuario ]= useState("");

    // Lista de Usuarios
    const [usuarios, setUsuarios ]= useState([]);
    

    function enviarFormulario ( evento ) {
        evento.preventDefault();
        const datos = {
            "gasto" : gasto, 
            "cantidad" : cantidad, 
            "id_usuario" : usuario 
        }; 

        // Filtros de validación del formulario
        if(gasto.length < 3 ){      alert("Escribe el gasto mas detallado ");   return;        }
        if(cantidad.length < 1 ){   alert("Indica el coste del gasto");         return;        }
        if(usuario.length < 1 ){    alert("Selecciona un usuario");             return;        }

        ajax("POST", "http://localhost:3000/api-gasto", datos ).then(resultado => {
            console.log("envio formulario",resultado)
            onCrearGasto();
        })
    }

    useEffect(() => {
        const getUsuarios=async ()=>{
            ajax("GET", "http://localhost:3000/api-gasto-usuarios")
            .then(datos => {
                console.log("El usuario registrado es",datos)
                setUsuarios(datos)        
            })
        }
        getUsuarios();
    }, [])

    return (
        <form onSubmit= {enviarFormulario} className="formularioNuevoGasto">

            <div>
                <h3> Titulo del gasto: </h3>
                <input 
                    type="text" 
                    value= {gasto} 
                    placeholder= "Nombre del gasto" 
                    onChange={(evento) => { setGasto( evento.target.value);}}
                /> 
            </div>
            

            <div>
                <h3> Importe del gasto: </h3>
                <input 
                    type="number" 
                    value= {cantidad} 
                    placeholder= "Cantidad" 
                    onChange={(evento) => { setCantidad( evento.target.value) }}    
                /> 
            </div>
            
            
            <div>
                <h3> Lo pagó:  </h3>
                <select onChange={(evento) => { setUsuario( evento.target.value) }}
                    name="usuario" >
                    <option value="0"> Seleccione un usuario</option>
                    {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>{user.usuario}</option>
                    ))}
                </select>
            </div>
            
            
            <input type="submit" value="Añadir nuevo gasto"  /> 
            
        </form>
    )
}

//se exporta formulario
export default Formulario