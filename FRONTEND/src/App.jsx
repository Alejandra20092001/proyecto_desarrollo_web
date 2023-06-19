//SE CONSTRUYE LA APP

//se importa React de react
import  React,{ useState, useEffect } from 'react'
//se importa Formulario del archivo Formulario en el que esta
import Formulario from "./Formulario"
//se importa Gasto del archivo Gasto en el que esta
import Gasto from './Gasto'
//se importa ajax
import ajax from "./ajax";

function App() {
  // se crea el estado principal de los gastos. El valor inical de las tareas es null.
  let [gastos, setGasto] = useState([]);

  //al usar useEffect se sincroniza el componente con el sistema externo, se le pasan los parametros de configuracion y las dependencias que estaran en un array
  useEffect(() => {
    console.log("obteniendo datos para cargar la app")
    //hace una peticion a ajax con el metodo get a la url localhost
    ajax("GET", "http://localhost:3000/api-gasto").then(datos => setGasto(datos))
  }, [])

  return (
    <>
      <section>
        <Formulario />
      </section>
      
      <section className="gastos"> 
        {/* se pintaran tantos gastos como haya */}
        { gastos.map(({ id, gasto, cantidad, pagado, pagar, terminada }) => 
          <Gasto key={id} id={id} gasto={gasto} cantidad={cantidad} pagado={pagado} pagar={pagar} terminada={terminada} /> 
        )}

      </section>
    </>
  )
}

export default App
