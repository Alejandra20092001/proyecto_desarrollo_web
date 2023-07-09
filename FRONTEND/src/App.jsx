//SE CONSTRUYE LA APP

//se importa React de react
import  React,{ useState, useEffect } from 'react';
//se importa Formulario del archivo Formulario en el que esta
import Formulario from "./Formulario";
//se importa Gasto del archivo Gasto en el que esta
import Gasto from './Gasto';
import Sesiones from './Sesiones';
//se importa ajax
import ajax from "./ajax";

function App() {
  // se crea el estado principal de los gastos.
  const [gastos, setGasto] = useState([]);
  const [iniciarSesion, setIniciarSesion] = useState(false);
  
  useEffect(() => {
    setIniciarSesion(localStorage.getItem("iniciarSesion"));
  }, []);

  // Función de Callback para actualizar el estado de la App
  const cambiarIniciarSesion = (valor) => {
    console.log("Solicitando cambio de estado de iniciarSesion", valor)
    setIniciarSesion(valor);

    if(valor){
      obtenerGastos()
    }
  };

  const obtenerGastos = () => {
    //hace una peticion a ajax con el metodo get a la url localhost
    ajax("GET", "http://localhost:3000/api-gasto").then(datos => {
      setGasto(datos);
    });
  };

  const borrarGasto = (id_gasto) => {
    ajax("DELETE", "http://localhost:3000/api-gasto/borrar/"+id_gasto).then(resultado => { 
        console.log("dato eliminado");
        obtenerGastos();
    });
  };

  const gastosTotales = gastos.reduce((total, {cantidad}) => total + Number(cantidad),0) 

  if(iniciarSesion){
    // Muestra la app un vez el usuario se ha identificado
    return (<>
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
        <Formulario onCrearGasto={obtenerGastos} />
      </section>

      <section className="gastos"> 
        {/* se pintaran tantos gastos como haya */}
        { gastos.map(({ id, gasto, cantidad, usuario, fecha_gasto }) => 
          <Gasto key={id} id={id} gasto={gasto} cantidad={cantidad} usuario={usuario} fecha_gasto = {fecha_gasto} onDelete={borrarGasto} /> 
        )}
      </section>

      <section className="deudaFinal"> 
        <p> Gastos Totales: {gastosTotales} € </p>
        {/* <p> Gastos individual: {gastos.reduce((total, {cantidad}) => total + Number(cantidad), 0)} € </p> */}
      </section>
    </>)
  } else {

    // Muestra la pantalla de acceso
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
  }

}

export default App
