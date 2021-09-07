require('dotenv').config();

const { leerInput, inquirerMenu, pausar, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('colors')


console.log(process.env.MAPBOX_KEY)



const main = async()=> {

    const busquedas = new Busquedas();
    let opt = '';

    do {
        
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:

                const inputCiudad = await leerInput('Ciudad: ');
                const arrCiudades = await busquedas.ciudades(inputCiudad);
                const idCiudad = await listarLugares(arrCiudades);
                const lugarSeleccionado = arrCiudades.find( ciudades => ciudades.id === idCiudad)
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
        
            default:
                break;
        }
        
        if(opt !== 0) await pausar();
        
    } while (opt !== 0);
}


main();