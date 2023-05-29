import express from 'express'
import productController from 'src/controllers/product/productController'
import { upload } from '~/configs/storageUpload'

const router = express.Router()

router.post('/add-product', upload.any(), productController.addProduct)
router.get('/:id', productController.getProductDetail)
router.get('/', productController.getProducts)

export default router
