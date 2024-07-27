const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });
categorySchema.pre('save', function (next) {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
    next();
});

module.exports = model('Category', categorySchema);