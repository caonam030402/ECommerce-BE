import express from 'express'
import userController from '~/controllers/userController'

const router = express.Router()

router.get('/me', userController.getUser)

export default router
