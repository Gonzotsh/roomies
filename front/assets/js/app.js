import * as UI from './utilities/interfaz.js'
import {
     agregarGasto,
     obtenerGastos,
     actualizarGasto,
     agregarUsuario,
     obtenerUsuarios
} from './utilities/funciones.js'

if( typeof window === 'object' ){

    window.addEventListener('load', function(){
        
        // EVENTO SUBMIT
        UI.formulario.addEventListener('submit', agregarGasto )
        UI.usuarioNuevo.addEventListener('click',  agregarUsuario)
        UI.botonActualizarGasto.addEventListener('click',  actualizarGasto)
        obtenerGastos();
        obtenerUsuarios();
    })
}
