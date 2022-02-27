const express = require("express");
const cors = require("cors");
const User = require("./configs");
const firebase = require("firebase");
const app = express();

app.use(express.json());
app.use(cors());

const loginRoute = require('./app/routes/entry/login');
const registerRoute = require('./app/routes/entry/register');
const sellerRoutes = require('./app/routes/users/seller');
const UsersRoutes = require('./app/routes/users/users');
const ProductsRoutes = require('./app/routes/modules/products');
const CartRoutes = require('./app/routes/modules/productcart');
const WatchlistRoutes = require('./app/routes/modules/watchlist');


app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);
app.use('/api/sellers', sellerRoutes);
app.use('/api/detail/', UsersRoutes)
app.use('/api/products/', ProductsRoutes)
app.use('/api/cart/', CartRoutes)
app.use('/api/watchlist/', WatchlistRoutes)

app.listen(9000,()=>{
    console.log("listening running on 9000")
})












// app.post("/logout", async(req, res)=>{
//   firebase.auth().signOut().then(() => {
//     res.send({status:"User logged out successfully"})
//   }).catch((error) => {
//     res.send({status:"Something went wrong"})
//   });
// })






// app.get("/", async(req,res)=>{
//   const snapshot = await User.get();
//   const list = snapshot.docs.map((doc)=> ({id:doc.id, ...doc.data()}));
//   res.send(list);
// })

// app.post("/create", async (req, res) => {
//     const data = req.body;
//     console.log(data)
//     await User.add(data );
//     res.send({ msg: "User Added" });
//   });


// app.put("/update", async (req, res) => {
//   const id = req.body.id;
//   delete req.body.id;
//   const data = req.body;
//   await User.doc(id).update(data);
//   res.send({ msg: "Updated" });
// });

// app.delete("/delete", async (req, res) => {
//   const id = req.body.id;
//   await User.doc(id).delete();
//   res.send({ msg: "Deleted" });
// });

// app.listen(5000)