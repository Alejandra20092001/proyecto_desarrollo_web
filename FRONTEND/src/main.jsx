//Se importa React,desde el paquete 'react'. 
import React from 'react';

//Se importa el módulo ReactDOM desde la carpeta 'react-dom/client'.
import ReactDOM from 'react-dom/client';

//Se importa la funcion App desde la carpeta './App.jsx'.
import App from './App.jsx';

//Se importa el archivo index.css desde la carpeta estilos
import './estilos/index.css';

//Se crea un elemento raíz en el DOM con el ID 'root' y luego renderiza el componente App dentro de él.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
