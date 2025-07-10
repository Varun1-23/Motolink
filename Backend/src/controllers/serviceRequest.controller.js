import ServiceRequest from '../models/serviceRequest.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import User from '../models/user.models.js'


//user create service request

export const createServiceRequest = asyncHandler(async(req , res)=> {
    try {
        const userId = req.user.userId
        const {
            shopId,
            vehicleId,
            description,
            media,
            isEmergency=false,
            scheduledDate,
            scheduledTimeSlot
        } = req.body
    
        if(!shopId || !vehicleId || !description){
            throw new ApiError(400, 'All fields are required')
        }

        if(!isEmergency && (!scheduledDate || !scheduledTimeSlot))
        {
            throw new ApiError(400, 'Scheduled date and time are required for non-emergency bookings')
        }

        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(404, 'not found')
        }

        const selectedVehicle = user.vehicles.id(vehicleId)
        if(!selectedVehicle){
            throw new ApiError(404, 'vehicle not found')
        }

        const newRequest = await ServiceRequest.create({
            userId,
            shopId,
            vehicleId,
            description,
            media,
            isEmergency,
            scheduledDate,
            scheduledTimeSlot
        })

        return res
               .status(200)
               .json(new ApiResponse(200, newRequest , 'successfully created')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})


// view for mechanic

export const getRequestsForShop = asyncHandler(async(req , res)=> {
    try {
        const mechanicId = req.user.id

        const shopRequests = await ServiceRequest.findById({ shopId: mechanicId}).populate('userId', 'name')

        return res
               .status(200)
               .json(new ApiResponse(200 , shopRequests , 'successfully fetched')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})

// mechanic update request status

export const updateRequestStatus = asyncHandler(async(req , res)=> {
try {
        const { requestId } = req.params
        const { status } = req.body
        const shopId = req.user.id
    
        const allowedStatus = ['pending' , 'accepted' , 'repairing' , 'ready' , 'completed' , 'cancelled']
        if(!allowedStatus.includes(status)){
            throw new ApiError(400, 'invalid status update')
        }
    
        const request = await ServiceRequest.findOneAndUpdate({
            _id:requestId, MechanicShop: shopId
        },
        {
            status
        },
        {
            new: true
        }
        )
    
        if(!request){
            throw new ApiError(404, 'service request not found')
        }
    
        return res
               .status(200)
               .json(new ApiResponse(200 , request, 'updated')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})

// user view

export const getUserRequests = asyncHandler(async(req , res)=> {
   try {
     const userId = req.user.id
 
     const requests = await ServiceRequest.find({userId}).populate('shopId' , 'shopName')
     if(!requests){
         throw new ApiError(400, 'Not found')
     }
 
     return res
            .status(200)
            .json(new ApiResponse(200 , requests, 'fetched')) 
   } catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
   }
})

// user cancel request
export const cancelRequest = asyncHandler(async(req , res)=>{
try {
        const { requestId } = req.params
        const userId = req.user.id
    
        const request = await ServiceRequest.findByOne({ _id: requestId, userId})
    
        if(!request){
            throw new ApiError(404,'not found')
        }
    
        request.status='cancelled'
        await request.save()
    
        return res
               .status(200)
               .json(new ApiResponse(200, request, 'canceled')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})


// admin see all request

export const getAllServiceRequest = asyncHandler(async(req , res)=> {
   try {
     const requests = await ServiceRequest.find()
     .populate('userId' , 'name email')
     .populate('shopId', 'shopName email')
 
     return res
            .status(200)
            .json(new ApiResponse(200, requests, 'fetched successfully')) 
   } catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
   }
})
