

import express from 'express'
import { postController } from '../../controllers/post';

import authMiddleware from '../../middlewares/auth'

const router = express.Router()

router.get('/',postController.getPosts)

router.get('/id/:postId',postController.getPostById)

router.post('/create',authMiddleware,postController.createPost)

router.post('/comment/post',authMiddleware,postController.postComment)

export default router;