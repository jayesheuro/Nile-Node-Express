const express = require("express");
const router = express.Router();

const sellerRoutes = require("../../controllers/users/seller");

const auth = require("../../services/auth/firebaseAuth");

router.post('/seller', auth.checkAuthWithFirebase, sellerRoutes.addNewSeller);
router.post('/', auth.checkAuthWithFirebase, sellerRoutes.displaySellerInfo);
// router.put('/update', auth.checkAuthWithFirebase, sellerRoutes.updateSellerInfo);

module.exports = router;
