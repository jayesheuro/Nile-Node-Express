const Users = require("../../../configs");
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

// Note : displayCustomerOrders ,  updateCustomerOrders and deleteCustomerOrders contains bugs

const displayCustomerOrders = async (req, res) => {
  // const user = firebase.auth().currentUser;
  // const uid = user.uid;
  const uid = req.body.userid
  
  const db = firebase.firestore();
  const Users = db.collection("Users");

  const data = [];

  const snapshot = await Users.where("userId", "==", uid).get();
  snapshot.forEach((doc) => {
    data.push({ orders: doc.data().orders });

    res.status(200).json({
      status: data[0],
    });
  });
};

const updateCustomerOrders = async (req, res) => {
  // const user = firebase.auth().currentUser;
  // const uid = user.uid;
  const uid = req.body.userid

  const db = firebase.firestore();
  const Users = db.collection("Users");
  const snapshot = await Users.where("userId", "==", uid).get();

  let data = [];
  let id = "";
  snapshot.forEach((doc) => {
    data.push(doc.data().orders);
    id = doc.id;
  });

  let transaction_id = req.params.transaction_id;
  data[0].forEach((key, i) => {
    if (key.transaction_id == transaction_id) {
      delete key.transaction_id;
      delete key.status;
      delete key.tracking_id;
    }
  });
  data[0].push(req.body.orders);

  data[0] = data[0].filter((obj) => !(obj && Object.keys(obj).length === 0));

  console.log(data[0]);
  Users.doc(id).update({ orders: data[0] });

  res.status(200).json({
    status: "Success",
  });
};

const deleteCustomerOrders = async (req, res) => {
  // const user = firebase.auth().currentUser;
  // const uid = user.uid;
  const uid = req.body.userid

  const db = firebase.firestore();
  const Users = db.collection("Users");
  const snapshot = await Users.where("userId", "==", uid).get();

  let data = [];
  let id = "";
  snapshot.forEach((doc) => {
    data.push(doc.data().orders);
    id = doc.id;
  });

  let transaction_id = req.params.transaction_id;

  data[0].forEach((key) => {
    if (key.transaction_id == transaction_id) {
      delete key.transaction_id;
      delete key.status;
      delete key.tracking_id;
    }
  });

  data[0] = data[0].filter((obj) => !(obj && Object.keys(obj).length === 0));

  Users.doc(id).update({ orders: data[0] });

  res.status(200).json({
    status: "Success",
  });
};


const addCustomerOrders = async (req, res) => {
  // const user = firebase.auth().currentUser;
  // const uid = user.uid;
  const uid = req.body.userid
  // const uid = "OxQdsSxiBygKhHuOVNUVuMziWuf2";

  Userorders = [];
  const db = firebase.firestore();
  const Users = db.collection("Users");
  const Sellers = db.collection("Sellers");
  const Inventory = db.collection("Inventory");

  inv_id = "";
  const snapshot1 = await Sellers.where("sellerId", "==", uid).get();
  snapshot1.forEach((doc) => {
    inv_id = doc.data().inventory_id;
  });

  inv_id1 = "";
  id2 = "";

  const snapshot2 = await Inventory.where("inventory_id", "==", inv_id).get();
  let inv_data = {}
  snapshot2.forEach((doc) => {
    inv_data = doc.data().Userorders
    id2 = doc.id
    if (inv_data.length > 0) {
      Userorders.push(inv_data[0])
    }
  })

  orders = {};
  prodducts = {};
  user_orders = [];

  var today = new Date();

  let id = "";

  const snapshot = await Users.where("userId", "==", uid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      users_data = doc.data();
      id = doc.id;
      let tracking_id = uuidv4();
      let transaction_id = req.body.transaction_id;

      orders = {
        inventory_id: inv_id,
        tracking_id: tracking_id,
        product_selected: doc.data().product_selected,

        buyer: {
          userId: doc.data().userId,
          name: doc.data().Contact.username,
        },

        details: {
          time:
            today.getDate() +
            "/" +
            (today.getMonth()+1) +
            "/" +
            today.getFullYear() +
            ", " +
            today.toLocaleTimeString(),
          isCOD: true,
          transaction_id: transaction_id,
        },

        delivery: {
          expected_date:
            today.getDate() +
            6 +
            "/" +
            (today.getMonth()+1) +
            "/" +
            today.getFullYear() +
            ", " +
            today.toLocaleTimeString(),
          address: {
            address_line_1: doc.data().Address[0].address_line_1,
            city: doc.data().Address[0].city,
            locality: doc.data().Address[0].locality,
            contact: {
              email: doc.data().Contact.email,
              mobile: doc.data().Contact.mobile,
            },
          },
        },
      };

      user_orders.push({
        tracking_id: tracking_id,
        transaction_id: transaction_id,
        status: "ordered",
      });
    }
  });

  console.log(orders)
  Userorders.push(orders);
  await Users.doc(id).update({ orders: user_orders });

  console.log(Userorders)
  await Inventory.doc(id2).update({ Userorders });

  res.status(200).json({
    status: "success",
    orders: orders,
  });
};

module.exports = {
  displayCustomerOrders,
  updateCustomerOrders,
  deleteCustomerOrders,
  addCustomerOrders
}