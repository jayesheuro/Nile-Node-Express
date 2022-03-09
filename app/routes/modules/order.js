const express = require('express')
const router = express.Router()

const orderController = require('../../controllers/modules/order')

router.get('/:tracking_id',orderController.getOrderDetailsById)
router.post('/',orderController.placeOrder)
router.patch('/seller',orderController.updateOrderStatus)
router.patch('/buyer',orderController.cancelOrder)
router.patch('/details',orderController.updateShippingAddress)

module.exports = router