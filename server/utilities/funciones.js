import bodyParser from '../middleware/bodyParser.js';
import { database, users } from './data.js';
import fs from 'fs';

export async function postGastosHandler(req, res) {
    try {
        await bodyParser(req)
        res.writeHead(200, { 'Content-type': 'application/json' })
        database.push(req.body)
        res.write(JSON.stringify(database))
        res.end();
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}

// ADMINITRACIÓN DE USUARIOS ===============================================================
export async function getUsersHandler(req, res) {
    try {
        fs.writeFileSync('db/roomates.json', JSON.stringify(users));
        fs.readFile('db/roomates.json', (err, json) => {
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(json)
        })
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}
export async function postUserHandler(req, res) {
    try {
        await bodyParser(req)
        res.writeHead(200, { 'Content-type': 'application/json' })
        users.push(req.body)
        res.write(JSON.stringify(users))
        res.end();
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}

// FIN ADMINISTRACIÓN DE USUARIOS ============================================================

export async function getGastosHandler(req, res) {
    try {
        fs.writeFileSync('db/data.json', JSON.stringify(database));
        fs.readFile('db/data.json', (err, json) => {
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(json)
        })
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}

export async function putGastosHandler(req, res) {
    try {
        await bodyParser(req)
        const { id, roomie, detalle, monto } = req.body

        let gasto = database;
        gasto.map((d) => {
            if (d.id == id) {
                d.roomie = roomie
                d.detalle = detalle
                d.monto = monto
                return d
            }
            return d
        })

        fs.writeFileSync('db/data.json', JSON.stringify(gasto));
        fs.readFile('db/data.json', (err, json) => {
            res.writeHead(200, { 'Content-type': 'application/json' })

            fs.readFile('db/roomates.json', (err, json) => {
                res.writeHead(200, { 'Content-type': 'application/json' })
                err ? console.log('Noooooooooo!!!! problemas') : console.log('Gasto editado con exito')

                let saldos = users;
                saldos.map((d) => {
                    if (d.nombre == roomie) {
                        d.saldo = 5990
                        return d
                    }
                    return d
                })
                fs.writeFileSync('db/roomates.json', JSON.stringify(saldos));

                res.end(json)
            })

            err ? console.log('Noooooooooo!!!! problemas') : console.log('Gasto editado con exito')

            res.end(json)
        })

    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}

export async function deleteGastosHandler(req, res) {
    try {
        await bodyParser(req)
        const { id } = req.body
        let gasto = database
        gasto.map((d, index) => {
            if (d.id == id) {
                gasto.splice(index, 1);
                fs.writeFileSync('db/data.json', JSON.stringify(gasto))
            }
        })
        res.end();
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}