// const Users = require("../../../configs");
// const firebase = require("firebase"); 

// module.exports.userInventory = async (req,res) =>{
//     const user = firebase.auth().currentUser; 
//     if (user){
//         const uid = user.uid;
//         const db = firebase.firestore();
//         const Users = db.collection("Sellers");
 
//         const snapshot = await Sellers.where('sellerId', '==', uid).get();
//         snapshot.forEach(doc => {
//             if (doc.data()){

//                 if (doc.data().product_selected.length >=1){
//                     const users_data = doc.data()
//                     const id = doc.id;
//                     users_data.product_selected.push(req.body.product_selected[0])
//                     users_data.other_product_info.total_products +=1
//                     users_data.other_product_info.total_amount += req.body.product_selected[0].price

//                     Users.doc(id).update(
//                     users_data
//                     )
//                             res.status(200).json({
//                             status: "Cart updated"
//                         })

//                 }
//                 else{
//                     const users_data = doc.data()
//                     const id = doc.id;

//                     users_data["product_selected"] = req.body.product_selected;
//                     users_data["other_product_info"] = {total_amount:req.body.product_selected[0].price, total_products:1 };
                    
//                     Users.doc(id).update(
//                         users_data
//                     )
                   
//                     res.status(200).json({
//                         status: "Product added in the cart"
//                     })
//             }}
                
//           }); 
        
//     }
//     else{
//         res.status(500).json({
//             status: "Something went wrong"
//         })
//     }
// }