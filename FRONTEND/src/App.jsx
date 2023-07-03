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

  //al usar useEffect se sincroniza el componente con el sistema externo, se le pasan los parametros de configuracion y las dependencias que estaran en un array
  useEffect(() => {
    console.log("obteniendo datos para cargar la app. App.js")
    //hace una peticion a ajax con el metodo get a la url localhost
    ajax("GET", "http://localhost:3000/api-gasto").then(datos => setGasto(datos))
  }, [])

  return (
    <>
      <header className='bg-blue-500 p-4'>
          <nav className='container mx-auto flex items-center justify-between text-white'> 
            <h1 className='text-2xl font-bold'> APP GASTOS </h1>
            <div>
              <button className='px-4 py-2 rounded bg-blue-700 hover:bg-blue-600'>
                inicio sesion
                <Sesiones />
              </button>
              <button className='px-4 py-2 rounded bg-blue-700 hover:bg-blue-600'>
                Cerrar sesion
              </button>
            </div>
          </nav>
      </header>

      <section>
        <Formulario />
      </section>
      
      <section className="gastos"> 
        {/* se pintaran tantos gastos como haya */}
        { gastos.map(({ id, gasto, cantidad, id_usuario, fecha_gasto, terminada }) => 
          <Gasto key={id} id={id} gasto={gasto} cantidad={cantidad} usuario={id_usuario} fecha_gasto = {fecha_gasto} terminada={terminada} /> 
        )}
      </section>
     
    </>
  )
}

export default App
