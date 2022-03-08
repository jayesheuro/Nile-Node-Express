const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const TransactionHistoryRoutes = require('../../controllers/modules/transaction_history');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/', auth.checkAuthWithFirebase, TransactionHistoryRoutes.addTransactionHistory);
router.get('/', auth.checkAuthWithFirebase, TransactionHistoryRoutes.displayTansactionHistory);
router.put('/:transactionhistory', auth.checkAuthWithFirebase, TransactionHistoryRoutes.updateTansactionHistory);
router.delete('/:transactionhistory', auth.checkAuthWithFirebase, TransactionHistoryRoutes.deleteTansactionHistory);


module.exports = router;