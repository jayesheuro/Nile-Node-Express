const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionRoutes = require('../../controllers/modules/payment_method');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/add', auth.checkAuthWithFirebase, TransactionRoutes.addPaymentMode);
router.post('/', auth.checkAuthWithFirebase, TransactionRoutes.displayPaymentModes);
router.put('/update/:payment_type', auth.checkAuthWithFirebase, TransactionRoutes.updatePaymentMode)
router.delete('/delete/:payment_type', auth.checkAuthWithFirebase, TransactionRoutes.deletePaymentMode)


module.exports = router;