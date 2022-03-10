const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CartRoutes = require('../../controllers/modules/productcart');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/new', auth.checkAuthWithFirebase, CartRoutes.addItemToCart);
router.post('/get', CartRoutes.displayUserCarts);
router.post('/update', auth.checkAuthWithFirebase, CartRoutes.updateProductQuantity);
router.post('/delete', auth.checkAuthWithFirebase, CartRoutes.removeItemFromCart);

module.exports = router;