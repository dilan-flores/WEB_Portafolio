// con el controlador controlamos si queremos enviar información en forma de lista o JSON
const Portfolio = require('../models/Portfolio')

const renderAllPortafolios = async(req,res)=>{
    // A partir del modelo usar el método find y luego el método lean
    const portfolios = await Portfolio.find().lean()
    // Invocar la vista y pasar la variable portafolio
    res.render("portafolio/allPortafolios",{portfolios})
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
//PRESENTAR EL FORMULARIO
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
// CAPTURAR LOS DATOS DEL FORMULARIO Y LUEGO ALMACENAR EN LA BASE DE DATOS
const createNewPortafolio =async (req,res)=>{ // FUNCIÓN ASÍNCRONA
    //DESSUSTRUCTURAR
    const {title, category,description,location,date} = req.body
    // CREAR UNA NUEVA INSTANCIA
    const newPortfolio = new Portfolio({title,category,description,location,date})
    // EJECUTAR EL MÉTODO SAVE
    await newPortfolio.save()
        // no solo se muestra los datos JSON sino que se redirecciona a /portafolios
        // res.json({newPortfolio}) 
    res.redirect('/portafolios')
}

const renderEditPortafolioForm =async(req,res)=>{
    // A PARTIR DEL MODELO LLAMARÁ AL MÉTODO findById
    const portfolio = await Portfolio.findById(req.params.id).lean() // lean transforma en json
    // CON LA VARIABLE portfolio PINTAR EN LA VISTA DEL FORMULARIO
    res.render('portafolio/editPortafolio',{portfolio})
}

const updatePortafolio = async(req,res)=>{
    // CAPTURAMOS LOS DATOS DEL FORMULARIO
    const {title,category,description,location,date}= req.body
    // A PARTIR DEL MODELO LLAMAR AL MÉTODO finByAndUpdate
    // PASANDO A LA FUNCIÓN DE ID DEL PORTAFOLIO Y LOS DATOS A MODIFICAR
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description,location,date})
    res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    // A PARTIR DEL MODELO USAR EL MÉTODO findByIdAndDelete
    await Portfolio.findByIdAndDelete(req.params.id)// el nombre id debe ser igual al asignado en portafolio.routes
    //HACER EL REDIRECCIONAMIENTO
    res.redirect('/portafolios')
}

// EXPORT NOMBRADO: varias exportaciones; OBLIGA A USAR EL MISMO NOMBRE EN TODOS LOS ARCHIVOS
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}

// Password: serializa(encriptar la información y no ser facilmente identificada: user.id es único)
//          y deserializa 
//          la información está almacenada en una sesión
//          la sesión se mantiene mientras no se cierre la sessión