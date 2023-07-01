import http from 'http';
import fs from 'fs';
import { 
    postGastosHandler,
    getGastosHandler,
    putGastosHandler,
    deleteGastosHandler,
    getUsersHandler,
    postUserHandler
    //putUsuarioHandler
} from './utilities/funciones.js';

console.clear()
http
    .createServer(( req, res) => {

        const { url, method } = req;

        switch (method) {
            // Rutas para el front end
            case 'GET':
                if ( url === '/') {
                    res.writeHead(200, {'Content-type':'text/html'} )
                    fs.readFile('../front/index.html','utf8',(err,data)=>{
                        res.end(data);
                    })
                }
                if(url === '/front/assets/js/main.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/app.js') )
                }
                if(url === '/front/assets/js/utilities/interfaz.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/utilities/interfaz.js') )
                }
                if(url === '/front/assets/js/utilities/funciones.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('../front/assets/js/utilities/funciones.js') )
                }
                if(url === '/node_modules/axios/dist/axios.js' ){
                    res.writeHead(200, {'Content-Type':'text/javascript'});
                    res.end( fs.readFileSync('node_modules/axios/dist/axios.js') )
                }
                // Cierre de rutas del front end
                
                //Actualización de listas de usuarios y de gastos
                if(url === '/gastos'){
                    getGastosHandler( req, res )
                }
                if(url === '/usuarios'){
                    getUsersHandler( req, res )
                }
                break
            case 'POST':
                if(url === '/agregar'){
                    postGastosHandler( req, res )
                }
                if(url === '/agregarUsuario'){
                    postUserHandler(req, res)
                }
             break  
             case 'PUT':
                if(url === '/editar'){
                    putGastosHandler( req,res )
                }
                // if(url === '/actualizarUsuario'){
                //     putUsuarioHandler( req,res )
                // }
             break 
             case 'DELETE':
                if(url === '/eliminar'){
                    deleteGastosHandler( req,res )
                }
             break  
            default:
                break;
        }
    })

    .listen( 3000, () => console.log('Servidor Arriba en el puerto 3000') )
