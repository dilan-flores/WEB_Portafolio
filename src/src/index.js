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