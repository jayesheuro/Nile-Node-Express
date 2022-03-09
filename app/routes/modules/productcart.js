const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CartRoutes = require('../../controllers/modules/productcart');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/carts', auth.checkAuthWithFirebase, CartRoutes.userCarts);
router.get('/', CartRoutes.displayUserCarts);
router.put('/update/:ind', auth.checkAuthWithFirebase, CartRoutes.updateUserCarts);
router.delete('/delete/:product_id', auth.checkAuthWithFirebase, CartRoutes.deleteUserCarts);

module.exports = router;