const fs = require('fs');
var colors = require('colors');



let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, function(err) {

        if (err) {
            return console.log(err);
        }
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB(listadoPorHacer);

    return porHacer;

};

let getListado = () => {

    cargarDB();

    for (let listado of listadoPorHacer) {
        console.log('========Listado por hacer============'.green);
        console.log(listado.descripcion);
        console.log('Estado: ', listado.completado);
        console.log('====================================='.green);
    }

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });

    // let index = listadoPorHacer.findIndex(function(tarea) {
    //     return tarea.descripcion === descripcion;
    // });

    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    // let index = listadoPorHacer.findIndex((tarea) => {
    //     return tarea.descripcion === descripcion;
    // })

    // listadoPorHacer = listadoPorHacer.splice(index, 1);

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}