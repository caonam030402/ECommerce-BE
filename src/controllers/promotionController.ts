import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import successResponse from 'src/utils/utils'
import { promotionService } from 'src/services/promotionService'

const promotionController = {
  getPromotions: asyncHandler(async (req, res) => {
    const promotionId = req.query.promotionId

    const onPromotion = promotionId
      ? await promotionService.getPromotionWithId(promotionId as string)
      : await promotionService.getAllPromotion()
    res.status(httpStatus.OK).json(successResponse('Lấy sản phẩm khuyến mãi thành công', onPromotion))
  }),

  addPromotion: asyncHandler(async (req, res) => {
    const promotion = await promotionService.createPromotions(req.body)
    res.status(httpStatus.OK).json(successResponse('Thêm khuyến mãi thành công', promotion))
  }),

  getTimeSlots: asyncHandler(async (req, res) => {
    const timeSlots = await promotionService.getAllTimeSlots()
    res.status(httpStatus.OK).json(successResponse('Lấy khung giờ thành công', timeSlots))
  })
}

export default promotionController
