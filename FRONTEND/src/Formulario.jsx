
//se importa react
import React, {useState} from "react"; 

import ajax from "./ajax.js";

//se crea la funcion formulario. la cual va a contener toda la informacion para su creacion y manejo de los datos
function Formulario(){

    let [gasto, setGasto] = useState("");
    let [cantidad, setCantidad] = useState("");
    let [usuario, setUsuario ]= useState("");
    

    function enviarFormulario ( evento ) {
        evento.preventDefault();
        const datos = {"gasto" : gasto, "cantidad" : cantidad, "id_usuario" : usuario }; 
        ajax("POST", "http://localhost:3000/api-gasto", datos ).then(resultado => {
            
            console.log("envio formulario",resultado)
        })
    }


    return (
        <form onSubmit= {enviarFormulario} >

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
                <h3> Lo pagó: {usuario} </h3>
                <label >terminar programar</label>

                <select 
                    name="usuario" 
                    onChange={(evento) => { setUsuario( evento.target.value) }}    
                >
                    <option value="0"  > selecciome usuario</option>
                    <option value="1">Lura</option>
                    <option value="2" >Juan</option>
                    <option value="3">Enrique</option>
                </select>

            </div>
            
            
            <input type="submit" value="añadir"  /> 
            
        </form>
    )
}

//se exporta formulario
export default Formulario