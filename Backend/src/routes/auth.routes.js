import express from 'express'
import { loginUser , logoutUser, registerUser } from '../controllers/authmechanic.controller.js'


const router = express.Router()

router.post('/login' , loginUser)
router.post('/register' , registerUser)
router.post('/logout' , logoutUser)

export default router