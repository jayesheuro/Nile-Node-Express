const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();

const CustomerOrdersRoutes = require('../../controllers/modules/customer_orders');
router.use(bodyParser.json());

router.post('/orders', CustomerOrdersRoutes.AddCustomerOrders);
router.get('/', CustomerOrdersRoutes.displayCustomerOrders);
router.put('/update/:transaction_id', CustomerOrdersRoutes.updateCustomerOrders);
router.delete('/delete/:transaction_id', CustomerOrdersRoutes.deleteCustomerOrders);

module.exports = router;