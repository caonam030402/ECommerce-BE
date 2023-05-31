import express from 'express'
import productController from 'src/controllers/product/productController'
import { upload } from '~/configs/storageUpload'

const router = express.Router()

router.post('/add-product', upload.any(), productController.addProduct)
router.put('/update-product', upload.any(), productController.updateProduct)
router.get('/:id', productController.getProductDetail)
router.get('/:id', productController.getAProduct)
router.get('/', productController.getProducts)
router.delete('/delete-product/:id', productController.deleteProducts)

export default router
