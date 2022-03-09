const RatingInterface = {
    product_id: String,
    rating_id: String,
    aggregate: {
        avg_rating: Number,
        total_rating_count: Number,
        total_star_count: Number
    },
    reviews: [
        {
            rate: Number,
            review: String,
            username: String,
            date: Date
        }
    ]
}