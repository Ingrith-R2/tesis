// Importación de Mongoose
const mongoose = require('mongoose')


// Cadena de conexión que utiliza MongoDBAtlas

// Función para conectar la BDD
connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log(error);
    }
}

// Exportar la función
module.exports = connection