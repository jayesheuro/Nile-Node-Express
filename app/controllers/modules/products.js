const User = require("../../../configs");
const firebase = require("firebase"); 

module.exports.products = async (req,res) =>{
    const user = firebase.auth().currentUser;
    
    if (user){

        const uid = user.uid;
        const db = firebase.firestore();
        const Products = db.collection("Products");
        req.body['sellerId'] = uid;
        console.log(req.body)
        await Products.add(req.body);
        res.status(200).json({
            status: "Product added successfully"
        })
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        }) 
    }

}




