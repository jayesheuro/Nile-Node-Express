const checkUser = require("../entry/state");
const firebase = require("firebase");
const Seller = require("../../../configs");
const { v4: uuidv4 } = require('uuid');

const addNewSeller = async (req, res) => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    const uid = user.uid;
    let inv_id = uuidv4();
    req.body.contact['email'] = email;
    req.body['sellerId'] = uid;
    req.body["inventory_id"] = inv_id
    const db = firebase.firestore();
    const Sellers = db.collection("Sellers");
    const Inventory = db.collection("Inventory");

    await Sellers.add(req.body);
    await Inventory.add({ inventory_id: inv_id, Userorders: [] });
    res.status(200).json({
        status: "Seller information added successfully"
    })
}

const addProduct = async (req, res) => {
    const id = req.body.product_id
}

const displaySellerInfo = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Users = db.collection("Sellers");

    const data = []

    const snapshot = await Users.where('sellerId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push({ addrss: doc.data().address, business: doc.data().business, contact: doc.data().contact })

        console.log(data[0])
        res.status(200).json({
            status: data[0]
        })
    });
}

const updateSellerInfo = async (req, res) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const db = firebase.firestore();
    const Sellers = db.collection("Sellers");

    const data = []
    let id = ''
    const snapshot = await Sellers.where('sellerId', '==', uid).get();
    snapshot.forEach(doc => {
        data.push({ address: doc.data().address, business: doc.data().business, contact: doc.data().contact })
        id = doc.id


        console.log(data[0])
        data[0] = req.body
        console.log(data[0])


        Sellers.doc(id).update(
            data[0]
        )


        res.status(200).json({
            status: "Seller information updated"
        })
    });
}

module.exports={
    addNewSeller,
    displaySellerInfo,
    updateSellerInfo
}