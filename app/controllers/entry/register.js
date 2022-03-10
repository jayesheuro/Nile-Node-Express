const User = require("../../../configs");
const firebase = require("firebase");

module.exports.CustomerRegister = async (req, res) => {
  const db = firebase.firestore();
  const Users = db.collection("Users");
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      Users.add({
        userId: userCredential.user.uid,
        isSeller :false,
        Address: [],
        orders :[],
        cart:{
          total_products:0,
          product_selected:[],
          total_amount:0 
        },
        watch_list: [],
        Payment_method: [],
        transaction_history: [],
        Contact: {},
      });
      res.status(200).json({
        userid: userCredential.user.uid,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "Something went wrong",
      });
    });
};
