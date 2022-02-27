const checkUser = require("../entry/state"); 
const firebase = require("firebase");
const Coupons = require("../../../configs");


module.exports.coupons = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        // const email = user.email;
        // const uid = user.uid;
        
        // await Coupons.add(req.body);
        res.send({ msg: "Coupons Added" });
    }
    else{
        res.send({ msg: "Something went wrong" });
    }
}