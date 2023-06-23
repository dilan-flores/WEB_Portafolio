const cloudinary = require('cloudinary').v2

// VIENE DE DOCUMENTACIÓN
cloudinary.config({ 
    // FORMA DE LLAMAR A LAS VARIABLES DEL ARCHIVO .ENV
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

// EXPORTACIÓN POR DEAFULAT DEL MÉTODO uploadImage
module.exports.uploadImage = async(filePath) => {
    // SUBIR LA IMAGEN DE LA RUTA (FILEPATH) EN LA CARPETA PORTAFOLIO
    // DE CLOUDINARY
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

// EXPORTACIÓN POR DEAFULAT DEL MÉTODO uploadImage
module.exports.deleteImage = async (publicId)=>{
    // ELIMINAR LA IMAGEN EN BASE AL ID 
    return await cloudinary.uploader.destroy(publicId)
}