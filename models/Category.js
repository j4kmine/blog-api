const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    }

}, { timestamp: true }); // would create created at and updated at

module.exports = mongoose.model('Category', CategorySchema)