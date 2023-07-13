//Se importa React, useState y useEffect desde el paquete 'react'. 
import  React,{ useState, useEffect } from 'react';

//Se importa la función Formulario del archivo Formulario.jsx.
import Formulario from "./Formulario";

//Se importa la función Gasto del archivo Gasto.jsx.
import Gasto from './Gasto';

//Se importa la función Sesiones del archivo Sesiones.jsx.
import Sesiones from './Sesiones';

//Se importa la función ajax del archivo ajax.js.
import ajax from "./ajax";

//Esta función App() crea un componente React que controla el estado de la aplicación.
function App() {
  //Usa la función useState (que es un array vacío) de React para crear una variable llamada gastos. La función setGasto se usa para actualizar el valor de gastos.
  const [gastos, setGasto] = useState([]);

  //Usa la función useState de React para crear una variable llamada iniciarSesion, con un valor inicial de false.  La función setIniciarSesion se usa para controlar el estado de inicio de sesión.
  const [iniciarSesion, setIniciarSesion] = useState(false);
  
  //Se usa useEffect de React para establecer el valor de la variable iniciarSesion con el valor almacenado en localStorage.
  useEffect(() => {
    setIniciarSesion(localStorage.getItem("iniciarSesion"));
  }, []);

  //Esta función sirve para establecer el estado de iniciarSesion.
  const cambiarIniciarSesion = (valor) => {
    console.log("Solicitando cambio de estado de iniciarSesion", valor);

    //Se utiliza para iniciar una sesión con el valor especificado.
    setIniciarSesion(valor);

    //Comprueba si el valor es verdadero. Si es así, llama a la función obtenerGastos
    if(valor){
      obtenerGastos();
    };
  };

  //Esta función sirve para obtener los gastos.
  const obtenerGastos = () => {
    //Realiza una solicitud Ajax con el método GET a la URL localhost para obtener los datos de gasto y luego establecerlos.
    ajax("GET", "http://localhost:3000/api-gasto").then(datos => {
      setGasto(datos);
    });
  };

  //Esta función sirve para borrar los gastos.
  const borrarGasto = (id_gasto) => {
    //Se realiza una solicitud DELETE a la URL especificada
    ajax("DELETE", "http://localhost:3000/api-gasto/borrar/"+id_gasto).then(resultado => { 
      console.log("dato eliminado");
      //Llama a la función obtenerGastos() para actualizar los datos.
      obtenerGastos();
    });
  };

  //Se usa el método reduce() para recorrer una variable de gastos y sumar todos los valores de cantidad. El resultado se almacena en la variable gastosTotales.
  const gastosTotales = gastos.reduce((total, {cantidad}) => total + Number(cantidad),0) 

  //Si el usuario ha iniciado sesión corectamente se ejecutará el código.
  if(iniciarSesion){
    //Muestra la app un vez el usuario se ha identificado
    return (<>
      {/* se importa la tipografia desde google fonts, que se va usar en la app */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Pathway+Extreme:wght@100;400;600;700&display=swap');
      </style>

      <header >
        <nav > 
          <h1 > APP GASTOS </h1>
          <button  onClick= {()=>cambiarIniciarSesion(false)}> 
            Cerrar sesión
          </button>
        </nav>
      </header>

      <section className="formularioNuevoGasto">
        {/* Se crea un formulario que llama a la función obtenerGastos. Esto le permite al usuario poner los datos en el formulario y luego procesarlos con la función obtenerGastos. */}
        <Formulario onCrearGasto={obtenerGastos} />
      </section>

      <section className="gastos"> 
        {/* Se usa el método map para recorrer una variable de gastos y devolver un componente <Gasto /> para cada elemento. El componente <Gasto /> recibe los parámetros id, gasto, cantidad, usuario y fecha_gasto como propiedades. El método borrarGasto se llama cuando se elimina un gasto. */}
        { gastos.map(({ id, gasto, cantidad, usuario, fecha_gasto }) => 
          <Gasto key={id} id={id} gasto={gasto} cantidad={cantidad} usuario={usuario} fecha_gasto = {fecha_gasto} onDelete={borrarGasto} /> 
        )}
      </section>

      <section className="deudaFinal"> 
        <p> Gastos Totales: {gastosTotales} € </p>
      </section>
    </>)
  } else {
    //Muestra la pantalla de acceso para poder iniciar sesion
    return (<>
        <header className='bg-blue-500 p-4'>
          <nav className='container mx-auto flex items-center justify-between text-white'> 
            <h1 className='text-2xl font-bold'> APP GASTOS </h1>
          </nav>
        </header>
        <section>
          <Sesiones onIniciarSesion={cambiarIniciarSesion} />
        </section>
      </>)
  };
};

//Se exporta la funcion App.
export default App
