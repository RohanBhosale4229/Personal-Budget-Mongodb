const mongoose = require("mongoose")
const nameSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        
    },
    budget: {
        type: Number,
        required: true,
        
    },
    color: {
        type: String,
        required: true,
        minlength: 6
    }
}, {collection: 'pb'})

module.exports = mongoose.model('pb', nameSchema)