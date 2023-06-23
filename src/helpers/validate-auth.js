// EX PORTAMOS UNA FUNCIÓN ISAUTHENTICATED
// REQ, RES.NEXT
// para proteger rutas y acceder solo con autenticación
module.exports.isAuthenticated = (req,res,next)=>{
    //validación del isAutenticated
    if(req.isAuthenticated()){
        //Continua con las demás rutas
        return next()
    }
    // Redirecciona al login
    res.redirect('/user/login')
}