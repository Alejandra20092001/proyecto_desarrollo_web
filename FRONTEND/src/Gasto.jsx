//se importa REACT
import React,{useState} from "react";


//se crea la funcion llamada Gasto
function Gasto({ id, gasto, cantidad, id_usuario, fecha_gasto, terminada}){

    return (
        <div className="gasto">
            <h2 className="visible"> {gasto} </h2>

            <div className="texto">
                <h3> {fecha_gasto} </h3>
                <p> {id_usuario} ... debe a ... {id_usuario} {cantidad} € </p>

                <button className={`estado ${terminada ? "terminada" : ""} :(` }>
                    <span>
                        €
                    </span>
                </button>
            </div>
                 
        </div>
    )
}

//se exporta Gasto
export default Gasto