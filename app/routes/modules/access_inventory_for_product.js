const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const AccessInventoryForProduct = require('../../controllers/modules/access_inventory_for_product.js');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/', auth.checkAuthWithFirebase, AccessInventoryForProduct.fetchProductRef);

module.exports = router;