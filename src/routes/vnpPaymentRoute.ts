import express from 'express'
import { upload } from '~/configs/storageUpload'
import { vnpPaymentController } from '~/controllers/vnpPaymentController'

const router = express.Router()

router.post('/create_payment_url', vnpPaymentController.createPaymentUrl)
router.get('/return_payment', vnpPaymentController.vnpReturn)

export default router
