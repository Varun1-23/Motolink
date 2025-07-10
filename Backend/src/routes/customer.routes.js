import express from 'express'
import { getCustomerProfile, loginCustomer, logoutCustomer, registerCustomer, updateCustomerProfile } from '../controllers/authuser.controller'


const router = express.Router()

router.post('/register', registerCustomer)
router.post('/login', loginCustomer)
router.post('/logout', logoutCustomer)
router.get('/customerProfile', getCustomerProfile)
router.put('/updateProfile', updateCustomerProfile)

export default router