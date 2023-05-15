const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    store: {
        type: String
    },
    categoryName: {
        type: String
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    featured: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('product', ProductSchema)