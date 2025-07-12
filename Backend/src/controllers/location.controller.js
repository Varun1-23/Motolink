import Location from '../models/location.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const addLocation = asyncHandler(async(req , res) => {
try {
            const { name , districtId , StateId} = req.body
            console.log(req.body);
            
            if(!name || !districtId || !StateId){
                throw new ApiError(400, 'all fields are required')
            }
    
            const location = await Location.create({ name, StateId: StateId, districtId: districtId })
    
            return res
                   .status(200)
                   .json(new ApiResponse(200 , {name: location.name, StateId: location.StateId, districtId:location.districtId} , 'location added successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}

})

export const getLocation = asyncHandler(async(req , res)=> {
    try {
        
        const location = await Location.find()
        .populate('districtId' , 'name')
        .populate('StateId' , 'name')

        return res
               .status(200)
               .json(new ApiResponse(200, location , 'fetched successfully')) 


    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})

export const getLocationByDistrict = asyncHandler(async(req , res)=> {
    try {
        const { districtId } = req.params
        const location = await Location.find({ districtId: districtId })
        return res
               .status(200)
               .json(new ApiResponse(200, location, 'fetched successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})

export const updateLocation = asyncHandler(async(req , res)=> {
   try {
     const { locationId } = req.params
 
     const { name, districtId , StateId } = req.body
 
     const location = await Location.findById(locationId)
 
     if(!location){
         throw new ApiError(404, 'not found')
     }
 
     if(name) location.name = name
     if(districtId) location.districtId = districtId
     if(StateId) location.StateId = StateId
 
     await location.save()
 
     return res
            .status(200)
            .json(new ApiResponse(200 , location , 'updated')) 
   } catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
   }
})

export const deleteLocation = asyncHandler(async(req , res)=> {
    try {
        const { locationId } = req.params
    
        const location = await Location.findById(locationId)
    
        if(!location){
            throw new ApiError(404, 'not found')
        }
    
        await location.remove()
    
        return res
               .status(200)
               .json(new ApiResponse(200, null , 'deleted')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})