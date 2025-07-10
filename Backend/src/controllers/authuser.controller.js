import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from '../models/user.models.js'
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === 'production'

export const registerCustomer = asyncHandler(async(req , res)=> {
try {
    const { name, email , phone , password } = req.body

    const existingUser = await User.findOne({ email })
    if(existingUser){
        throw new ApiError(400, 'already exists')
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashed,
        phone,
    })
    return res
           .status(200)
           .json(new ApiResponse(200, user , 'registered successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})

export const loginCustomer = asyncHandler(async(req , res)=> {
    try {
        const { email , password} = req.body

        if(!email || !password){
            throw new ApiError(401, 'provide all fields')
        }
        const user = await User.findOne({ email })
        if(!user){
            throw new ApiError(404, 'not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new ApiError(401, 'invalid password')
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: 'customer'
        }, process.env.JWT_SECRET, { expiresIn: '1d'})

        res.cookie('customerToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: isProduction ? "None" : "Lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res
               .status(200)
               .json(new ApiResponse(200, {userId: user._id, email: user.email}, 'login successfull')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
})


export const logoutCustomer = asyncHandler(async(req, res)=> {
    res.clearCookie('customerToken')
    return res
           .status(200)
           .json(new ApiResponse(200, null , 'logout successfully')) 
})

export const getCustomerProfile = asyncHandler(async(req , res)=> {
    try {
        const userId = req.user.id

        const user = await User.findById(userId).select('-password')

        if(!user){
            throw new ApiError(404, 'user not found')
        }

        return res
               .status(200)
               .json(new ApiResponse(200 , user , 'profile fetched'))  
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'internal server error')
    }
}) 

export const updateCustomerProfile = asyncHandler(async(req , res)=> {
try {
        const updates = req.body
        const userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, updates , {
            new: true,
            runValidators: true
        }).select('-password')
    
        if(!user){
            throw new ApiError(404,'not updated')
        }
    
        return res
               .status(200)
               .json(new ApiResponse(200, user , 'updated successfully')) 
} catch (error) {
    console.error(error);
    throw new ApiError(500, 'internal server error')
}
})