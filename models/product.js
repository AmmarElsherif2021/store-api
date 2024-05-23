const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name must be provided!']
    },
    price: {
        type: Number,
        required: [true, 'Provide price!']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enums: {
            values: ['ikea', 'liddy', 'caressa', 'marcos']
        },
        message: '{VALUE} is not allowed'
    }
})
module.exports = mongoose.model('Product', schema, 'store-api')