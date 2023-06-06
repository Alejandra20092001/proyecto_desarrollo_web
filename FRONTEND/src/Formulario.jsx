
//se importa react
import React from "react";

//se crea la funcion formulario. la cual va a contener toda la informacion para su creacion y manejo de los datos
function Formulario(){
    return (
        <form onSubmit={ evento => {
            evento.preventDefault();
            }}>

            <div>
                <h3> Titulo del gasto: </h3>
                <input type="text" placeholder= "Nombre del gasto" /> 
            </div>
            

            <div>
                <h3> Importe del gasto: </h3>
                <input type="text" placeholder= "Cantidad" /> 
            </div>
            
            
            <div>
                <h3> Lo pagó: </h3>
                <input type="text" placeholder= "Pagado por:" /> 
            </div>
            
            <div>
               <h3> Dividir entre: </h3>
                <input type="text" placeholder="Dividir entre:" />  
            </div>
            
            
            <input type="submit" value="añadir"  /> 
            
        </form>
    )
}

//se exporta formulario
export default Formulario