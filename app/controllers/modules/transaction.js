const Users = require("../../../configs");
const firebase = require("firebase"); 

module.exports.userTansaction = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            if (doc.data()){

                const users_data = doc.data()
                const id = doc.id;

                if (req.params.payment_type == "netbanking"){
                    users_data['Transactions'].push( {netbanking : req.body.netbanking})
                }

                else if(req.params.payment_type == "debit_card"){
                    users_data['Transactions'].push( {debit_card : req.body.debit_card} )
                }

                else if(req.params.payment_type == "credit_card"){
                    users_data['Transactions'].push( {credit_card : req.body.credit_card} )
                }

                else if(req.params.payment_type == "upi"){
                    users_data['Transactions'].push( {upi : req.body.upi} )
                }
                
                Users.doc(id).update(
                    users_data
                )
             
                    res.status(200).json({
                    status: "Success"
                    })
                }
          });    
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}





module.exports.displayUserTansaction = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");

        const data = []
    
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({Transactions: doc.data().Transactions} )

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





module.exports.updateUserTansaction = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        let data = []
        let id = ''
        snapshot.forEach(doc => {
            data.push(doc.data().Transactions )
            id = doc.id
        })
        
        let payment_type = req.params.payment_type
        
        data[0].forEach(key=>{
            delete key[payment_type]
        })

        data[0] = data[0].filter(
            obj => !(obj && Object.keys(obj).length === 0)
          );

        data[0].push(req.body)
        console.log(data[0])
        
        Users.doc(id).update(
            {Transactions  : data[0]}
        )

        res.status(200).json({
            status: "Cart updated successfully"
        })
        
    }

    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}









module.exports.deleteUserTansaction = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        let data = []
        let id = ''
        snapshot.forEach(doc => {
            data.push(doc.data().Transactions )
            id = doc.id
        })
        
        let payment_type = req.params.payment_type
        
        data[0].forEach(key=>{
            delete key[payment_type]
        })

        data[0] = data[0].filter(
            obj => !(obj && Object.keys(obj).length === 0)
          );

        console.log(data[0])
        
        Users.doc(id).update(
            {Transactions  : data[0]}
        )

        res.status(200).json({
            status: "Success"
        })
        
    }

    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }
}
