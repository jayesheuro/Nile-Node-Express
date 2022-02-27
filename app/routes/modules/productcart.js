const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CartRoutes = require('../../controllers/modules/productcart');
router.use(bodyParser.json());

router.post('/carts', CartRoutes.userCarts);

module.exports = router;