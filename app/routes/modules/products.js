const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const ProductController = require('../../controllers/modules/products');

router.post('/', ProductController.createProduct)
router.get('/all/:category',ProductController.searchProductByCategory)
router.get('/:category/:id',ProductController.getProduct)
router.delete('/:category/:id',ProductController.deleteProduct)

module.exports = router;