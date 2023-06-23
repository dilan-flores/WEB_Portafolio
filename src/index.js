// MÉTODO PARA CARGAR LAS VARIABLES DEL ARCHIVO .ENV: debe estar primero: require('dotenv').config()

// connect-flash mensaje de notificaciones

// express-session: seciones de usuraio

// manipular variables de entorno
// mpn-visualizar modificaciones de algunos paquetes
require('dotenv').config()
const app = require('./server.js') // invocación shi es
const connection = require('./database.js')

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})

// start: de manera local
// dev: en el servidor(creo)

connection()

// Cargar imagenes a cloudinary: npm i cloudinary
// Eliminación de la imágenes locales: instalar un módulo npm i fs-extra