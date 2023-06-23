import express from 'express'
import authController from '../controllers/authController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refrestToken)
router.post('/logout', authController.logout)

export default router
