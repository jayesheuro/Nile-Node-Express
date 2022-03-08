const Users = require("../../../configs");
const firebase = require("firebase");

const userCarts = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        if (doc.data()) {

            if (doc.data().product_selected.length >= 1) {
                const users_data = doc.data()
                const id = doc.id;
                users_data.product_selected.push(req.body.product_selected[0])
                users_data.other_product_info.total_products += 1
                users_data.other_product_info.total_amount += req.body.product_selected[0].price

                Users.doc(id).update(
                    users_data
                )
                res.status(200).json({
                    status: "Cart updated"
                })

            }
            else {
                const users_data = doc.data()
                const id = doc.id;

                users_data["product_selected"] = req.body.product_selected;
                users_data["other_product_info"] = { total_amount: req.body.product_selected[0].price, total_products: 1 };

                Users.doc(id).update(
                    users_data
                )

                res.status(200).json({
                    status: "Product added in the cart"
                })
            }
        }

    });
}

const displayUserCarts = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const data = []

    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push({ Personal_details: doc.data().product_selected })

        res.status(200).json({
            status: data[0]
        })
    });
}

const updateUserCarts = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");
    const snapshot = await Users.where('userId', '==', uid).get();

    let data = []
    let other_prod_info = []
    const users_data = {}
    let total_amount = 0
    let total_products = 0
    let id = ''
    snapshot.forEach(doc => {
        data.push(doc.data().product_selected)
        id = doc.id
    })

    const ind = req.params.ind
    delete req.body.ind
    data[0][ind] = req.body
    data[0].forEach(key => {
        total_amount += key.price
        total_products += 1
    })

    users_data["product_selected"] = data[0]
    users_data["other_product_info"] = { total_amount: total_amount, total_products: total_products };

    Users.doc(id).update(
        users_data
    )

    // console.log(users_data);
    res.status(200).json({
        status: "Cart updated successfully"
    })
}

const deleteUserCarts = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Users");

    const data = []
    let total_amount = 0
    let total_products = 0
    let id = ''
    const users_data = {}
    const snapshot = await Users.where('userId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push(doc.data().product_selected)
        id = doc.id


        let product_id = req.params.product_id
        data[0] = data[0].filter((item) => item.product_id !== product_id);

        data[0].forEach(key => {
            total_amount += key.price
            total_products += 1
        })

        users_data["product_selected"] = data[0]
        users_data["other_product_info"] = { total_amount: total_amount, total_products: total_products };

        console.log(users_data)
        Users.doc(id).update(
            users_data
        )

        res.status(200).json({
            status: "Product deleted successfully"
        })
    });
}

module.exports = {
    userCarts,
    displayUserCarts,
    updateUserCarts,
    deleteUserCarts
}