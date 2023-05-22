const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({

    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        require: true
    },
    isPinned: {
        type: Boolean,
        require: true
    }

})

module.exports = mongoose.model('category', CategorySchema)