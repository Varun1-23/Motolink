import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

export const verifyCustomer = async(req ,res)=> {
    const token = req.cookies?.customerToken
    if(!token){
        throw new ApiError(401, 'no customer token')
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(decoded.role !== 'customer') throw new ApiError(403, 'forbidden')
        req.user = decoded
        next()
    } catch (error) {
        console.error();
        throw new ApiError(500, 'internal server error')
    }
}