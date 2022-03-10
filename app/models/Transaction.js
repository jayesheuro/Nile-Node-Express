const TransactionInterface = {
    transaction_id: String,
    transaction_date: Date,
    transaction_time: String,
    amount: Number,
    payment_mode: String, // [COD, UPI, Debit, Credit, Netbanking]
    components:{
        cart_total:Number,
        delivery_charge:Number,
        coupon_discount:Number
    }
}

