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
    
        const districts = await District.create({ name , stateId: stateId}) 
        
        return res
               .status(200)
               .json(new ApiResponse(200 , {name: districts.name, stateId: districts.stateId} , 'district is added')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})

export const getDistrcitsByState = asyncHandler(async( req , res)=> {

  try {
      const { stateId } = req.params

      const district = await District.find({ stateId: stateId})
      return res
             .status(200)
             .json(new ApiResponse(200 , district , 'fetched successfully')) 
  } catch (error) {
    console.error();
    throw new ApiError(500, 'internal server error')
  }
})

export const getAllDistricts = asyncHandler(async (req, res) => {
  try {
    const districts = await District.find().populate('stateId', 'name');
    return res
      .status(200)
      .json(new ApiResponse(200,  {districts} , 'all districts fetched'));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error');
  }
});


export const updateDistricts = asyncHandler(async(req , res)=> {
    try {
        const { districtId } = req.params
    
        const { name , stateId } = req.body
        
        const district = await District.findByIdAndUpdate(districtId, { name , stateId: stateId}, {new: true , runValidators: true})
    
        if(!district){
            throw new ApiError(404, 'not found')
        }
       
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
    
        const district = await District.findByIdAndDelete(districtId)
        return res
               .status(200)
               .json(new ApiResponse(200, null , 'deleted')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})