const Users = require("../../../configs");
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

const placeOrder = async (req, res) => {
  // generate tracking id
  // mention buyer id, seller id, transaction id
  // add document to the Order collection
  // add tracking id to required inventory and buyer data

  const uid = req.body.userid;
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
  let inv_data = {};
  snapshot2.forEach((doc) => {
    inv_data = doc.data().Userorders;
    id2 = doc.id;
    if (inv_data.length > 0) {
      Userorders.push(inv_data[0]);
    }
  });

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
            (today.getMonth() + 1) +
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
            (today.getMonth() + 1) +
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

  Userorders.push(orders);
  await Users.doc(id).update({ orders: user_orders });

  await Inventory.doc(id2).update({ Userorders });

  res.status(200).json({
    status: "success",
  });
};

const getOrderDetailsById = async (req, res) => {
  // req.params.tracking_id
  // find order by id
  // send order details

  const tracking_id = req.params.tracking_id;
  const userid = req.body.userid;
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  let orderByTrackingId = {};
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      doc.data().Userorders.forEach((order) => {
        if (order.tracking_id == tracking_id) {
          orderByTrackingId = order;
        }
      });
    }
  });

  res.status(200).json({
    OrderDetail: orderByTrackingId,
  });
};

const updateOrderStatus = async (req, res) => {
  // will be updated by the seller
  // allowed status = ["Ordered" ,"Processing","Dispatched","Delivered"]
  let tracking_id = req.body.tracking_id;
  const userid = req.body.userid;
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  let orderByTrackingId = {};
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      doc.data().Userorders.forEach((order) => {
        if (order.tracking_id == tracking_id) {
          // orderByTrackingId = order
          console.log(order.tracking_id);
        }
      });
    }
  });
};

const cancelOrder = (req, res) => {
  // will be set by the user
  // update order status
  // allowed status = ["Returned","Canceled"]
  // refund -- out of scope --
};

const updateShippingAddress = (req, res) => {
  // req.body.shippingAddress = {}
  // send success
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  updateShippingAddress,
  getOrderDetailsById,
};
