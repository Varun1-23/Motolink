import express from 'express'
import { cancelRequest, createServiceRequest, getAllServiceRequest, getRequestsForShop, getUserRequests, updateRequestStatus } from '../controllers/serviceRequest.controller.js'



const router = express.Router()


router.post('/create', createServiceRequest)
router.get('/getRequestShop', getRequestsForShop)
router.put('/:requestId', updateRequestStatus)
router.get('/getUserRequest', getUserRequests)
router.post('/:requestId', cancelRequest)
router.get('/adminRequest', getAllServiceRequest)


export default router