import express from 'express'
import categoryController from '../../controllers/product/categoryController'

const router = express.Router()

router.post('/add-category', categoryController.addCategory)
router.get('/', categoryController.getCaregory)

export default router
