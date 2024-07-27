const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = process.env.MONGODB_URI
const dbName = 'portafolio'

if (!url) {
    console.error('');
    process.exit(1);
}

let db;
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    db = client.db(dbName);
    console.log('Conectado a la base de datos', dbName);

    // Verificar y crear la colección si no existe
    db.listCollections({ name: 'purchases' }).toArray((err, collections) => {
        if (err) {
            console.error('Error al listar colecciones:', err);
            return;
        }
        if (collections.length === 0) {
            db.createCollection('purchases', (err, res) => {
                if (err) {
                    console.error('Error al crear la colección:', err);
                    return;
                }
                console.log('Colección "purchases" creada');
            });
        } else {
            console.log('La colección "purchases" ya existe');
        }
    });
});

// Ruta para manejar la compra
router.post('/compra', (req, res) => {
    if (!db) {
        console.error('Base de datos no está disponible');
        res.status(500).send('Error interno del servidor');
        return;
    }

    const { title, quantity } = req.body;

    if (!title || !quantity) {
        res.status(400).send('Faltan datos requeridos: título y cantidad');
        return;
    }

    db.collection('purchases').insertOne({ title, quantity }, (err, result) => {
        if (err) {
            console.error('Error al guardar la compra:', err);
            res.status(500).send('Error al guardar la compra');
        } else {
            res.send(`Gracias por tu compra de ${quantity} unidad(es) de ${title}`);
        }
    });
});

module.exports = router;
