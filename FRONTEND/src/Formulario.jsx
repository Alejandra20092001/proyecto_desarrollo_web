//Se importa React, useState y useEffect desde el paquete 'react'. 
import React, {useState, useEffect} from "react"; 

//Se importa la función ajax del archivo ajax.js.
import ajax from "./ajax.js";

//Se crea la funcion Formulario, que recibe una propiedad llamada onCrearGasto. 
function Formulario({onCrearGasto}){

    //Usa la función useState de React para crear una variable llamada gasto con un valor inicial de cadena vacía.
    const [gasto, setGasto] = useState("");

    //Usa la función useState de React para crear una variable llamada cantidad y una función llamada setCantidad. La variable cantidad se inicializa con un valor vacío. La función setCantidad se puede usar para actualizar el valor de la variable cantidad.
    const [cantidad, setCantidad] = useState("");

    //Usa la función useState de React para crear una variable llamada "usuario" con un valor inicial de cadena vacía. Esto significa que la variable usuario se inicializará como una cadena vacía cuando el componente se monte por primera vez.
    const [usuario, setUsuario ]= useState("");

    //Se establece una variable llamada usuarios como un estado inicial para un componente de React. La variable usuarios es un array vacío y setUsuarios es una función que se puede usar para actualizar el estado de usuarios.
    const [usuarios, setUsuarios ]= useState([]);
    
    //Se utiliza para enviar el formulario al servidor
    function enviarFormulario ( evento ) {
        //Cancela el envío automatico del evento, del formulario.
        evento.preventDefault();

        //Recoge los datos del formulario en el objeto llamado "datos"
        const datos = {
            "gasto" : gasto, 
            "cantidad" : cantidad, 
            "id_usuario" : usuario 
        }; 

        //Realiza algunas comprobaciones de validación para asegurarse de que los datos son válidos.
        if(gasto.length < 3 ){      alert("Escribe el gasto mas detallado ");   return;        };
        if(cantidad.length < 1 ){   alert("Indica el coste del gasto");         return;        };
        if(usuario.length < 1 ){    alert("Selecciona un usuario");             return;        };

        //Envía los datos al servidor mediante una solicitud AJAX y ejecuta la función "onCrearGasto" cuando se completa la solicitud
        ajax("POST", "http://localhost:3000/api-gasto", datos ).then(resultado => {
            console.log("envio formulario",resultado);
            onCrearGasto();
        });
    };

    //Se realiza una solicitud GET a la API "http://localhost:3000/api-gasto-usuarios" y se almacenan los datos recibidos en el estado de la aplicación.
    useEffect(() => {
        const getUsuarios=async ()=>{
            ajax("GET", "http://localhost:3000/api-gasto-usuarios")
            .then(datos => {
                console.log("El usuario registrado es",datos);
                setUsuarios(datos);
            });
        };
        getUsuarios();
    }, []);

    return (
        //La función enviarFormulario se ejecutará cuando el usuario envie el formulario. Esta función se encargará de procesar los datos del formulario.
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
    );
};
//Se exporta la función Formulario
export default Formulario