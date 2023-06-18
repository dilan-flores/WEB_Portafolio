const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs') // uso del módulo importado

const userSchema = new Schema({ // esquema
    name:{ // se define los campos
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{ // se utiliza en this.password de matchPassword:...
        type:String,
        require:true
    }
},{
    timestamps:true // Para tener un registro de cuando se creó y se actualizó
})

        // las instancias de modelos son documentos, es decir los registros

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{ // utiliza el método del esquema justo a ; es una función asíncrona 
    const salt = await bcrypt.genSalt(10) // saltos para hashar el pasword; caracterres que utiliza para hashar el password; por lo general 10; tiempo que le toma cifrar el password
    // EJM: sistemas = d4f5s5dgsdfgsdd65g6s5d"#$
    const passwordEncryp = await bcrypt.hash(password,salt) // se pasa el password y los saltos
    //se almacena el hash en el password
    return passwordEncryp 
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password) // funcion que devuelve una promesa de tipo vuleano ; emcripta el password
    return response
}


module.exports = model('User',userSchema) // user asociado a userScheme (esquema)
