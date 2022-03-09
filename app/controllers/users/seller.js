const checkUser = require("../entry/state");
const firebase = require("firebase");
const Seller = require("../../../configs");
const { v4: uuidv4 } = require("uuid");

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
  await Inventory.add({
    inventory_id: inv_id,
    Userorders: [],
    products: [],
    new_orders: [],
    being_processed: [],
    delivered: [],
    returned: [],
  });
  res.status(200).json({
    status: req.body
  });
};

const displaySellerInfo = async (req, res) => {
  // const user = firebase.auth().currentUser;
  // const uid = user.uid;
  const uid  = req.body.userid 
  const db = firebase.firestore();
  const Users = db.collection("Sellers");
  const data = [];
  const snapshot = await Users.where("sellerId", "==", uid).get();
  snapshot.forEach((doc) => {
    data.push({
      business: doc.data().business,
    });
    console.log(data[0]);
  });
  res.status(200).json({
    status: data[0]
  });
};


module.exports={
    addNewSeller,
    displaySellerInfo
  }
