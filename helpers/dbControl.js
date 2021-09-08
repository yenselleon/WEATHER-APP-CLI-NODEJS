const pathData = './db/data.json'
const { debug } = require('console');
const fs = require('fs');



const guardarDB = (data)=> {

    fs.writeFileSync(pathData, JSON.stringify(data));

}

const leerData = ()=> {

    if(!fs.existsSync(pathData)){
        
        return 
    }
    const info = fs.readFileSync(pathData, {encoding: 'utf-8'});
    
    if(info !== '') {
        const data = JSON.parse(info)
        return data;

    }else{
        return []

    }
        

}

module.exports = {
    guardarDB,
    leerData
}