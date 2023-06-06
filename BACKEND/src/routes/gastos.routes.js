//importo expreses
import { Router } from "express";

import { obtenerGastos } from "../controllers/gastos.controllers";

const route = Router();

// redirige a esa url diciendo que si es get haga esa funcion , si es post esa funcion y si es put esa funcion
route.get("/api-todo", obtenerGastos);


route.post("/api-todo", async (peticion, respuesta) => {
    //gasto seria el texto, recibimos la informacion
    let {gasto} = peticion.body;
    //va a preguntar el equivalente boolean, si existe gasto y si es trim (elimina los espacios en blanco) y es diferente de vacio (tiene texto) hara algo 
    if(gasto && gasto.trim() != ""){
        //aqui se va a crear la gasto; el resultado viene de esperar a que se cree la gasto
        let [error, resultado] = await crear(gasto.trim());
        //si no hay error que haga esa funcion
        if(!error){
            //aqui es si la consulta salio mal
            let resultadoConsulta = {resultado : "ko"}
            //si reultado ha afectado a las filas y es mayor que 0; es decir funciona
            if(resultado.affectedRows > 0){
                //se cambia el mensaje del resultadoConsulta de ko por ok
                resultadoConsulta.resultado = "ok";
                resultadoConsulta.id = resultado.insertId;
            }
            //retorna un json con el objto resultadoConsulta
            return respuesta.json(resultadoConsulta)
        }
    };
    //si no se envio eso correctamente que muestr el msgError
    respuesta.json(msgError);
})
//el put depende de la peticion. puede venir con el id y la operacion1 o con el id, texto gasto y operacion2
route.put("/api-todo", async (peticion, respuesta)=> {
    //necesito el id, la operacion y gasto que salga del cuerpo de la peticion
    let {id, operacion, gasto} = peticion.body;
    //se va a preguntar si id no es undefined y operacion; tienen que estar para que se pueda continuar
    //1º nos aseguramos si existe el id y el operacion, que no sea undefinded. 
    //2º  /^[0-9]{1,11}$/.test(id)--> al poner esto nos aseguramos qeu se convierte en un numero entero
    //3º /^(1|2)$/.test(operacion) --> al poner esto solo le dehamos pasar por el 1 o el 2 (es decir la operacion1 o la 2)
    if(id && /^[0-9]{1,11}$/.test(id) && operacion && /^(1|2)$/.test(operacion)){
        //
        let operaciones = [actualizarEstado, actualizarTexto]
        let hacerConsulta = true;
        //me aseguro que operacion es unnumero
        operacion = parseInt(operacion)
        //si operacion es 2 , me tengo que cuestionar si consklta es valido
        if(operacion == 2){
            //aqui se dice que tiene que estar gasto y que no tiene que venir un string vacio es decir que tiene que tener texto; y si eso no encaja hacerconsulta pasa a ser false
            hacerConsulta = gasto && gasto != ""
        }
        if(hacerConsulta){
            //operaciones[operacion - 1] -->  si pasa la 1º operacion: operaciones[1 -1], quedando operaciones[0] y coge el actualizarEstado
            //operaciones[operacion - 1] -->  si pasa la 2º operacion: operaciones[2 -1], quedando operaciones[1] y coge el actualizarTexto
           let [error, resultado] = await operaciones[operacion - 1](id, operacion == 2 ? gasto : null);
           //si no hay error
           if(!error){
            return respuesta.json({resultado : resultado.changedRows > 0 ? "ok" : "ko"})
           }
        }
    }
    //si no esta que aparezca el msgError
    return respuesta.json(msgError)
    
});

//se concatena con la peticion
route.get("/api-todo/:id([0-9]{1,11})", async (peticion, respuesta) => {
    //en caso de uqe exista solo puede tener una gasto; en get el resultado devuelve gastos, por eso se poen gastos
    let [error, gastos] = await leer(peticion.params.id);
    //cuando tenga la respuesta; si no tengo error que aparezca gastos que viene de --> callback([null, resultado]); y si no el msgError --> callback([{error : "error en la base de datos"}])
    respuesta.json(!error ? gastos : msgError)

});

// 
route.delete("/api-todo/borrar/:id([0-9]{1,11})",async (peticion, respuesta) => {
    let [error, resultado] = await borrar(peticion.params.id);
    if(!error){
        //se pone en json, si el resultado afecta a las filas y es mayor que 0, es decir se ha producido un cambio; que aprezca "ok" y si no "ko" (que es cuando no hay nada que borrar)
        return respuesta.json({resultado : resultado.affectedRows > 0 ? "ok" : "ko"})
    }
    respuesta.json(msgError);
});

export default route;