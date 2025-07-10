import District from '../models/district.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const addDistrict = asyncHandler(async(req , res)=> {
try {
        const { name , stateId } = req.body
        if(!name || !stateId){
            throw new ApiError(400, 'all fields are required')
        }   
    
        const district = await District.create({ name , state: stateId}) 
        
        return res
               .status(200)
               .json(new ApiResponse(200 , district , 'district is added')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})

export const getDistrcitsByState = asyncHandler(async( req , res)=> {

  try {
      const { stateId } = req.params
  
      const district = await District.find({ state: stateId})
      return res
             .status(200)
             .json(new ApiResponse(200 , district , 'fetched successfully')) 
  } catch (error) {
    console.error();
    throw new ApiError(500, 'internal server error')
  }
})

export const updateDistricts = asyncHandler(async(req , res)=> {
    try {
        const { districtId } = req.params
    
        const { name , stateId } = req.body
        
        const district = await District.findById(districtId)
    
        if(!district){
            throw new ApiError(404, 'not found')
        }
    
        if(name) district.name = name
        if(stateId) district.stateId = stateId
    
        await district.save()
    
        return res
               .status(200)
               .json(new ApiResponse(200 , district , 'updated')) 
    
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }

})

export const deleteDistricts = asyncHandler(async(req , res)=> {
    try {
        const { districtId } = req.params
    
        const district = await District.findById(districtId)
    
        await district.remove()
        District.save()
    
        return res
               .status(200)
               .json(new ApiResponse(200, null , 'deleted')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})