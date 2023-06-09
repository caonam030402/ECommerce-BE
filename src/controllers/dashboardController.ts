import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { Purchase } from '~/models/purchaseModel'
import dashboardService from '~/services/dashboardService'
import successResponse from '~/utils/utils'

const dashboardController = {
  quanlityOverview: asyncHandler(async (req, res) => {
    const totalAmoutSold = await dashboardService.totalAmoutSold()
    const totalProductSold = await dashboardService.totalProductSold()
    const totalProduct = await dashboardService.totalProduct()
    const totalUser = await dashboardService.totalUser()
    console.log(totalUser)
    res.status(httpStatus.OK).json(
      successResponse('Lấy thông tin tổng quan thành công', {
        totalAmoutSold: totalAmoutSold[0],
        totalProduct: totalProduct[0],
        totalProductSold: totalProductSold[0],
        totalUser: totalUser[0]
      })
    )
  }),
  quantitySoldOverTime: asyncHandler(async (req, res) => {
    const purchase = await dashboardService.quantitySoldOverTime()
    res.status(httpStatus.OK).json(successResponse('Lấy sản phẩm bán thành công', purchase))
  }),
  notificationOder: asyncHandler(async (req, res) => {
    const purchase = await dashboardService.notificationOder()
    res.status(httpStatus.OK).json(successResponse('Lấy sản phẩm bán thành công', purchase))
  })
}

export default dashboardController
