// IMPORTAR MÓDULO
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
//CONFIGURACIONES DEL SERVIDOR SMTP
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
// DEFINIR LA ESTRUCTURA DEL CORREO ELECTRÓNICO
module.exports.sendMailToUser = async(userMail,token)=>{
    //console.log(token); //imprimir token
    //EL CUERPO DEL MAIL
    let info = await transporter.sendMail({
    //DE
    from: 'admin@esfot.com',
    //PARA 
    to: userMail,
    // ASUNTO
    subject: "Verifica tu cuenta de correo electrónico",
    // CUERPO DE MAIL
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    // VERIFICAR EN CONSOLA
    console.log("Message sent: %s", info.messageId);
}