const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CartRoutes = require('../../controllers/modules/productcart');
router.use(bodyParser.json());

router.post('/carts', CartRoutes.userCarts);
router.get('/', CartRoutes.displayUserCarts );
router.put('/update/:ind', CartRoutes.updateUserCarts );
router.delete('/delete/:product_id', CartRoutes.deleteUserCarts );

module.exports = router;