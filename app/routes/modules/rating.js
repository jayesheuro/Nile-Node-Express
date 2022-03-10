const express = require('express')
const router = express.Router()

const RatingController = require('../../controllers/modules/rating')

router.post('/new',RatingController.createRatingDocument)//create rating document
router.delete('/remove/:rating_id',RatingController.deleteRatingDocument)//delete entire document in case the associated product is deleted
router.get('/:rating_id',RatingController.getProductRating)//get product rating
router.post('/:rating_id',RatingController.rateProduct)//add new rating
router.delete('/:rating_id/:comment_id',RatingController.deleteComment)//delete offensive comment

module.exports = router