const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const ProductController = require('../../controllers/modules/products');

router.post('/', ProductController.createProduct)
router.patch('/',ProductController.changeProductCategory)
router.get('/',ProductController.getProductFromList)
router.get('/all/:category',ProductController.searchProductByCategory)
router.get('/:category/:id',ProductController.getProduct)
router.put('/:category/:id',ProductController.updateProduct)
router.delete('/:category/:id',ProductController.deleteProduct)

module.exports = router;