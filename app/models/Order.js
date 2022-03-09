const OrderInterface = {
    tracking_id: String,
    buyer_id: String,
    seller_id: String,
    transaction_id: String,
    address:{
        shipping_address:{},
        billing_address:{}
    },
    products_ordered:[
        {
            product_id:String,
            product_quantity: Number
        }
    ],
    status:String // ["Ordered","Processing","Dispatched","Delivered","Returned","Canceled"]
}