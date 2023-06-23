const express = require('express') // crea una aplicación express
const path = require('path'); // para mitigar el problemar de que no coge la ruta completa
const { engine }  = require('express-handlebars') // para el motor de plantillas
const methodOverride = require('method-override'); // invocar el método methOverride
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload')

        //const app = express()
        //module.exports = app // una exportación por defecto  de app


// Inicializaciones
const app = express()
// INVOCAR EL ARCHIVO PASSPORT
require('./config/passport')

// Configuraciones 
app.set('port',process.env.port || 3000) // si se le asigna un puerto o si no utilizar el puerto 3000

app.set('views',path.join(__dirname, 'views')) // Configuración del motor de plantillas

app.engine('.hbs',engine({// extención que voy a utilizar: ,hbs
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'), // ubicación de los layout; utiliza la variable views de arriba ; en sí el contenedor o la página
    partialsDir: path.join(app.get('views'),'partials'), // ubicación de .... ; componentes o bloques que forman parte de mi página
    extname:'.hbs' // nombre de la extención
}))
app.set('view engine','.hbs') // configuración: mi motor de plantillas utiliza .hbs

app.use(fileUpload({
    // Posibilita guardar archivos temporales
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Middlewares 
app.use(express.urlencoded({extended:false})) 
            // para trabajar con apis: expres.json
            // paratrabajar con documentos express.urlencode // se especifica para utilizar servidor(o algo así)   

app.use(methodOverride('_method')) // usp del método (con esto procedemos a abrir nuevas vistas y capturar, guardar datos de página)
// CREAMOS LA KEY PARA EL SERVIDOR - secret
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// INICIALIZAR PASSPORT
app.use(passport.initialize())
// INICIALIZAR SESSION
app.use(passport.session())



// Variables globales
// Usecontext
//
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    // proceso de serialización y envía el ID
    // Deserialización para obtener los datos de usuario
    //console.log("*****", user.locals.id); // variable global que utiliza todos
    // se puede inyectar user en cualquier parte: HTML({{user}})
    next()
})
            // Rutas : las rutas para que no esté todo revuelto, se ubican en index.routes.js

/* // se ubica en index.routes.js
app.get('/',(req,res)=>{
    res.send("Server on")
})

*/
/* // se ubica en index.routes.js
app.get('/',(req,res)=>{ // para el uso de .hbs
    res.render('index')//renderizar
})
*/

app.use(require('./routers/index.routes')) // Recibe las rutas desde index.routes.j
app.use(require('./routers/portafolio.routes')) // Recibe las rutas de portafolio.routes.js ; se sustituye por user.routes
app.use(require('./routers/user.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public'))) // otro middlewares // path para especificar la ruta // es un directorio público

module.exports = app // exportación // app: tiene toda la aplicación

                // MOTOR DE PLANTILLAS: se utiliza handlebars