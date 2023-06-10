
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
    }
},{
    timestamps:true // Para tener un registro de cuando se creó y se actualizó
})

// Importar el modelo por nombre portafolio al que se establece el esquema
module.exports = model('portfolio',portfolioSchema) 