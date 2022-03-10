const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/modules/order')
const auth = require('../../services/auth/firebaseAuth')

router.get('/:tracking_id', auth.checkAuthWithFirebase, orderController.getOrderDetailsById)
router.post('/', auth.checkAuthWithFirebase, orderController.placeOrder)
router.patch('/seller', auth.checkAuthWithFirebase, orderController.updateOrderStatus)
router.patch('/buyer',orderController.cancelOrder)
router.patch('/details', auth.checkAuthWithFirebase, orderController.updateShippingAddress)
router.post('/orders', auth.checkAuthWithFirebase, orderController.displayCustomerOrders)

module.exports = router