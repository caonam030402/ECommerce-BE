import express from 'express'
import authController from 'src/controllers/authController'
import authMiddleware from '~/middlewares/authMiddleware'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refrest-token', authController.refrestToken)
router.post('/logout', authController.logout)

export default router
