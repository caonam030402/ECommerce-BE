import express from 'express'
import promotionController from 'src/controllers/promotionController'

const router = express.Router()

router.post('/add-promotion', promotionController.addPromotion)
router.get('/', promotionController.getPromotions)
router.get('/time-slots', promotionController.getTimeSlots)

export default router
