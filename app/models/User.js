const UserInterface = {
    userid: string,
    personal: {
        identification: {
            username: string,
            email: string,
            password: hash,
            isSeller: Boolean,
            ims_url: url
        },
        address: [
            {
                address_line_1: String,
                locality: string,
                city: string,
                state: string,
                pincode: string,
                country: string,
            }
        ],
        contact: {
            email: email,
            phone: phone
        }
    },
    cart: {
        total_products: Number,
        product_selected: [
            {
                product_id: string,
                product_name: string,
                product_image_url: url,
                price: Number,
                quantity: Number
            }
        ],
        total_amount: Number,
    },
    watch_list: [
        {
            product_id: string,
            product_name: string,
            product_image_url: url,
            price: Number,
        }
    ],
    payment: {
        netbanking: {
            bank_name: String,
            account_number: String,
            IFSC: String,
            branch: String
        },
        upi: {
            upi_id: String,
        },
        cards: {
            debit: {
                card_number: String, //XXXX-XXXX-XXXX-XXXX
                card_type: String,
                cvv: Number,
                expiry: {
                    month: Number,
                    year: Number
                }
            },
            credit: {
                card_number: String, //XXXX-XXXX-XXXX-XXXX
                card_type: String,
                cvv: Number,
                expiry: {
                    month: Number,
                    year: Number
                }
            }
        }
    },
    transaction_history: [
        // { transaction_id: String }
    ],
    orders: [
        {
            tracking_id: String,
            transaction_id: String,
            status: String
        }
    ]
}