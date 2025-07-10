import express from 'express'
import { getDistrcitsByState, addDistrict, updateDistricts, deleteDistricts } from '../controllers/district.controller.js'
import { verifyAdmin } from '../middlewares/admin.middlewares.js'


const router = express.Router()


router.post('/add', addDistrict )
router.get('/get', verifyAdmin, getDistrcitsByState )
router.put('/:districtId', verifyAdmin, updateDistricts )
router.delete('/:districtId', verifyAdmin, deleteDistricts )

export default router