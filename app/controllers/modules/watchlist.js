const Users = require("../../../configs");
const firebase = require("firebase"); 

module.exports.userWatchlist = async (req,res) =>{
    const user = firebase.auth().currentUser; 
    if (user){
        const uid = user.uid;
        const db = firebase.firestore();
        const Users = db.collection("Users");
 
        const snapshot = await Users.where('userId', '==', uid).get();
        snapshot.forEach(doc => {
            if (doc.data()){

                if (doc.data().watch_list){
                    const users_watchlist = doc.data()
                    const id = doc.id;
                    users_watchlist.watch_list.push(req.body.watch_list[0])
                    console.log(users_watchlist)
                    Users.doc(id).update(
                    users_watchlist
                    )
                            res.status(200).json({
                            status: "watch list updated"
                        })

                }
                else{
                    const users_watchlist = doc.data()
                    const id = doc.id;

                    users_watchlist["watch_list"] = req.body.watch_list;
                    
                    Users.doc(id).update(
                        users_watchlist
                    )
                   
                    res.status(200).json({
                        status: "Product added in the watch list"
                    })
            }}
                
          }); 
        
    }
    else{
        res.status(500).json({
            status: "Something went wrong"
        })
    }

}