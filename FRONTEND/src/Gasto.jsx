//Se importa React,desde el paquete 'react'. 
import React from "react";

//Se crea la función Gasto,que toma los parámetros de id, gasto, cantidad, usuario y fecha_gasto.
function Gasto({ id, gasto, cantidad, usuario, fecha_gasto, onDelete}){

    //Cambia el formato de fecha de la base de datos al formato local
    const procesarFecha = (fecha) => {
        const fechaProcesada = new Date(fecha);
        return fechaProcesada.toLocaleDateString();
    };

    //Función de Callback para eliminar un gasto desde App.jsx
    const handleDelete = (item) => {
        onDelete(item);
    };

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
    );
};

//Se exporta la función Gasto
export default Gasto