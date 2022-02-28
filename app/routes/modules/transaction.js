const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionRoutes = require('../../controllers/modules/transaction');
router.use(bodyParser.json());

router.post('/transaction/:payment_type', TransactionRoutes.userTansaction);
router.get('/', TransactionRoutes.displayUserTansaction);
router.put('/transaction/update/:payment_type', TransactionRoutes.updateUserTansaction)
router.delete('/transaction/delete/:payment_type', TransactionRoutes.deleteUserTansaction)


module.exports = router;