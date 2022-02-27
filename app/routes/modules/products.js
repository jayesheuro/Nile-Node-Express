const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const ProductsRoutes = require('../../controllers/modules/products');
router.post('/product', ProductsRoutes.products);

module.exports = router;