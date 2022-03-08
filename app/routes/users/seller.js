const express = require('express');
const router = express.Router();

const sellerRoutes = require('../../controllers/users/seller');

router.post('/seller', sellerRoutes.seller);
router.get('/', sellerRoutes.displaySellerInfo);

// This code will be fixed soon.......
// router.put('/update', sellerRoutes.updateSellerInfo);

module.exports = router;