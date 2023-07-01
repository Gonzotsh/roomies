import * as UI from './interfaz.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//Actualiza la modal con los datos guardados
function preEdit(id, roomie, detalle, monto) {
    UI.modalRoomie.value = roomie;
    UI.modalDetalle.value = detalle;
    UI.modalMonto.value = monto;
    UI.botonActualizarGasto.setAttribute('id', id);
}

// ================================================================================================   USUARIOS
export function agregarUsuario(e) {
    e.preventDefault();
    axios.get("https://randomuser.me/api/?nat=ES")
        .then(res => {
            //Se obtiene nombre de API random user, saldo y cuota se establecen en 100.000
            let nombre = `${res.data.results[0].name.first} ${res.data.results[0].name.last}`,
                saldo = 100000,
                cuota = 100000

            //Una vez se obtiene el usuario, se envian los datos al servidor a traves de post
            axios.post('http://localhost:3000/agregarUsuario', {
                nombre,
                saldo,
                cuota
            })
                .then(() => obtenerUsuarios())
                .catch(err => console.log(err))
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
}

export function obtenerUsuarios() {
    //Se reinician las litas con usuarios
    UI.roomie.innerHTML = ` `
    UI.roomiesList.innerHTML = ` `
    UI.modalRoomie.innerHTML = ``
    axios.get('http://localhost:3000/usuarios')
        .then(respuesta => {
            let data = respuesta.data;
            //Se rellena la lista de usuarios en panel Roomies
            data.forEach((element, index) => {
                const { nombre, saldo, cuota } = element
                UI.roomiesList.innerHTML += `
                    <tr>
                        <td>${nombre}</td>
                        <td>${saldo}</td>
                        <td>${cuota}</td>
                    </tr>`

                //Se rellenan la lista de agregar gasto y la modal para actualizar gastos
                UI.roomie.innerHTML += ` <option value="${nombre}">${nombre} </option> `
                UI.modalRoomie.innerHTML += ` <option value="${nombre}">${nombre} </option> `
            });
        })
}

//==============================================================================================   TAREAS
export function agregarGasto(e) {
    e.preventDefault();
    let roomie = UI.roomie.value, detalle = UI.detalle.value, monto = UI.monto.value, id = uuidv4().slice(0, 6)

    axios.post('http://localhost:3000/agregar', {
        id, roomie, detalle, monto
    })
        .then((respuesta) => {
            console.log('Salida de respuesta-->', respuesta)
            UI.formulario.reset();
            obtenerGastos()
        })
        .catch(err => console.log(err))
}

export function obtenerGastos() {
    UI.tablaHistorial.innerHTML = ` `
    axios.get('http://localhost:3000/gastos')
        .then(respuesta => {
            let data = respuesta.data

            data.forEach((element) => {
                const { id, roomie, detalle, monto } = element
                UI.tablaHistorial.innerHTML += `
                <tr>
                    <td>${roomie}</td>
                    <td>${detalle}</td>
                    <td>${monto}</td>
                    <td class="d-flex align-items-center justify-content-between">
                        <i id="botonEditar" class="fas fa-edit text-warning" data-toggle="modal" data-target="#exampleModal" data-id="${id}" data-roomie="${roomie}" data-detalle="${detalle}" data-monto="${monto}"></i>
                        <i id="botonBorrar" class="fas fa-trash-alt text-danger" borrar-id=${id}></i>
                    </td>
                </tr>`
            });

            let botonEditar = document.querySelectorAll('#botonEditar');
            botonEditar.forEach((b) => {
                b.addEventListener('click', (e) => {
                    e.preventDefault()
                    let id = e.target.getAttribute('data-id')
                    let roomie = e.target.getAttribute('data-roomie')
                    let detalle = e.target.getAttribute('data-detalle')
                    let monto = e.target.getAttribute('data-monto')
                    preEdit(id, roomie, detalle, monto)
                })
            })

            let botonBorrar = document.querySelectorAll('#botonBorrar');
            botonBorrar.forEach((b) => {
                b.addEventListener('click', (e) => {
                    e.preventDefault()
                    let id = e.target.getAttribute('borrar-id')
                    eliminarGasto(id);
                })
            })
        })
}

export async function actualizarGasto(e) {
    let id = e.target.id,
        roomie = UI.modalRoomie.value,
        detalle = UI.modalDetalle.value,
        monto = UI.modalMonto.value
    axios.put('http://localhost:3000/editar', {
        id,
        roomie,
        detalle,
        monto
    })
        .then(respuesta => {
            actualizarUsuario(roomie)
            obtenerGastos();
            console.log('Respuesta editados-->', respuesta)
        })
        .catch(error => console.log(error))
}


export async function actualizarUsuario(name) {
    axios.put('http://localhost:3000/actualizarUsuario', {
        data: {name}
    })
        .then(respuesta => {
            obtenerGastos();
            console.log('Respuesta editados-->', respuesta)
        })
        .catch(error => console.log(error))
}

export async function eliminarGasto(id){
    axios.delete('http://localhost:3000/eliminar', {
        data: {id}
    })
        .then(respuesta => {
            console.log('Respuesta borrados-->', respuesta)
            obtenerGastos();
        })
        .catch(error => console.log(error))
}