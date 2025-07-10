import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Review from "../models/review.models.js";


export const addReview = asyncHandler(async(req,res)=>{
    try {
    const { rating , Comment , mechanicShopId} = req.body
    const userId = req.user.id

    if(!rating || !mechanicShopId){
        throw new ApiError(400, 'Rating and mechanic shop is required')
    }

    const alreadyReviewd = await Review.findOne({ user: userId , mechanicShop: mechanicShopId})
    if(alreadyReviewd)
    {
        throw new ApiError(409, "Rating already exists")
    }

    const review = await Review.create({
        user: userId,
        mechanicShop: mechanicShopId,
        rating,
        Comment
    })

    return res
           .status(200)
           .json(new ApiResponse(200 , review, 'review added successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "internal server error")
    }

})

export const getShopReviews = asyncHandler(async(req,res)=> {
    try {
        const { mechanicShopId } = req.params
    
        const review = await Review.findById({ mechanicShop: mechanicShopId, isDeleted: false }).populate('user' , 'name')
        return res
               .status(200)
               .json(new ApiResponse(200 , review , 'reviews fetched')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})

export const deleteReview = asyncHandler(async(req,res) => {
    try {
        const { reviewId } = req.params
        const userId = req.user.id
    
        const review = await Review.findById(reviewId)
        if(!review){
            throw new ApiError(404, 'review not found')
        }
    
        if(review.user.toString() !== userId) 
        {
            throw new ApiError(403, 'not authorized')
        }
    
        await Review.findByIdAndDelete(reviewId)
    
        return res
               .status(200)
               .json(new ApiResponse(200 , null , ' review deleted successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }

})

export const updateReview = asyncHandler(async(req,res)=> {
    try {
        const { reviewId } = req.params
        const userId = req.user.id
        const { rating , Comment } = req.body
    
        const review = await Review.findById(reviewId)
    
        if(!review){
            throw new ApiError(404, 'review not found')
        }
    
        if(review.user.toString() !== userId){
            throw new ApiError(403, 'forbidden')
        }
    
        if(rating) review.rating = rating
        if (Comment) review.Comment = Comment;
    
        await review.Save()
    
        return res
               .status(200)
               .json(new ApiResponse(200 , review, 'review updated successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})