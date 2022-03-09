const Users = require("../../../configs");
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

const addTransactionRecord = async (req, res) => {
  // generate transaction id
  // add transaction data to the collection
  // add transaction id to requried user and inventory documents
  const uid = req.body.userid;
  const db = firebase.firestore();
  const Transactions = db.collection("Transactions");
  var today = new Date();

  let transactions = {
    transaction_id : uuidv4(),
    transaction_date :today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
    transaction_time : today.toLocaleTimeString(),
    amount : req.body.amount,
    payment_mode: req.body.payment_mode,
    components:{
      cart_total: req.body.component.cart_total,
      delivery_charge: req.body.component.delivery_charge,
      coupon_discount: req.body.component.coupon_discount
    }
  }
  let userid = uid
  Transactions.add({
    transactions, userid
  })
    .then((docRef) => {
      res.status(200).json({
        Status: "success"
      });
    })
    .catch((error) => {
      res.status(200).json({
        Status: "Something went wrong"
      });
    });
};

const getTransactionRecordById = async (req, res) => {

  transaction_id = req.params.id
  const userid = req.body.userid
  const db = firebase.firestore();
  const Transactions = db.collection("Transactions");
  let TransactionByTransactionId = {}
  const snapshot = await Transactions.where("transactions.transaction_id", "==", transaction_id).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      TransactionByTransactionId = doc.data()
    }

  })
  
  res.status(200).json({
    TransactionByTransactionId
  });
};

const getTransactionRecordFromList = async(req, res) => {
  // req.body={
  //     transaction_list = ["wlbofqn2","biwgbo3g","bwogi3bq"]
  // }
  const userid = req.body.userid
  const db = firebase.firestore();
  const Transactions = db.collection("Transactions");
  let transactions= []
  const snapshot = await Transactions.where("userid", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
          transactions.push(doc.data().userid)
    }
  })
  
  res.status(200).json({
    Transactions : transactions
  });

};

module.exports = {
  addTransactionRecord,
  getTransactionRecordById,
  getTransactionRecordFromList,
};
