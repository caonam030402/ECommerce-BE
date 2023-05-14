import express from 'express'
import productController from 'src/controllers/product/productController'

const router = express.Router()

router.post('/add-product', productController.addProduct)
router.get('/:id', productController.getProductDetail)
router.get('/', productController.getProducts)

export default router
