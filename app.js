require('dotenv').config();
const fs = require('fs');
const { leerData } = require('./helpers/dbControl');

const { leerInput, inquirerMenu, pausar, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('colors')


const main = async()=> {
    fs.existsSync()
    const busquedas = new Busquedas();
    let opt = '';

    do {
        
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // obtener el input ingresado y comenzar la busqueda del mismo para obtener su id
                const inputCiudad = await leerInput('Ciudad: ');
                const arrCiudades = await busquedas.ciudades(inputCiudad);
                const idCiudad = await listarLugares(arrCiudades);
                if(idCiudad === '0' ) continue; 

                //Seleccionar ciudad
                const lugarSeleccionado = arrCiudades.find( ciudades => ciudades.id === idCiudad)
                // Agregar Ciudad al DB historial
                busquedas.agregarNuevaBusquedaHistorial(lugarSeleccionado);
                // Hacer la peticion para obtener el clima actual
                const climaCiudad = await busquedas.climaLugares(lugarSeleccionado.lat, lugarSeleccionado.lng)


                console.log('\n Informacion de la Ciudad \n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre.green);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ', climaCiudad.temp);
                console.log('Minima: ', climaCiudad.min);
                console.log('Maxima: ', climaCiudad.max);
                console.log('Como esta el clima : ', climaCiudad.desc.green);
                break;

            case 2:
                const dataDB = leerData();
                busquedas.historial = dataDB;
                
                if(dataDB){
                    dataDB.forEach((ciudad, index) => {
                        const idx = `${index + 1}. `.green
                        console.log(`${idx} ${ciudad}`)
                    })
                }

                break
        
            default:
                break;
        }
        
        if(opt !== 0) await pausar();
        
    } while (opt !== 0);
}


main();