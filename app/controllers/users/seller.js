const checkUser = require("../entry/state");
const firebase = require("firebase");
const Seller = require("../../../configs");
const { v4: uuidv4 } = require("uuid");

const newSeller = async (req, res) => {
  const user = firebase.auth().currentUser;
  const email = user.email;
  const uid = user.uid;
  let inv_id = uuidv4();
  req.body.business.contact.push( { email :{  email: email  }});
  req.body["sellerId"] = uid;
  req.body["inventory_id"] = inv_id;
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
  const user = firebase.auth().currentUser;
  const uid = user.uid;
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

module.exports = {
    newSeller,
    displaySellerInfo
}


// This Code Will Be Fixed Soon ....................

// module.exports.updateSellerInfo = async (req,res) =>{
//     const user = firebase.auth().currentUser;
//     if (user){
//         const uid = user.uid;
//         const db = firebase.firestore();
//         const Sellers = db.collection("Sellers");

//         const data = []
//         let id= ''
//         const snapshot = await Sellers.where('sellerId', '==', uid).get();
//         snapshot.forEach(doc => {
//             data.push({address: doc.data().address , business : doc.data().business, contact : doc.data().contact} )
//             id = doc.id
//             console.log(data[0])
//             data[0] = req.body
//             console.log(data[0])

//             Sellers.doc(id).update(
//                 data[0]
//             )

//             res.status(200).json({
//                 status: "Seller information updated"
//             })
//           });
//     }

//     else{
//         res.status(500).json({
//             status: "Something went wrong"
//         })
//     }
// }
