import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import MechanicShop from '../models/mechanicShop.models.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const isProduction = process.env.NODE_ENV === 'production'

export const registerUser = asyncHandler (async (req, res) => {
    try {
        const { email , password , shopName , ownerName , phone , address, vehicleTypes , location , StateId , districtId } = req.body

        const existingUser = await MechanicShop.findOne ({ email })
        if(existingUser){
            throw new ApiError(400, "Email Already exists")
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await MechanicShop.create({ ownerName, email, password: hashed, shopName, phone, address, vehicleTypes , location , StateId , districtId }) 

        return res
               .status(200)
               .json(new ApiResponse(201, {
                id: user._id,
                email: user.email,
                shopName: user.shopName,
                ownerName: user.ownerName,
                phone: user.phone,
                address: user.phone,
                address: user.address,
                vehicleTypes: user.vehicleTypes,
                location: user.location,
                StateId: user.StateId,
                districtId: user.districtId,
               } , 'User Registered successfully')) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Registration failed")
    }
})

export const loginUser = asyncHandler(async(req, res) => {
    try {
        const { email , password} = req.body
        if(!email || !password){
            throw new ApiError(401 , "Please provide all fields")
        }

        const user = await MechanicShop.findOne({ email })
        if(!user){
            throw new ApiError (401, "invalid password")
        } 

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new ApiError(401, "invalid password")
        }
        const token = jwt.sign({
            id: user._id,
            email : user.email,
            role: 'mechanic'
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.cookie('mechanicToken', token,{
            httpOnly: true,
            secure: true,
            sameSite: isProduction ? "None" : "Lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res
               .status(200)
               .json(new ApiResponse(200, {userId: user._id, email: user.email}, "login successful")) 
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Login Failed")
    }
})

export const logoutUser =  asyncHandler(async(req,res)=> {
    res.clearCookie('mechanicToken')
    return res
           .status(200)
           .json(new ApiResponse(200 , null , 'logout successfully')) 
})