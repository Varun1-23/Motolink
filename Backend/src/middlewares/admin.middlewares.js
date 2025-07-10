import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'

export const verifyAdmin = async(req, res , next) => {
    const token = req.cookies?.adminToken
    if(!token){
        throw new ApiError(401, 'unauthorized: no admin token')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'admin') throw new ApiError(403, 'forbidden')
        req.user = decoded
        next()
    } catch (error) {
        throw new ApiError(401, 'invalid token')
    }
}