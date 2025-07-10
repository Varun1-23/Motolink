import express from 'express'
import { upload } from '../middlewares/multer.middlewares'
import { deleteWorkImage, getWorkImages, uploadWorkImage } from '../controllers/workImage.controller'
import { verifyToken } from '../middlewares/auth.middlewares'


const router = express.Router()

router.post('/upload' , verifyToken, upload.single('workImages') , uploadWorkImage )
router.get('/get' , verifyToken,  getWorkImages )
router.delete('/delete' , verifyToken,  deleteWorkImage )


export default router