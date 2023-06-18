const mongoose =  require('mongoose')// importación de mongoose

        //problema: mongodb://localhost:27017/
        //solución:
//const MONGOOSE_URI='mongodb://0.0.0.0:27017/portafolio' //devuelve una promesa ; PARA EL USO DE MONGODB LOCAL

// PARA EL USO DE MONGODB ATLAS
const {DBUSER,DBPASSWORD,DBNAME} = process.env // desustructurar los datos
const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.ahho5ov.mongodb.net/${DBNAME}` // desustructurar los datos

// .env: ubicamos los datos sensibles

connection = async ()=>{ // para trabajar con promesas
    try{
        await mongoose.connect(MONGODB_URI,{
            // Se agrega configuraciones para reemplazar métodos: remove(causa problemas), ........
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("La base de datos está conectado")
    } catch(error){
        // console.log(`Server on port ${app.get('port')}`);
        console.log(error)
    }
}

module.exports = connection 
