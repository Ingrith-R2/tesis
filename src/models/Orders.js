const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        phone: { 
            type: String,
            required: true 
        },
        address: {
            type: String,
            required: true
        }
    },
    items: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    });

module.exports = model('Order', orderSchema);
