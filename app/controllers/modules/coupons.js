const checkUser = require("../entry/state");
const firebase = require("firebase");
const Coupons = require("../../../configs");


module.exports.coupons = async (req, res) => {
    const user = firebase.auth().currentUser;
    res.send({ msg: "Coupons Added" });
}