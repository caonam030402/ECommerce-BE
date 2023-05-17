import express from 'express'
import authController from 'src/controllers/authController'
import purchaseController from '~/controllers/purchaseController'
import authMiddleware from '~/middlewares/authMiddleware'

const router = express.Router()

router.post('/add-to-cart', authMiddleware.verifyToken, purchaseController.addToCart)
router.post('/buy-products', authMiddleware.verifyToken, purchaseController.buyProduct)
router.get('/', authMiddleware.verifyToken, purchaseController.getPurchase)

export default router
