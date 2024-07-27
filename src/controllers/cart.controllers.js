const Order = require('../models/Orders');
const {sendOrderConfirmation} = require('../config/nodemailer');
const User = require('../models/User')


// Metodo para procesar la orden y enviar el correo
const processOrder = async (req, res) => {
    try {
        const { user, items } = req.body;
        // Crear la orden en la base de datos
        const newOrder = new Order({ user, items });
        // Guardar
        await newOrder.save();
        const usersBDD = await User.find().lean();
        const adminEmails =usersBDD.map(user => user.email)
        console.log(usersBDD);
        await sendOrderConfirmation(user, items, adminEmails);

        res.status(200).json({ message: 'Orden procesada y correo enviado' });
    } catch (error) {
        res.status(500).json({ message: `Error procesando la orden ${error}` });
    }
};

module.exports = {
    processOrder
};
