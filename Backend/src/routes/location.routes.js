import express from 'express'
import { addLocation , getLocation, updateLocation, deleteLocation } from '../controllers/location.controller.js'
import { verifyAdmin } from '../middlewares/admin.middlewares.js'

const router = express.Router()

router.post('/add', addLocation )
router.get('/get', verifyAdmin, getLocation )
router.put('/:locationId', verifyAdmin, updateLocation )
router.delete('/:locationId', verifyAdmin, deleteLocation )

export default router