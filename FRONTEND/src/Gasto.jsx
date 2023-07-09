//se importa REACT
import React from "react";

//se crea la funcion llamada Gasto
function Gasto({ id, gasto, cantidad, usuario, fecha_gasto, onDelete}){

    // Cambiar formato de fecha de Base de Datos a formato local
    const procesarFecha = (fecha) => {
        const fechaProcesada = new Date(fecha);
        return fechaProcesada.toLocaleDateString();
    }

    // Función de Callback para eliminar un gasto desde App.jsx
    const handleDelete = (item) => {
        onDelete(item)
    } 

    return (
        <div className="gasto">
            <h2 className="visible"> {gasto} </h2>

            <div className="texto">
                <h3 className="fecha_gasto"> {procesarFecha(fecha_gasto)} </h3>
                <p> {usuario} pagó   {cantidad} € </p>

                <button onClick={( ) => handleDelete(id)} value= {id} >
                    <span>
                        Pagado
                    </span>
                </button>
            </div>
        </div>
    )
}

//se exporta Gasto
export default Gasto