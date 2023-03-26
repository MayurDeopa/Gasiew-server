import express from 'express'
import { auth } from '../../controllers'
import authMiddleware from '../../middlewares/auth'

const router = express.Router()


router.post('/login',auth.login)

router.post('/register',auth.register)

router.post('/bootstrap',authMiddleware,auth.bootstrapUser)

export default router;