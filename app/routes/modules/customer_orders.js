const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CustomerOrdersRoutes = require('../../controllers/modules/customer_orders');
router.use(bodyParser.json());

const auth = require('../../services/auth/firebaseAuth')

router.post('/orders', auth.checkAuthWithFirebase, CustomerOrdersRoutes.AddCustomerOrders);
router.get('/', auth.checkAuthWithFirebase, CustomerOrdersRoutes.displayCustomerOrders);
router.put('/update/:transaction_id', auth.checkAuthWithFirebase, CustomerOrdersRoutes.updateCustomerOrders);
router.delete('/delete/:transaction_id', auth.checkAuthWithFirebase, CustomerOrdersRoutes.deleteCustomerOrders);

module.exports = router;