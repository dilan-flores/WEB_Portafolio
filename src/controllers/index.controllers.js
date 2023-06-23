const renderIndex = (req,res)=>{ // método
    res.render('index')
}

const renderLogin = (req,res)=>{ // método
    res.render('login')
}

module.exports ={
    renderIndex, // exportaciones de funciones
    renderLogin
}
