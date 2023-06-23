// IMPORTAR PASSPORT
const passport = require("passport")

// IMPORTAR MI MODELO ;siempre en la parte superior
const User = require('../models/User')
const { sendMailToUser } = require("../config/nodemailer")

//PRESENTAR EL FORMULARIO PARA EL REGISTRO
// renderizar la vista del formulario
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//CAPTURAR LOS DATOS DEL FORMULARIO Y GUARDAR EN BDD
//registro en la base de datos
const registerNewUser = async(req,res)=>{
    // DESESTRUCTURAR LOS DATOS DEL FORMULARIO
    const{name,email,password,confirmpassword} = req.body
    // VALIDAR SI TODOS LOS CAMPOS ESTÁN COMPLETOS
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    // VALIDAR DE LAS CONTRASEÑAS
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    // TRAER EL USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email}) // traer un solo registro
    // VERIFICAR SI EXISTE EL USUARIO
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    
    // GUARDAR EL REGISTRO EN LA BDD
    const newUser = await new User({name,email,password,confirmpassword})
    // ENCRIPTAR EL PASSWORD
    newUser.password = await newUser.encrypPassword(password)

    const token = newUser.crearToken()
    sendMailToUser(email,token)
    
    // SE CREA UN TOKEN POR DEFAULT
    //newUser.crearToken()

    newUser.save()
    res.redirect('/user/login')
}

//PRESENTAR EL FORMULARIO PARA EL LOGIN
const renderLoginForm =(req,res)=>{ //
    res.render('user/loginForm')
}

// Primera forma ; no funciona el logout
// const loginUser = async(req,res)=>{

//     const{name,email,password} = req.body
    
//     if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

//     const userBDD = await User.findOne({email})
//     if(!userBDD) return res.send("Lo sentimos, el email no se encuentra registrado")
    
//     const passwordUser = await userBDD.matchPassword(password)
//         if(!passwordUser) return res.send("Lo sentimos, los passwords no coinciden")

//     res.redirect('/portafolios')
// }

//CAPTURAR LOS DATOS DEL FORMULARIO Y HACER EL LOGIN EN BDD ; segunda forma
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login', // si la autenticación falla
    successRedirect:'/portafolios' // si la autenticación es correcta
})

//CAPTURAR LOS DATOS DEL FORMULARIO Y HACER EL LOGOUT EN BDD
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

// CONFIRMAR EL TOKEN
const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    //CARGAR EL USUARIO EN BASE AL TOKEN ENVIANDO
    const userBDD = await User.findOne({token:req.params.token})
    //SETEAR EL TOKEN A NULL
    userBDD.token = null
    //CAMBIAR EL confirmEmail a TRUE; EL USUARIO YA SE REGISTRA
    userBDD.confirmEmail=true
    //GUARDAR EN BDD
    await userBDD.save()
    // MENSAJE DE RESPUESTA
    res.send('Token confirmado, ya puedes iniciar sesión');
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}