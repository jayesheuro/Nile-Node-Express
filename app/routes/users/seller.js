const express = require('express');
const router = express.Router();

const sellerRoutes = require('../../controllers/users/seller');

router.post('/seller', sellerRoutes.seller);
router.get('/', sellerRoutes.displaySellerInfo);
router.put('/update', sellerRoutes.updateSellerInfo);

module.exports = router;