import express from 'express'
import userController from '~/controllers/userController'
import authMiddleware from '~/middlewares/authMiddleware'

const router = express.Router()

router.get('/me', authMiddleware.verifyToken, userController.getUser)
router.put('/user', authMiddleware.verifyToken, userController.updateUser)

export default router
