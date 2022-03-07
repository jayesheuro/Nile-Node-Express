const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionRoutes = require('../../controllers/modules/payment_method');
router.use(bodyParser.json());

router.post('/payment/:payment_type', TransactionRoutes.userTansaction);
router.get('/', TransactionRoutes.displayUserTansaction);
router.put('/payment/update/:payment_type', TransactionRoutes.updateUserTansaction)
router.delete('/payment/delete/:payment_type', TransactionRoutes.deleteUserTansaction)


module.exports = router;