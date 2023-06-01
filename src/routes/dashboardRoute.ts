import express from 'express'
import authController from 'src/controllers/authController'
import dashboardController from '~/controllers/dashboardController'

const router = express.Router()

router.get('/quanlity-overview', dashboardController.quanlityOverview)
router.get('/quantity-sold-overtime', dashboardController.quantitySoldOverTime)

export default router
