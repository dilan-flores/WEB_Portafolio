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







// const renderAllPortafolios = (req,res)=>{
//     res.send('Listar todos los portafolios')
// }

// const renderPortafolio = (req,res)=>{
//     res.send('Mostrar el detalle de un portafolio')
// }
// const renderPortafolioForm = (req,res)=>{
//     res.send('Formulario para crear un portafolio')
// }
// const createNewPortafolio = (req,res)=>{
//     res.send('Crear un nuevo portafolio en BDD')
// }
// const renderEditPortafolioForm = (req,res)=>{
//     res.send('Formulario para editar un portafolio')
// }
// const updatePortafolio = (req,res)=>{
//     res.send('Editar un portafolio en BDD')
// }
// const deletePortafolio = (req,res)=>{
//     res.send('Eliminar un nuevo portafolio')
// }


// module.exports ={
//     renderAllPortafolios,
//     renderPortafolio,
//     renderPortafolioForm,
//     createNewPortafolio,
//     renderEditPortafolioForm,
//     updatePortafolio,
//     deletePortafolio
// }