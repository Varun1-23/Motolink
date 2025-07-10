import mechanicShop from "../models/mechanicShop.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Review from '../models/review.models.js'

export const getMechanicProfile = asyncHandler(async(req , res) => {
try {
        const user = await mechanicShop.findById(req.user.id).select('-password')
        if(!user){
            throw new ApiError(404, "user not found")
        }
    
        return res
               .status(200)
               .json(new ApiResponse(200 , user , 'profile fetched successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
}) 


export const updateMechanicProfile = asyncHandler(async(req, res)=> {
try {
        const updates = req.body
    
        const user = await mechanicShop.findByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true
        }).select('-password')
    
        if(!user){
            throw new ApiError(404, 'mechanic not found')
        }
    
        return res
               .status(200)
               .json(new ApiResponse(200, user, 'updated successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500,'internal server error')
}
})


export const getAllApprovedShops = asyncHandler(async(req , res)=> {
    try {
        const shops = await mechanicShop.find({ isApproved: true, isBlocked: false})
        .populate('location' , 'name')


        const shopWithReviews = await Promise.all(
            shops.map(async(shop) =>{
                const reviews = await Review.find({ mechanicShop: shop._id }).populate( 'user' , 'name')
                return{...shop.toObject(), reviews}
            })
        )

        return res
               .status(200)
               .json(new ApiResponse(200, shopWithReviews , 'fetched successfully')) 

    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
}) 

export const filteredShops = asyncHandler(async (req , res)=> {
    try {
        const { location , vehicleTypes  , services } = req.query
        let query = { isApproved: true , isBlocked: false}

        if(location) query.location = location
        if(vehicleTypes) query.vehicleTypes = vehicleTypes
        if(services){
            query.services = { $elemMatch: {
                name: services
            } }
        }

        const shops = await mechanicShop.find(query).populate('location', 'name')

        const shopWithReviews = await Promise.all(
            shops.map(async(shop)=>{
                const reviews = await Review.find({mechanicShop:shop._id}).populate('user','name')
                return{...shop.toObject(), reviews}
            })
        )

        return res
               .status(200)
               .json(new ApiResponse(200, shopWithReviews, 'filtered successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})