const checkUser = require("../entry/state"); 
const firebase = require("firebase");
const Seller = require("../../../configs");


module.exports.seller = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        const email = user.email;
        const uid = user.uid;

        req.body.contact['email'] = email;
        req.body['sellerId'] = uid;
        // console.log(req.body);
        const db = firebase.firestore();
        const Sellers = db.collection("Sellers");
        await Sellers.add(req.body);
        res.status(200).json({
            status: "Seller information added successfully"
        })
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}