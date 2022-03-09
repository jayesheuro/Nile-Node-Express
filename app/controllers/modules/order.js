const placeOrder = (req,res)=>{
    // generate tracking id
    // mention buyer id, seller id, transaction id
    // add document to the Order collection
    // add tracking id to required inventory and buyer data
}

const getOrderDetailsById=(req,res)=>{
    // req.params.tracking_id
    // find order by id
    // send order details
}

const updateOrderStatus = (req,res)=>{
    // will be updated by the seller
    // allowed status = ["Ordered","Processing","Dispatched","Delivered"]
}

const cancelOrder = (req,res)=>{
    // will be set by the user
    // update order status 
    // allowed status = ["Returned","Canceled"]
    // refund -- out of scope --
}

const updateShippingAddress = (req,res)=>{
    // req.body.shippingAddress = {}
    // send success
}

module.exports={
    placeOrder,
    updateOrderStatus,
    cancelOrder,
    updateShippingAddress,
    getOrderDetailsById
}