// IMPORTACIÓN DE PASSWORT
const passport = require('passport')
// IMPORTAR EL MODEO USER
const User = require('../models/User')
// DEFINICION DE LA ESTRATEGIA
const LocalStrategy = require('passport-local').Strategy

// CONFIGURACIÓN DE LA ESTRATEGIA
passport.use(new LocalStrategy({
    usernameField:'email',  // debe ser igual al de las views
    passwordField:'password' // debe ser igual al de las views
},async(email,password,done)=>{
    // CONSULTA A LA BASE DE DATOS

    // TRAER USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    // VALIDACIÓN DEL USUARIO
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
        // VALIDADCIÓN DE LAS CONTRASEÑAS
    // TRAER CONTRASEÑA PARA VALIDAD CON BASE DE DATOS
    const passwordUser = await userBDD.matchPassword(password) // matchPassword: en models,user; 
    // VALIDACIÓN DEL PASSWORD DEL FORMULARIO VS EL DE LA BDD
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    
    // VALIDACIÓN DE LA CONFIRMACIÓN DE MAIL
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    // RETORNAR EL USUARIO
    return done(null,userBDD)
}))

// PROCESO DE SERIALIZACIÓN DE USUARIO: encripta y da un identificador (de USUARIO a ID)
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// PROCESO DE DESERIALIZACIÓN DE USUARIO: desencripta y se obtiene el usuario (de ID a USUARIO)
passport.deserializeUser(async (id, done) => {
    // TRAER EL USUARIO EN BASE AL ID DE LA SESSION
    const userDB  = await User.findById(id).exec();
    // RETORNA EL USUARIO
    return done(null,userDB)
});