const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionHistoryRoutes = require('../../controllers/modules/transaction_history');
router.use(bodyParser.json());

router.post('/transaction/', TransactionHistoryRoutes.addTransactionHistory);
router.get('/', TransactionHistoryRoutes.displayTansactionHistory);
router.put('/transaction/:transactionhistory', TransactionHistoryRoutes.updateTansactionHistory);
router.delete('/transaction/:transactionhistory', TransactionHistoryRoutes.deleteTansactionHistory);


module.exports = router;