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

  Transactions.add({
    Transaction_id: uuidv4(),
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
  // req.params.transaction_id
  // send transaction document
  transaction_id = req.params.id
  const userid = req.body.userid
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  let orderByTransactionId = {}
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
        doc.data().Userorders.forEach((order)=>{
          console.log(doc.data().Userorders)
            if (order.details.transaction_id == transaction_id){
              orderByTransactionId = order 
            }
        })
    }

  })
  
  res.status(200).json({
    OrderDetail : orderByTransactionId
  });
};

const getTransactionRecordFromList = async(req, res) => {
  // req.body={
  //     transaction_list = ["wlbofqn2","biwgbo3g","bwogi3bq"]
  // }
  const userid = req.body.userid
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  let transactions= []
  console.log("hello")
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
        doc.data().Userorders.forEach((transaction)=>{
          transactions.push(transaction.details.transaction_id)
        })
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
