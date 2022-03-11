const Users = require("../../../configs");
const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

const placeOrder = async (req, res) => {
  console.log(req.body)
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
      doc.data().Userorders.forEach((it) => {
        Userorders.push(it);
      });
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
      if (doc.data().orders.length > 0) {
        doc.data().orders.forEach((it) => {
          user_orders.push(it);
        });
      }
      users_data = doc.data();
      id = doc.id;
      let tracking_id = uuidv4();
      let transaction_id = req.body.transaction_id;

      orders = {
        inventory_id: inv_id,
        tracking_id: tracking_id,
        product_selected: doc.data().cart.product_selected,

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
          payment_mode:req.body.payment_mode,
          transaction_id: transaction_id,
          status: "ordered",
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
          address: req.body.address,
        },
      };

      user_orders.push({
        tracking_id: tracking_id,
        transaction_id: transaction_id,
      });
    }
  });

  Userorders.push(orders);
  await Users.doc(id).update({ orders: user_orders });

  await Inventory.doc(id2).update({ Userorders });

  res.status(200).json({
    status: "Success",
    tracking_id:tracking_id
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
  let Userorders = [];
  let id = "";
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      id = doc.id;
      if (doc.data().Userorders.length > 0) {
        doc.data().Userorders.forEach((it) => {
          Userorders.push(it);
        });
      }
    }
  });

  Userorders.forEach((order) => {
    if (order.tracking_id == tracking_id) {
      order.details.status = req.body.status;
    }
  });

  Inventory.doc(id).update({ Userorders });

  res.status(200).json({
    status: "Success",
  });
};

const cancelOrder = (req, res) => {
  // will be set by the user
  // update order status
  // allowed status = ["Returned","Canceled"]
  // refund -- out of scope --
};

const updateShippingAddress = async (req, res) => {
  // req.body.shippingAddress = {}
  // send success
  let tracking_id = req.body.tracking_id;
  const userid = req.body.userid;
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  let Userorders = [];
  let id = "";
  const snapshot = await Inventory.where("userId", "==", userid).get();
  snapshot.forEach((doc) => {
    if (doc.data()) {
      id = doc.id;
      if (doc.data().Userorders.length > 0) {
        doc.data().Userorders.forEach((it) => {
          Userorders.push(it);
        });
      }
    }
  });

  Userorders.forEach((order) => {
    if (order.tracking_id == tracking_id) {
      order.delivery.address.shipping_address = req.body.shipping_address

    }
  });

  // console.log(Userorders)
  Inventory.doc(id).update({ Userorders });

  res.status(200).json({
    status: "Success",
  });
};


const displayCustomerOrders = async (req, res) => {
  const uid = req.body.userid
  const db = firebase.firestore();
  const Inventory = db.collection("Inventory");
  const data = [];
  let inventory_id= ''
  const snapshot = await Inventory.where("userId", "==", uid).get();
  snapshot.forEach((doc) => {
    data.push({ orders: doc.data()});
    inventory_id =  data[0].orders.inventory_id
    console.log(data[0].orders.inventory_id)
  });
  res.status(200).json({
    inventory_id : inventory_id
  });
};

module.exports = {
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  updateShippingAddress,
  getOrderDetailsById,
  displayCustomerOrders
};
