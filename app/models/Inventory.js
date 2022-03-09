let InventoryInterface = {
    inventory_id: String,
    orders: [
        {
            tracking_id: String,
            product: {
                product_id: String,
                product_name: String,
                product_image_url: url,
                price: Number,
                quantity: Number
            },
            buyer: {
                user_id: String,
                name: String,
            },
            details: {
                time: timestamp,
                isCOD: Boolean,
                transaction_id: String
            },
            delivery: {
                expected_date: Date,
                address: {},
                contact: {
                    email: email,
                    phone: phone
                }
            }
        }
    ],
    products: [
        {
            product_id: String,
            available_quantity: Number,
            Category: String
        },
    ],
    new_orders: [{ order_id: String }],
    being_processed: [{ order_id: String }],
    delivered: [{ order_id: String }],
    returned: [{ order_id: String }]

}