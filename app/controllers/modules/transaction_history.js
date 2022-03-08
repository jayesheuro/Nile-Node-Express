const Users = require("../../../configs");
const firebase = require("firebase"); 

module.exports.addTransactionHistory = async (req,res) =>{
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
  
                users_data['transaction_history'].push( req.body.transaction_history)

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




module.exports.displayTansactionHistory = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");

        const data = []
    
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            data.push({transaction_history: doc.data().transaction_history } )

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



module.exports.updateTansactionHistory = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        let data = []
        let id = ''
        snapshot.forEach(doc => {
            data.push(doc.data().transaction_history )
            id = doc.id
        })
        
        let transactionhistory = req.params.transactionhistory

        data[0].forEach(key=>{
            if (key.transaction_id == transactionhistory){
                delete key.transaction_id
            }
        })

        
        data[0] = data[0].filter(
            obj => !(obj && Object.keys(obj).length === 0)
          );

        data[0].push(req.body)
        console.log(data[0])
        
        Users.doc(id).update(
            {transaction_history  : data[0]}
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





module.exports.deleteTansactionHistory = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
        const snapshot = await Users.where('userId', '==', uid).get();

        let data = []
        let id = ''
        snapshot.forEach(doc => {
            data.push(doc.data().transaction_history )
            id = doc.id
        })
        
        let transactionhistory = req.params.transactionhistory
        

        data[0].forEach(key=>{
            if (key.transaction_id == transactionhistory){
                delete key.transaction_id
            }
        })

        
        data[0] = data[0].filter(
            obj => !(obj && Object.keys(obj).length === 0)
          );
        
        Users.doc(id).update(
            { transaction_history  : data[0]}
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
