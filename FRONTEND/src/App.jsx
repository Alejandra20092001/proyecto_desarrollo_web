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
  // se crea el estado principal de los gastos. El valor inical de las tareas es null.
  let [gastos, setGasto] = useState([]);

  let [iniciarSesion, setIniciarSesion] = useState("false");

  //al usar useEffect se sincroniza el componente con el sistema externo, se le pasan los parametros de configuracion y las dependencias que estaran en un array
  useEffect(() => {
    //
    const handleStorageChanges = () =>{
      const hola=localStorage.getItem("iniciarSesion")
      setIniciarSesion(hola);
    }
    window.addEventListener("storage", handleStorageChanges);
    return () => {
      window.removeEventListener("storage", handleStorageChanges);
    }

  }, [])

  useEffect(() => {
    //si cambia el valor del storage vuelve a reproducir la pantalal
    if(iniciarSesion){
      setIniciarSesion(localStorage.getItem("iniciarSesion"));

      console.log("obteniendo datos para cargar la app. App.js")
      //hace una peticion a ajax con el metodo get a la url localhost
      //ajax("GET", "http://localhost:3000/api-gasto").then(datos => setGasto(datos))
      obtgenerGastos()
    }
  }, [iniciarSesion])

const obtgenerGastos = () => {
  ajax("GET", "http://localhost:3000/api-gasto").then(datos => setGasto(datos));
};

  const borrarGasto = (id_gasto) => {
    ajax("DELETE", "http://localhost:3000/api-gasto/borrar/"+id_gasto).then(resultado => { 
        console.log("dato eliminado");
        obtgenerGastos();
    });
  };


  const handleCerrarSesion = ( ) => {
    localStorage.removeItem("iniciarSesion");
  };

  if(iniciarSesion == "true" ||iniciarSesion==true ){
    return (
      <>
        <header className='bg-red-500 p-4'>
          <nav className='container mx-auto flex items-center justify-between text-white'> 
            <h1 className='text-2xl font-bold'> APP GASTOS </h1>
            <button  onClick= {handleCerrarSesion}> 
              cerrar sesion
            </button>
          </nav>
        </header>
  
  
        <section>
          <Formulario />
        </section>
        
        <section className="gastos"> 
          {/* se pintaran tantos gastos como haya */}
          { gastos.map(({ id, gasto, cantidad, usuario, fecha_gasto }) => 
            <Gasto key={id} id={id} gasto={gasto} cantidad={cantidad} usuario={usuario} fecha_gasto = {fecha_gasto} onDelete={borrarGasto} /> 
          )}
        </section>
       
      </>
    )
  } else {
    return (
      <>
        <header className='bg-blue-500 p-4'>
          <nav className='container mx-auto flex items-center justify-between text-white'> 
            <h1 className='text-2xl font-bold'> APP GASTOS </h1>
            <div>
              <Sesiones />
            </div>
          </nav>
        </header>
      </>
    )
  }



}

export default App
