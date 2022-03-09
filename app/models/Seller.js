const SellerInterface = {
    seller_id: String,
    business: {
        business_name: String,
        sector: String,
        address: [
            {
                address_line_1: String,
                locality: String,
                city: String,
                state: String,
                pincode: String,
                country: String,
            }
        ]
    },
    contact: {
        email: [
            {
                email_id: email,
                purpose: String,
            }
        ],
        phone: [
            {
                phone_number: email,
                purpose: String
            }
        ]
    },
    inventory_id: String
}