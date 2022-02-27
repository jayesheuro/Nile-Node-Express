const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config()

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

app.listen(process.env.PORT,()=>{
    console.log(`listening running on ${process.env.PORT}`)
})