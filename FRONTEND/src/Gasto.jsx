//se importa REACT
import React,{useState} from "react";

import ajax from "./ajax";



//se crea la funcion llamada Gasto
function Gasto({ id, gasto, cantidad, usuario, fecha_gasto, onDelete}){
    // const borrarGasto =  (evento) => {
    //     const id_gasto = evento.target.value;
    //     alert(id_gasto)
        
    //     ajax("DELETE", "http://localhost:3000/api-gasto/borrar/"+id_gasto).then(resultado => { 
    //         console.log("dato eliminado");
    //     });
    // };

    const handleDelete = (item) => {
        onDelete(item)
    } 

    return (
        <div className="gasto">
            <h2 className="visible"> {gasto} </h2>

            <div className="texto">
                <h3> {fecha_gasto} </h3>
                <p> {usuario} pagó   {cantidad} € </p>

                <button onClick={( ) => handleDelete(id)} value= {id} >
                    <span>
                        borrar
                    </span>
                </button>
            </div>
                 
        </div>
    )
}

//se exporta Gasto
export default Gasto