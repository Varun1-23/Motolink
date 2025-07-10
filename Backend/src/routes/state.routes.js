import express from 'express'
import { getAllStates, addState, updateState, deleteState } from '../controllers/state.controller.js'
import { verifyAdmin } from '../middlewares/admin.middlewares.js'


const router = express.Router()


router.post('/add', addState )
router.get('/get', verifyAdmin, getAllStates )
router.put('/:stateId', verifyAdmin, updateState )
router.delete('/:stateId', verifyAdmin, deleteState )

export default router