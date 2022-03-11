const Users = require("../../../configs");
const firebase = require("firebase");

const fetchProductRef = async (req, res) => {
    const db = firebase.firestore();
    const Users = db.collection("Inventory");
    let uid = req.body.userid
    const data = [];
    const snapshot = await Users.where("userId", "==", uid).get();
    snapshot.forEach((doc) => {
        data.push({ orders: doc.data() });
      });

      
      res.status(200).json({
        products: data[0].orders.products,
      });
}

module.exports = {
    fetchProductRef
}