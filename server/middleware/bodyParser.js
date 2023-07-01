 async function bodyParser( request ){
   
    return new Promise(( resolve, reject)=>{
        let datosTotales = '';
        request
            .on('data',(chunk)=>{
                datosTotales+=chunk
            })
            .on('end',()=>{
                request.body = JSON.parse(datosTotales);
                resolve()
            })
            .on('error',(err) =>{
                console.log(err)
                reject()
            })
    })
}

export default bodyParser;