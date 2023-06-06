//se importa REACT
import React,{useState} from "react";


//se crea la funcion llamada Gasto
function Gasto({id, gasto, cantidad, pagado, pagar, terminada}){

    return (
        <div className="gasto">
            <h2 className="visible"> {gasto} </h2>

            <div className="texto">
                <p> {pagar} debe a {pagado} {cantidad} € </p>

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