import express from 'express'
import productController from '~/controllers/productController'

const router = express.Router()

router.post('/add-product', productController.AddProduct)

export default router
