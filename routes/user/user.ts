

import express from 'express'
import { userController } from '../../controllers/user';

import authMiddleware from '../../middlewares/auth'

const router = express.Router()



router.get('/:username',userController.getUser)


export default router;