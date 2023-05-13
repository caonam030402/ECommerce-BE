import express from 'express'
import productController from '~/controllers/productController'

const router = express.Router()

router.post('/add-product', productController.addProduct)
router.post('/add-category', productController.addCategory)

export default router
