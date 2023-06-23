
const {Schema, model} = require('mongoose') // creación del modelo(creo)

const portfolioSchema = new Schema({ // crear el modelo= tabla= colección; esquema asiciado
    title:{ // Establecer sus PROPIEDADES como columnas en las tablas: Título
        type:String,
        require:true
        //default: // valor por defecto si el usuario no ingrese el campo
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    location :{
        type:String,
        require:true
    },
    date :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
    },
    image:{
        public_id:String,
        secure_url:String
    }
},{
    timestamps:true // Para tener un registro de cuando se creó y se actualizó
})

// Importar el modelo por nombre portafolio al que se establece el esquema; exportación por default
module.exports = model('portfolio',portfolioSchema) 