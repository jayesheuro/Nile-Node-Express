const Users = require("../../../configs");
const firebase = require("firebase");

const addItemToCart = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid

    const db = firebase.firestore();
    const Users = db.collection("Users");

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        if (doc.data()) {

            const users_data = doc.data()
            const id = doc.id;

            let cartObject = users_data.cart
            let allProducts = cartObject.product_selected

            let flag = 0
            for (let i = 0; i < allProducts.length; i++) {
                if (allProducts[i].product_id === req.body.product.product_id) {
                    return res.status(200).send({
                        status: "product already exists in the cart"
                    })
                }
            }

            cartObject.product_selected.push(req.body.product)
            cartObject.total_products += 1
            cartObject.total_amount += req.body.product.quantity * req.body.product.price

            Users.doc(id).update(
                { cart: cartObject }
            )
            res.status(200).send({
                status: "Cart updated"
            })
        }

    });
}

const displayUserCarts = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid

    const db = firebase.firestore();
    const Users = db.collection("Users");

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        res.status(200).json({
            status: doc.data().cart
        })
    });
}

function findCartTotal(products) {
    let sum = 0
    products.map((elem, index) => {
        sum += (elem.price * elem.quantity)
    })
    return sum
}

const updateProductQuantity = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid

    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let doc_id = ""
    let cartObject = {}
    snapshot.forEach(doc => {
        cartObject = doc.data().cart
        doc_id = doc.id
    })

    let requiredProduct = req.body.product

    for (let i = 0; i < cartObject.product_selected.length; i++) {
        if (requiredProduct.product_id === cartObject.product_selected[i].product_id) {
            // found and update
            cartObject.product_selected[i].quantity = requiredProduct.quantity
            cartObject.total_amount = findCartTotal(cartObject.product_selected)

            Users.doc(doc_id).update(
                { cart: cartObject }
            )
            return res.status(200).json({
                status: "Cart updated successfully"
            })
        }
    }
    return res.status(404).send({
        status: "no such product"
    })
}

const removeItemFromCart = async (req, res) => {
    // const user = firebase.auth().currentUser;
    // const uid = user.uid;
    const uid = req.body.userid

    const db = firebase.firestore();
    const Users = db.collection("Users");

    let doc_id = ''
    let cartObject = {}
    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        cartObject = doc.data().cart
        doc_id = doc.id
    });

    let requiredProduct = req.body.product
    let allProducts = cartObject.product_selected
    let requiredArray = allProducts.filter((elem, index) => {
        return elem.product_id != requiredProduct.product_id
    })

    cartObject.total_amount = findCartTotal(requiredArray)
    cartObject.total_products-=1
    cartObject.product_selected = requiredArray

    Users.doc(doc_id).update(
        { cart: cartObject }
    )
    return res.status(200).json({
        status: "Cart updated successfully"
    })
}

module.exports = {
    addItemToCart,
    displayUserCarts,
    updateProductQuantity,
    removeItemFromCart
}