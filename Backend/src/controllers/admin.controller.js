import Admin from '../models/admin.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mechanicShop from '../models/mechanicShop.models.js'
import User from '../models/user.models.js'
import ServiceRequest from '../models/serviceRequest.models.js'
import Review from '../models/review.models.js'

const isProduction = process.env.NODE_ENV === "production"

export const adminLogin = asyncHandler(async(req, res)=>{
        try {
    const { email , password} =  req.body
    
    const admin = await Admin.findOne({ email })
    if(!admin){
        throw new ApiError(404, 'admin not found')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch){
        throw new ApiError(401, 'invalid credentials')
    }
    const token = jwt.sign({ 
        id: admin._id, 
        email: admin.email,
        role: 'admin'
    }, process.env.JWT_SECRET , {
        expiresIn: '1d'
    })

    res.cookie('adminToken', token , {
        httpOnly: true,
        secure: true,
        sameSite: isProduction ? 'None' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    })

    return res
           .status(200)
           .json(new ApiResponse(200 , { adminId: admin._id , email: admin.email , role:'admin' } , 'admin fetched successfully')) 
        } catch (error) {
            console.error(error);
            throw new ApiError(500, 'internal server error')
        }
})

export const adminLogout = asyncHandler(async(req,res)=>{
    res.clearCookie('adminToken') 
    return res
           .status(200)
           .json(new ApiResponse(200, null , 'admin logout successfully')) 
})

export const getAdminDashboardStats = asyncHandler(async(req , res)=>{
    const totalUsers = await User.countDocuments()
    const totalMechanicShops = await mechanicShop.countDocuments()
    const totalServicerequest = await ServiceRequest.countDocuments()
    const totalCompletedRequest = await ServiceRequest.countDocuments({ status: 'completed'})

    return res
           .status(200)
           .json(new ApiResponse(200, 
            {totalUsers,
            totalMechanicShops,
            totalCompletedRequest,
            totalServicerequest,},
            'Dashboard stats fetched'
           )) 
})

export const softDeleteReview = asyncHandler(async(req , res)=> {
try {
        const {reviewId} = req.params
    
        const review = await Review.findById(reviewId)
        if(!review){
            throw new ApiError(404, 'review not found')
        }
    
        review.isDeleted = true
        await review.save()
    
        return res
               .status(200)
               .json(new ApiResponse(200, null, 'deleted successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})