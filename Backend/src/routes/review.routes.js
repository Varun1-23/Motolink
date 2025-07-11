import express from 'express'
import { addReview, deleteReview, getShopReviews, updateReview } from '../controllers/review.controller.js'



const router = express.Router()

router.post('/add' , addReview)
router.delete('/:mechanicShopId' , getShopReviews)
router.get('/:reviewId' , deleteReview)
router.put('/:reviewId' , updateReview)

export default router