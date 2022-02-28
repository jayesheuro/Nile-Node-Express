const User = require("../../../configs");
const firebase = require("firebase");

const mongoose = require('mongoose')
const ProductSchema = require('../../models/Product')

const availableCollections = ["electronics", "mens_fashion", "womens_fashion", "kids_fashion", "toys_and_games", "appliances", "sports", "other"]

// module.exports.products = async (req,res) =>{
//     const user = firebase.auth().currentUser;

//     if (user){

//         const uid = user.uid;
//         const db = firebase.firestore();
//         const Products = db.collection("Products");
//         req.body['sellerId'] = uid;
//         console.log(req.body)
//         await Products.add(req.body);
//         res.status(200).json({
//             status: "Product added successfully"
//         })
//     }
//     else{
//         res.status(500).json({
//             status: "Something went wrong"
//         }) 
//     }

// }

function getCollection(collection_name) {
    collection_name = collection_name.toLowerCase()
    if (!availableCollections.includes(collection_name)) {
        collection_name = "other"
    }
    return collection_name
}

function authCollectionName(collection_name) {
    collection_name = collection_name.toLowerCase()
    if (!availableCollections.includes(collection_name)) {
        return false
    }
    return true
}


const getProduct = (req, res) => {
    let category = req.params.category
    let product_id = req.params.id

    let collection_name = getCollection(category)
    const collectionRef = mongoose.model(collection_name, ProductSchema)

    collectionRef.findOne({ product_id: mongoose.Types.ObjectId(product_id) })
        .then(doc => {
            if(doc!==null){
                return res.send({
                    message:"found",
                    doc:doc
                })
            }else{
                return res.send({
                    message:"no such document found"
                })
            }
            
        }).catch(err => {
            return res.send(err)
        })
}

const createProduct = async (req, res) => {

    let collection_name = getCollection(req.body.product_category)
    const ProductInstance = mongoose.model(collection_name, ProductSchema)

    const product = new ProductInstance({
        product_id: new mongoose.Types.ObjectId,
        name: req.body.product_name,
        images: req.body.product_images,
        price: req.body.product_price,
        category: req.body.product_category,
        tags: req.body.product_tags,
        rating_id: req.body.product_rating_id,
        technical_details: req.body.technical_details
    })

    await product.save()
        .then(doc => {
            return res.send(doc)
        }).catch(err => {
            return res.send(err)
        })
}

const updateProduct = (req, res) => {

}

const deleteProduct = (req, res) => {
    let category = req.params.category
    let product_id = req.params.id

    if (authCollectionName(category)===true) {
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.findOneAndDelete({ product_id: mongoose.Types.ObjectId(product_id) })
            .then(doc => {
                if(doc!==null){
                    return res.send({
                        message:"deleted required document",
                        doc:doc
                    })
                }else{
                    return res.send({
                        message:"no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })
    }else{
        return res.send({
            message: "invalid product category"
        })
    }
}

const searchProductByCategory = (req, res) => {
    let category = req.params.category
    if (authCollectionName(category)===true){
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.find()
        .then(docs => {
            if(docs.length>0){
                return res.send({
                    message:"found",
                    docs:docs
                })
            }else{
                return res.send({
                    message:"no products found"
                })
            }
        }).catch(err => {
            return res.send(err)
        })
    }else{
        return res.send({
            message: "invalid product category"
        })
    }
}

// endpoint required for querying the product
const searchProductByName = (req, res) => {
    let category = req.params.category
    if (authCollectionName(category)===true){
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.find({product_name:req.query.name})
        .then(docs => {
            if(docs.length>0){
                return res.send({
                    message:"found",
                    docs:docs
                })
            }else{
                return res.send({
                    message:"no products found"
                })
            }
        }).catch(err => {
            return res.send(err)
        })
    }else{
        return res.send({
            message: "invalid product category"
        })
    }
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductByCategory,
    searchProductByName
}




