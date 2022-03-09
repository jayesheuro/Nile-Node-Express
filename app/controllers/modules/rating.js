const firebase = require("firebase");
const { v4: uuidv4 } = require("uuid");

const db = firebase.firestore();
const RatingCollection = db.collection("Rating");

const createRatingDocument = async (req, res) => {

    //check if another document already exists for the product
    const snapshot = await RatingCollection.where("product_id", "==", req.body.product_id).get()
    let data = -1
    snapshot.forEach((doc) => {
        if (doc.exists) {
            data = doc.data()
            return
        }
    })
    if (data !== -1) {
        return res.status(403).send({
            message: "product rating document already exists"
        })
    }

    // if no prev data was found then add new document
    let rating_id = uuidv4()
    let ratingObject = {
        product_id: req.body.product_id,
        rating_id: rating_id,
        aggregate: {
            avg_rating: 0,
            total_rating_count: 0,
            total_star_count: 0,
            total_review_count: 0
        },
        reviews: []
    }

    RatingCollection.doc(rating_id)
        .set(ratingObject)
        .then((response) => {
            res.send({
                message: "successfully created rating object",
                rating_id: rating_id
            })
        })
}

function calculateAggregateData(prevAgg, newReview) {
    let aggObject = prevAgg

    if (newReview.review != "") {
        aggObject.total_review_count = parseInt(aggObject.total_review_count) + 1
    }
    if (newReview.stars > 0) {
        aggObject.total_star_count = aggObject.total_star_count + newReview.stars
        aggObject.total_rating_count = aggObject.total_rating_count + 1
        aggObject.avg_rating = aggObject.total_star_count / aggObject.total_rating_count
    }

    console.log(aggObject)

    return aggObject
}

const rateProduct = async (req, res) => {
    let rating_id = req.params.rating_id

    let doc = await RatingCollection.doc(rating_id).get()
    if (!doc.exists) {
        return res.status(404).send({
            message: "No document found"
        })
    }
    doc = doc.data()

    let newReviewObject = req.body.new_review

    newReviewObject.stars = parseInt(newReviewObject.stars)

    let new_agg_object = calculateAggregateData(doc.aggregate, req.body.new_review)

    let all_reviews = doc.reviews
    all_reviews.push(req.body.new_review)

    RatingCollection.doc(rating_id)
        .update({ aggregate: new_agg_object, reviews: all_reviews })
        .then((response) => {
            res.status(200).send({
                message: "successfully added your review",
                review: req.body.new_review
            })
        })
}

const getProductRating = async (req, res) => {
    let rating_id = req.params.rating_id

    const doc = await RatingCollection.doc(rating_id).get()
    if (!doc.exists) {
        return res.status(404).send({
            message: "No document found"
        })
    }
    return res.status(200).send({
        message: "document found",
        rating_data: doc.data()
    })
}

const deleteComment = async (req, res) => {
    const rating_id = req.params.rating_id
    const comment_id = req.params.comment_id

    let doc = await RatingCollection.doc(rating_id).get()
    if (!doc.exists) {
        return res.status(404).send({
            message: "No document found"
        })
    }

    let all_reviews = doc.data().reviews
    if (comment_id > all_reviews.length) {
        return res.status(404).send({
            message: "No such comment found"
        })
    }

    let required_reviews = all_reviews.filter((elem, index) => {
        return index !== Number(comment_id)
    })

    RatingCollection.doc(rating_id).update({ reviews: required_reviews })
        .then((response) => {
            res.status(200).send({
                message: "successfully deleted the comment"
            })
        })

}

const deleteRatingDocument = async (req, res) => {
    let rating_id = req.params.rating_id

    let doc = await RatingCollection.doc(rating_id).get()
    if (!doc.exists) {
        return res.status(404).send({
            message: "No document found"
        })
    }

    RatingCollection.doc(rating_id).delete().then((response)=>{
        res.status(200).send({
            message:"successfully deleted document"
        })
    })

}

const getProductStars = async (rating_id)=>{
    let data = await RatingCollection.doc(rating_id).get().aggregate.avg_rating
    return data
}

module.exports = {
    createRatingDocument,
    rateProduct,
    getProductRating,
    deleteComment,
    deleteRatingDocument,
    getProductStars
}