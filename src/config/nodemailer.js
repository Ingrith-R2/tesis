// Importar nodemailer
const dotenv = require('dotenv').config()
const nodemailer = require("nodemailer");

const URLAPI = process.env.URLPRODUCCION 


// creación del transportador para el envío de correos utilizando SMTP
// SMTP - GMAIL
// SMTP - OUTLOOK
// SMTP - MAILTRAP
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})

const sendMailToUser = async (userMail, token) => {
    let info = await transporter.sendMail({
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Verifica tu cuenta de correo electrónico",
        html: `<a href="${URLAPI}/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}

const sendOrderConfirmation = async (user, items, destino) => {
    const mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: destino.join(', '),
        subject: "Confirmación de la orden",
        html: `
            <h1>Confirmación de la orden</h1>
            <p>Una nueva orden, aqui los detalles de la orden y la información de contacto:</p>
            <ul>${items.map(item => `<li>${item.title} - Cantidad: ${item.quantity}</li>`).join('')}</ul>
            <p>Información de contacto:</p>
            <p>Nombre: ${user.name}</p>
            <p>Teléfono: ${user.phone}</p>
            <p>Dirección: ${user.address}</p>
        `
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
};

const sendMailToRecoveryPassword = async (userMail, token) => {
    const mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Correo para restablecer tu contraseña",
        html: `
    <h1>Ecommerce</h1>
    <p>Para restablecer tu contraseña dar clic en “Clic para reestablecer tu contraseña”.<br>
    Si no realizaste esta acción ignorar el mensaje.
    </p>
    <hr>
    <a href="${URLAPI}/user/forgot_password/${token}">Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Soporte Ecommerce</footer>
    `
    };

    await transporter.sendMail(mailOptions);
}

// Estructura del correo electrónico
module.exports = {
    sendMailToUser,
    sendOrderConfirmation,
    sendMailToRecoveryPassword
}