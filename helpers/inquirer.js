const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea Hacer?',
    choices: [
        {
            value: 1,
            name: `${'1'.green}. Buscar Cuidad`
        },
        {
            value: 2,
            name: `${'2'.green}. Historial`
        },
        {
            value: 0,
            name: `${'0'.green}. Salir`
        },
        
    ]
}]


const inquirerMenu = async()=> {

    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una Opcion'.white);
    console.log('======================='.green);


    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausar = async() => {

    const input = [{
        type: 'input',
        name: 'pausa',
        message: `Pulsa ${'Enter'.green} para Continuar`,
    }]

    console.log('\n')
    const {pausa} = await inquirer.prompt(input);

    return pausa;
}


const leerInput = async(message)=> {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return "Introduzca un valor para Continuar"
            }

            return true;
        }
    }]

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listarLugares = async(lugares = [])=>{

    const choices = lugares.map((lugar, i) => {


        return {
                value: lugar.id,
                name: `${(i + 1 + '.').green} ${lugar.nombre}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar',
    })

    const question = [
        {
            type: 'list',
            name: 'direccion',
            choices
        }
    ]

    const {direccion} = await inquirer.prompt(question);
    return direccion;

    
}

const mostrarListadoCheckList = async(tareas = [])=>{

    const choices = tareas.map((tarea, i) => {


        return {
                value: tarea.id,
                name: `${(i + 1 + '.').green} ${tarea.desc}`,
                checked: (tarea.completadoEn) ? true : false
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;

    
}

const confirmar = async(message)=> {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }]

    const {ok} = await inquirer.prompt(question);
    return ok;

}

module.exports = {
    inquirerMenu,
    pausar,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}