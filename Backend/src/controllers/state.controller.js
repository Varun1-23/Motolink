import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import State from '../models/state.models.js'

export const addState = asyncHandler(async(req , res) => {
   try {
     const { name  } = req.body
 
     if(!name){
         throw new ApiError(400, 'state is required')
     }
 
     const state = await State.create({ name })
 
     return res
            .status(200)
            .json(new ApiResponse(200, state, 'state is added')) 
   } catch (error) {
     console.error(error);
     throw new ApiError(500, 'internal server error')
   }
})

export const getAllStates = asyncHandler(async(req , res) => {
try {
            const states = await State.find()
            return res
                   .status(200)
                   .json(new ApiResponse(200, {states}, 'states fetched')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})

export const updateState = asyncHandler(async(req , res)=> {
    try {
        const { stateId } = req.params
        const { name } = req.body
    
        const state = await State.findByIdAndUpdate( stateId , { name } , { new: true, runValidators: true} )
    
        if(!state){
            throw new ApiError(404, 'state not found')
        }
    
    
        return res
               .status(200)
               .json(new ApiResponse(200 , state , 'state is updated')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})

export const deleteState = asyncHandler(async(req , res) => {
   try {
     const { stateId } = req.params
 
     const state = await State.findByIdAndDelete(stateId)
 
     if(!state){
         throw new ApiError(404, 'state is not found')
     }
 
     return res
            .status(200)
            .json(new ApiResponse(200, null , 'state is deleted')) 
   } catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
   }
})