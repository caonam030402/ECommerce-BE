import express from 'express'
import authController from '../controllers/authController'
import dashboardController from '../controllers/dashboardController'

const router = express.Router()

router.get('/quanlity-overview', dashboardController.quanlityOverview)
router.get('/quantity-sold-overtime', dashboardController.quantitySoldOverTime)
router.get('/notification', dashboardController.notificationOder)

export default router
