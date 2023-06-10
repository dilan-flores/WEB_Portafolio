const express = require('express') // crea una aplicación express
const path = require('path'); // para mitigar el problemar de que no coge la ruta completa
const { engine }  = require('express-handlebars') // para el motor de plantillas

        //const app = express()
        //module.exports = app // una exportación por defecto  de app


// Inicializaciones
const app = express()

// Configuraciones 
app.set('port',process.env.port || 3000) // si se le asigna un puerto o si no utilizar el puerto 3000
app.set('views',path.join(__dirname, 'views')) // 

app.set('views',path.join(__dirname, 'views')) // Configuración del motor de plantillas
app.engine('.hbs',engine({// extención que voy a utilizar: ,hbs
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'), // ubicación de los layout; utiliza la variable views de arriba ; en sí el contenedor o la página
    partialsDir: path.join(app.get('views'),'partials'), // ubicación de .... ; componentes o bloques que forman parte de mi página
    extname:'.hbs' // nombre de la extención
}))
app.set('view engine','.hbs') // configuración: mi motor de plantillas utiliza .hbs

// Middlewares 
app.use(express.urlencoded({extended:false})) 
            // para trabajar con apis: expres.json
            // paratrabajar con documentos express.urlencode // se especifica para utilizar servidor(o algo así)   


// Variables globales

// Rutas 

/*
app.get('/',(req,res)=>{
    res.send("Server on")
})

*/
app.get('/',(req,res)=>{ // para el uso de .hbs
    res.render('index')//renderizar
})

app.use(require('./routers/index.routes')) // para el login

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public'))) // otro middlewares // path para especificar la ruta // es un directorio público

module.exports = app // exportación // app: tiene toda la aplicación

                // MOTOR DE PLANTILLAS: se utiliza handlebars