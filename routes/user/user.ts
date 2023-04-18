

import express from 'express'
import { userController } from '../../controllers/user';

import authMiddleware from '../../middlewares/auth'

const router = express.Router()



router.get('/:username',userController.getUser)

router.get('/account/id',authMiddleware,userController.getUserById)

router.post('/account/update/avatar',authMiddleware,userController.updateProfilePicture)

router.post('/account/update/banner',authMiddleware,userController.updateBanner)


export default router;