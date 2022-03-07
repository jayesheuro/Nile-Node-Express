const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    product_id: mongoose.Schema.Types.ObjectId,
    name: {
        type:String,
        required:true
    },
    images: {
        type: [String],
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:[String],
    rating_id: String,
    technical_details:{
        // keys and values will vary depending on product
    },
    available_quantity:{
        type:Number,
        required:true
    },
})

module.exports = ProductSchema