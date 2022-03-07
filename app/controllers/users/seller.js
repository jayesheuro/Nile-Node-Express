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
        req.body["inventory_id"] = ''
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



module.exports.displaySellerInfo = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Sellers");

        const data = []
    
        const snapshot = await Users.where('sellerId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({addrss: doc.data().address , business : doc.data().business, contact : doc.data().contact} )

            console.log(data[0])
            res.status(200).json({
                status: data[0]
            })
          });
    }

    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}





module.exports.updateSellerInfo = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Sellers = db.collection("Sellers");

        const data = []
        let id= ''
        const snapshot = await Sellers.where('sellerId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({address: doc.data().address , business : doc.data().business, contact : doc.data().contact} )
            id = doc.id 


            console.log(data[0])
            data[0] = req.body 
            console.log(data[0])
              

            Sellers.doc(id).update(
                data[0]
            )


            res.status(200).json({
                status: "Seller information updated"
            })
          });
    }

    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}