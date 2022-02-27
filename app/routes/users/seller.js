const express = require('express');
const router = express.Router();

const sellerRoutes = require('../../controllers/users/seller');

router.post('/seller', sellerRoutes.seller);

module.exports = router;