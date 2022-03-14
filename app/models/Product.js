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
    highlights:[String],
    brand:{
        type:String,
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
    buying_options:{
        color:{
            type: [String]   
        },size:{
            type: [String]
        }
    },
    inventory_id:{
        type:String,
        required:true
    }
})

module.exports = ProductSchema