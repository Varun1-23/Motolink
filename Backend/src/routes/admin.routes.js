import express from 'express'
import { adminLogin, adminLogout, getAdminDashboardStats, softDeleteReview } from '../controllers/admin.controller'




const router = express.Router()

router.post('/login', adminLogin )
router.post('/logout', adminLogout )
router.get('/getDashboard', getAdminDashboardStats)
router.delete('/:reviewId', softDeleteReview)

export default router                 