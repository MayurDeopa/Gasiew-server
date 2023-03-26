import express from 'express'
import { imagekitController } from '../../controllers/imagekit';


const router = express.Router()


router.get('/auth',imagekitController.auth)

export default router;