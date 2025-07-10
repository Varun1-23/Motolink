import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'


export const verifyToken = async (req , res , next) => {
    const token = req.cookies?.mechanicToken
    if(!token)
    {
        throw new ApiError(401, 'Unauthorized: no mechanic Token')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'mechanic') throw new ApiError(403, 'forbidden')
        req.user = decoded
        next()
    } catch (error) {
        throw new ApiError(401, 'Invalid mechanic Token')
    }
}