import express from 'express'
import { addService, deleteService, getServices, updateServices } from '../controllers/service.controller.js'
import { verifyToken } from '../middlewares/auth.middlewares.js'


const router = express.Router()

router.post('/add' , verifyToken, addService)
router.get('/get' , verifyToken, getServices)
router.put('/update' , verifyToken, updateServices)
router.delete('/delete' , verifyToken, deleteService)

export default router