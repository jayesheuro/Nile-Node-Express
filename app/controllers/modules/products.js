const User = require("../../../configs");
const firebase = require("firebase");

const mongoose = require('mongoose')
const ProductSchema = require('../../models/Product')

const availableCollections = ["electronics", "mens_fashions", "womens_fashions", "kids_fashions", "toys_and_games", "appliances", "sports", "other"]

async function saveProductToFirebase(product, inventory_id) {
    try {
        console.log(product.product_id.toString(), inventory_id)

        const db = firebase.firestore();
        const Inventory = db.collection("Inventory");
        const snapshot2 = await Inventory.where("inventory_id", "==", inventory_id).get();
        let prev_products = []
        let id = ''

        snapshot2.forEach((doc) => {
            prev_products = doc.data().products
            id = doc.id
            // if(inv_data.length>0){
            //     Userorders.push(inv_data[0])
            // }
        })

        prev_products.push(product)
        Inventory.doc(id).update({ products: prev_products })
        return true
    } catch (err) {
        return err
    }
}

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
            if (doc !== null) {
                return res.send({
                    message: "found",
                    doc: doc
                })
            } else {
                return res.send({
                    message: "no such document found"
                })
            }

        }).catch(err => {
            return res.send(err)
        })
}

const getProductFromList = async (req, res) => {
    let required_products = req.body
    let data_arr = []
    for (let i = 0; i < required_products.length; i++) {
        let product = required_products[i]
        let category = product.category
        let product_id = product.product_id

        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        await collectionRef.findOne({ product_id: mongoose.Types.ObjectId(product_id) })
            .select("-__v")
            .then(doc => {
                if (doc !== null) {
                    data_arr.push(doc)
                }
            }).catch(err => {
                return res.send(err)
            })
    }
    res.send({
        message: "products found",
        products: data_arr
    })
}

const createProduct = async (req, res) => {

    let collection_name = getCollection(req.body.product_category)
    const ProductInstance = mongoose.model(collection_name, ProductSchema)

    let product_id = new mongoose.Types.ObjectId
    const product = new ProductInstance({
        product_id: product_id,
        name: req.body.product_name,
        images: req.body.product_images,
        price: req.body.product_price,
        category: req.body.product_category,
        tags: req.body.product_tags,
        rating_id: req.body.product_rating_id, //should be taken from firebase after document creation
        technical_details: req.body.technical_details,
        available_quantity: req.body.available_quantity,
        highlights: req.body.highlights,
        brand: req.body.brand,
        buying_options: {
            color: req.body.buying_options.color,
            size: req.body.buying_options.size
        }
    })

    let saved_product = {}
    await product.save()
        .then(doc => {
            saved_product=doc
        }).catch(err => {
            return res.send(err)
        })
    
    let flag = await saveProductToFirebase({ product_id: product_id.toString(), category: req.body.product_category, available_quantity: req.body.available_quantity }, req.body.inventory_id)

    if(flag===true){
        return res.send(saved_product)
    }else{
        return res.send({
            message:flag
        })
    }

}

// cannot update product name, category, rating_id, product_id
// can update images array, price and tags
// for category change, another endpoint will be used
const updateProduct = async (req, res) => {
    let category = req.params.category
    let product_id = req.params.id

    if (authCollectionName(category) === true) {
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        // fetching the required document
        let required_doc = {}
        await collectionRef.findOne({ product_id: mongoose.Types.ObjectId(product_id) })
            .select('product_id images price tags technical_details')
            .then(doc => {
                if (doc !== null) {
                    required_doc = doc
                } else {
                    return res.send({
                        message: "no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })

        // updating on the required fileds
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let allowedFields = ["images", "price", "tags", "technical_details"]

        for (let i = 0; i < keys.length; i++) {
            if (allowedFields.includes(keys[i]) === true) {
                required_doc[keys[i]] = values[i]
            }
        }

        // updating database
        collectionRef.findOneAndUpdate(
            {
                product_id: mongoose.Types.ObjectId(product_id)
            },
            required_doc
        )
            .then(doc => {
                if (doc !== null) {
                    return res.send({
                        message: "updated required document",
                        doc: doc
                    })
                } else {
                    return res.send({
                        message: "no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })
    } else {
        return res.send({
            message: "invalid product category"
        })
    }
}

const changeProductCategory = async (req, res) => {
    let from_category = req.body.from_category
    let to_category = req.body.to_category
    let product_id = req.body.product_id

    if (authCollectionName(from_category) === true && authCollectionName(to_category) === true) {
        let collection_name_from = getCollection(from_category)
        const collectionRefFrom = mongoose.model(collection_name_from, ProductSchema)

        let collection_name_to = getCollection(to_category)
        const collectionRefTo = mongoose.model(collection_name_to, ProductSchema)

        // fetching the required document
        let required_doc = {}
        await collectionRefFrom.findOne({ product_id: mongoose.Types.ObjectId(product_id) })
            .select("-_id -__v")
            .then(doc => {
                if (doc !== null) {
                    required_doc = doc
                } else {
                    return res.send({
                        message: "no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })

        // saving the document in the to_collection
        let updatedProduct = new collectionRefTo({
            product_id: required_doc.product_id,
            name: required_doc.name,
            images: required_doc.images,
            price: required_doc.price,
            category: collection_name_to,// changing product category
            tags: required_doc.tags,
            rating_id: required_doc.rating_id,
            technical_details: required_doc.technical_details
        })

        let new_doc = {}
        await updatedProduct.save()
            .then(doc => {
                new_doc = doc
            }).catch(err => {
                console.log(err)
                return res.send("some error occured")
            })


        // deleting the document from the from_collection
        await collectionRefFrom.findOneAndDelete({ product_id: mongoose.Types.ObjectId(product_id) })
            .then(doc => {
                if (doc !== null) {
                    return res.send({
                        message: "changed product category",
                        old_doc: doc,
                        new_doc: new_doc
                    })
                } else {
                    return res.send({
                        message: "no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })

    } else {
        return res.send({
            message: "invalid product category"
        })
    }
}

const deleteProduct = (req, res) => {
    let category = req.params.category
    let product_id = req.params.id

    if (authCollectionName(category) === true) {
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.findOneAndDelete({ product_id: mongoose.Types.ObjectId(product_id) })
            .then(doc => {
                if (doc !== null) {
                    return res.send({
                        message: "deleted required document",
                        doc: doc
                    })
                } else {
                    return res.send({
                        message: "no such document found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })
    } else {
        return res.send({
            message: "invalid product category"
        })
    }
}

const searchProductByCategory = (req, res) => {
    let category = req.params.category
    if (authCollectionName(category) === true) {
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.find()
            .then(docs => {
                if (docs.length > 0) {
                    return res.send({
                        message: "found",
                        docs: docs
                    })
                } else {
                    return res.send({
                        message: "no products found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })
    } else {
        return res.send({
            message: "invalid product category"
        })
    }
}

// endpoint required for querying the product
const searchProductByName = (req, res) => {
    let category = req.params.category
    if (authCollectionName(category) === true) {
        let collection_name = getCollection(category)
        const collectionRef = mongoose.model(collection_name, ProductSchema)

        collectionRef.find({ product_name: req.query.name })
            .then(docs => {
                if (docs.length > 0) {
                    return res.send({
                        message: "found",
                        docs: docs
                    })
                } else {
                    return res.send({
                        message: "no products found"
                    })
                }
            }).catch(err => {
                return res.send(err)
            })
    } else {
        return res.send({
            message: "invalid product category"
        })
    }
}

const universalProductSearch = async (req, res) => {
    let queryString = req.query.name
    let foundData = []
    for (let i = 0; i < availableCollections.length; i++) {
        const collectionRef = mongoose.model(availableCollections[i], ProductSchema)

        await collectionRef.find({ "name": { $regex: queryString, $options: '$i' } })
            .select("-__v")
            .then(docs => {
                if (docs.length > 0) {
                    let dataObj = {
                        "category": availableCollections[i],
                        "data": docs
                    }
                    foundData.push(dataObj)
                }
            }).catch(err => {
                return res.send(err)
            })
    }
    res.send({
        message: "results",
        results: foundData
    })
}

const getProductFromAllCategories = async (req, res) => {
    let limit = req.query.limit
    let data = {}
    for (let i = 0; i < availableCollections.length; i++) {
        let collectionName = availableCollections[i]
        let products = []
        const collectionRef = mongoose.model(collectionName, ProductSchema)

        await collectionRef.find()
            .limit(limit)
            .then(docs => {
                products = docs
            }).catch(err => {
                console.log(err)
            })

        data[collectionName] = products
    }
    res.send(data)
}

module.exports = {
    getProduct,
    getProductFromList,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProductByCategory,
    searchProductByName,
    changeProductCategory,
    universalProductSearch,
    getProductFromAllCategories
}




