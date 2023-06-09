import express from 'express'
import purchaseController from '~/controllers/purchaseController'
import authMiddleware from '~/middlewares/authMiddleware'

const router = express.Router()

router.post('/add-to-cart', authMiddleware.verifyToken, purchaseController.addToCart)
router.post('/buy-products', authMiddleware.verifyToken, purchaseController.buyProduct)
router.put('/update-purchase', purchaseController.updatePurchase)
router.get('/', authMiddleware.verifyToken, purchaseController.getPurchase)
router.get('/:status', purchaseController.getPurchasesWithParam)
router.delete('/', authMiddleware.verifyToken, purchaseController.deletePurchase)

export default router
