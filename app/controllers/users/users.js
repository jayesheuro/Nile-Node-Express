const Users = require("../../../configs");
const firebase = require("firebase"); 

module.exports.Users = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        const email = user.email;
        const uid = user.uid;

        req.body.contact['email'] = email;
        req.body['userId'] = uid;
        console.log(req.body)

        const db = firebase.firestore();
        const Users = db.collection("Users");
        await Users.add(req.body);
        res.status(200).json({
            status: "User added successfully"
        })
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
} 




module.exports.getUsersInfo = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");

        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            res.status(200).json({
                status: doc.data()
            })
          });
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
} 


