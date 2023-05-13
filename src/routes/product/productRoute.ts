import express from 'express'
import productController from 'src/controllers/product/productController'

const router = express.Router()

router.post('/add-product', productController.addProduct)

export default router
