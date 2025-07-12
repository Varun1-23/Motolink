import express from 'express'
import { adminApprovedShops, approveShop, filteredShops, getAllApprovedShops, getAllMechanicProfiles, getMechanicProfile } from '../controllers/mechanic.controller.js'
import { updateMechanicProfile } from '../controllers/mechanic.controller.js'
import  {verifyToken} from '../middlewares/auth.middlewares.js'
import { verifyAdmin } from '../middlewares/admin.middlewares.js'

const router = express.Router()

router.get('/profile' , verifyToken ,getMechanicProfile)
router.put('/update', verifyToken, updateMechanicProfile)
router.put('/update/:shopId', verifyAdmin, approveShop)
router.get('/approvedShop',  getAllApprovedShops)
router.get('/allShops',  getAllMechanicProfiles)
router.get('/adminApproved',  adminApprovedShops)
router.get('/filterShop',  filteredShops)


export default router