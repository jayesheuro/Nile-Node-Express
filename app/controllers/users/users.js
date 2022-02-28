const Users = require("../../../configs");
const firebase = require("firebase"); 

module.exports.Users = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        const email = user.email;
        const uid = user.uid;

        req.body.Personal_details['email'] = email;
        req.body['userId'] = uid;
        req.body['other_product_info'] = ''
        req.body['product_selected'] = []
        req.body['watch_list'] = []
        req.body['Transactions'] = [ {netbanking : {}, debit_card : {}, credit_card : {}, upi : {}}  ]

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

        const data = []
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({Personal_details: doc.data().Personal_details} )

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



module.exports.updateUsersInfo = async (req,res)=>{
    const user = firebase.auth().currentUser;
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        snapshot.forEach(doc => {
            var data = doc.data().Personal_details 
         
            for (const prop in req.body) {
                data[ prop ] = req.body[prop]
              }
            
            console.log(data)
            Users.doc(doc.id).update(
                { Personal_details: data }
                )

            res.status(200).json({
                status: "User Information updated successfully"
            })
        })
    }
    res.status(500).json({
        status: "Something went wrong"
    })

}

