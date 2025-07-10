import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mechanicShopModels from "../models/mechanicShop.models.js";


export const addService = asyncHandler(async(req , res) => {
    try {
        const { name , price} = req.body

    if(!name || !price){
        throw new ApiError(400, 'Service name and Price reqruired')
    }

    const shop = await mechanicShopModels.findById(req.user.id)
    shop.services.push({ name , price})
    await shopServices.save()

    return res  
           .status(200)
           .json(new ApiResponse (200 , shop.services , 'services added')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(400, "service not added")
    }
})


export const getServices = asyncHandler(async(req,res) => {

  try {
      const shop = await mechanicShopModels.findById(req.user.id)

    return res
           .status(200)
           .json(new ApiResponse(200 , shop.services , 'services fetched')) 
  } catch (error) {
        console.error();
        throw new ApiError(400, "service not fetched")
  }
})


export const updateServices = asyncHandler(async(req,res) => {
    try {
        const { serviceId } = req.params
    const { name , price } = req.body

    const shop = await mechanicShopModels.findById(req.user.id)
    const Service = shop.services.id(serviceId)

    if(!Service){
        throw new ApiError(404, 'Service not found')
    }

    if(name) Service.name = name
    if(price) Service.price = price

    await shop.save()

    return res
           .status(200)
           .json(new ApiResponse(200 , shop.services , 'services updated' ))
    } catch (error) {
        console.error(error);
        throw new ApiError(404, 'Service not updated')
    }

})

export const deleteService = asyncHandler(async(req,res) => {
    try {
        const { serviceId } = req.params

    const shop = await mechanicShopModels.findById(req.user.id)
    const service = shop.services.id(serviceId)

    if(!service){
        throw new ApiError(404, 'service not found')
    }

    service.remove()
    await shop.save()

    return res
           .status(200)
           .json(new ApiResponse(200 , shop.services , 'service deleted')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(404, 'Service not deleted')
    }
})

