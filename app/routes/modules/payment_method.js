const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionRoutes = require('../../controllers/modules/payment_method');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/', auth.checkAuthWithFirebase, TransactionRoutes.userTansaction);
router.get('/', auth.checkAuthWithFirebase, TransactionRoutes.displayUserTansaction);
router.put('/update/:payment_type', auth.checkAuthWithFirebase, TransactionRoutes.updateUserTansaction)
router.delete('/delete/:payment_type', auth.checkAuthWithFirebase, TransactionRoutes.deleteUserTansaction)


module.exports = router;