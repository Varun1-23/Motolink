import mechanicShopModels from "../models/mechanicShop.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";


export const uploadWorkImage = asyncHandler(async(req, res)=> {
    try {
        const userId = req.user.userId
        if(!req.file){
            throw new ApiError(400, "No file uploaded")
        }

        const uploaded = await uploadOnCloudinary(req.file.path, 'workImages')
        if(!uploaded){
            throw new ApiError(400, "Failed to upload")
        }

        const shop = await mechanicShopModels.findByIdAndUpdate(userId,
            {
                $push: {
                    workImages: uploaded.url
                }
            },
            {
                new: true
            }
        ) 
        return res
               .status(200)
               .json(new ApiResponse(200 , shop.workImages , 'Image uploaded')) 
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message})
    }
})

export const getWorkImages = asyncHandler(async(req,res) => {
   try {
     const userId = req.user.id
    const shop = await mechanicShopModels.findById(userId)

    if(!shop){
        throw new ApiError(404, 'Shop not found')
    }

    return res
           .status(200)
           .json(new ApiResponse(200 , shop.workImages , "fetched successfully")) 
}
    catch (error) {
        console.error(error);
        throw new ApiError(500, error.message)
   }

})

export const deleteWorkImage = asyncHandler(async(req,res)=> {
    try {
            const userId = req.user.id
    const { imageUrl }  = req.body

    if(!imageUrl){
        throw new ApiError(400, 'Image URL is required')
    }

    const publicId = imageUrl.spilt('/').pop().spilt('.')[0]

    await deleteFromCloudinary(`workImages/${publicId}`)

    const updatedShop = await mechanicShopModels.findByIdAndUpdate(userId,
        {
            $pull: {
                workImages: imageUrl
            }
        },
        {
            new: true
        }
    )

    return res
           .status(200)
           .json(new ApiResponse(200, updatedShop.workImages, 'Image deleted successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})
