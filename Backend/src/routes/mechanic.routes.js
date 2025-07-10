import express from 'express'
import { filteredShops, getAllApprovedShops, getMechanicProfile } from '../controllers/mechanic.controller.js'
import { updateMechanicProfile } from '../controllers/mechanic.controller.js'
import  {verifyToken} from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.get('/profile' , verifyToken ,getMechanicProfile)
router.put('/update', verifyToken, updateMechanicProfile)
router.get('/approvedShop',  getAllApprovedShops)
router.get('/filterShop',  filteredShops)


export default router