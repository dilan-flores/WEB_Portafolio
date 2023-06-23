// con el controlador controlamos si queremos enviar información en forma de lista o JSON
const Portfolio = require('../models/Portfolio')
// IMPORTAR EL MÉTODO uploadImagen y el método deleteImage
//const { uploadImage } = require('../config/cloudinary')
const { uploadImage,deleteImage } = require('../config/cloudinary')

const fs = require('fs-extra')


const renderAllPortafolios = async(req,res)=>{
    // A partir del modelo usar el método find y luego el método lean
    // user:req.user._id: trae el usuario de un usuario en particular
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    
    // A LA INSTANCIA DEL DOCUMENT newPortafolio LE AAGREGO AHORA EL USUARIO
    // req.user._id: viene de la sessión
    newPortfolio.user = req.user._id

    //VALIDACIÓN DE LA IMAGEN
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    // INVOCACIÓN DEL MÉTODO
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    // ELIMINAR EL ARCHIVO TEMP DEL DIRECTORIO UPLOADS
    await fs.unlink(req.files.image.tempFilePath)

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
    // VERIFICAR EL ID DEL PORTAFOLIO QUE SEA EL MISMO
    
    // CARGAR LA INFORMACIÓN DEL PORTAFOLIO
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // SI ES TRUE CONTINUAR CON LA EDICIÓN Y SI ES FALSE ENVIAR A LA RUTA PORTAFOLIO
        //if(portfolio._id.toString !== req.params.id) return res.redirect('/portafolios')
    
    // CONVERSIÓN DE OBJETO A STRING
        //console.log(ObjectId(portfolio._id.toString()),req.params.id)

    //CARGAR LA 
    if(req.files?.image) {
        //VAMOS A REALIZAR LA ACTUALIZACIÓN DE LA IMAGEN
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        // ELIMINAR LA IMAGEN EL CLOUDINARY
        await deleteImage(portfolio.image.public_id)
        // CARGAR LA NUEVA IMAGEN
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        // CONSTRUIR LA DATA PARA ACTUALIZAR EN BASE DE DATOS
        const data ={
            title:req.body.title || portfolio.name, // PARA QUE SE MANTENGA LO QUE ESTÁ EN LOS INPUTs
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
                public_id:imageUpload.public_id,
                secure_url:imageUpload.secure_url
            }
        }
        //ELIMINAR LA IMAGEN TEMPORAL
        await fs.unlink(req.files.image.tempFilePath)
        //ACTUALIZACIÓN EN BASE DE DATOS findByAndUpdate
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        //VAMOS A REALIZAR LA ACTUALIZACIÓN DE LOS CAMPOS SIN LA IMAGEN
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')

    // const portfolio = await Portfolio.findById(req.params.id).lean()
    // if(portfolio.user.toString() !== req.user._id.toString()) return res.redirect('/portafolios')
    // // CAPTURAMOS LOS DATOS DEL FORMULARIO
    // const {title,category,description,location,date}= req.body
    // // A PARTIR DEL MODELO LLAMAR AL MÉTODO finByAndUpdate
    // // PASANDO A LA FUNCIÓN DE ID DEL PORTAFOLIO Y LOS DATOS A MODIFICAR
    // await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description,location,date})
    // res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    // A PARTIR DEL MODELO USAR EL MÉTODO findByIdAndDelete
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)// el nombre id debe ser igual al asignado en portafolio.routes
    
    // INVOCAR AL MÉTODO Y PASAR EL ID
    await deleteImage(portafolio.image.public_id)

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