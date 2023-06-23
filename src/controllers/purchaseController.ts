import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { Purchase } from '../models/purchaseModel'
import purchaseService from '../services/purchaseService'
import { IUser } from '../types/userType'
import successResponse from '../utils/utils'

interface IRequest extends Request {
  user?: IUser
}

const purchaseController = {
  addToCart: asyncHandler(async (req: IRequest, res) => {
    const { product_id, buy_count } = req.body
    if (req.user !== undefined) {
      const purchase = await purchaseService.addToCart({ product_id, buy_count }, req.user)
      res.status(httpStatus.OK).json(successResponse('Thêm sản phẩm vào giỏ hàng thành công', purchase))
    }
  }),

  getUserPurchase: asyncHandler(async (req: IRequest, res) => {
    const status = req.query.status
    const user = req.user
    const purchaseList = await purchaseService.getPurchasesWithStatus(Number(status), user?._id)
    res.status(httpStatus.OK).json(successResponse('Lấy đơn hàng thành công', purchaseList))
  }),

  deletePurchase: asyncHandler(async (req, res) => {
    const _ids = req.body
    const purchase = await Purchase.deleteMany({ _id: { $in: _ids } })

    res
      .status(httpStatus.OK)
      .json(successResponse(`Xóa ${purchase.deletedCount} đơn thành công $`, { delete_count: purchase.deletedCount }))
  }),

  buyProduct: asyncHandler(async (req: IRequest, res) => {
    const purchasesBody = req.body
    const purchase_ids = purchasesBody.map((purchase: any) => purchase.purchase_id)
    const purchases = purchaseService.buyProduct(purchase_ids)
    res.status(httpStatus.OK).json(successResponse('Mua thành công', purchases))
  }),

  updatePurchase: asyncHandler(async (req, res) => {
    const { product_id, purchase_id, ...updateBody } = req.body
    const purchase = await purchaseService.updatePurchase(product_id, updateBody, purchase_id)
    res.status(httpStatus.OK).json(successResponse('Mua hàng thành công', purchase))
  }),

  getPurchasesWithParam: asyncHandler(async (req, res) => {
    const status = req.params.status
    const purchases = await purchaseService.getPurchasesWithStatus(Number(status), null)
    res.status(httpStatus.OK).json(successResponse('Lấy đơn mua thành công', purchases))
  })
}

export default purchaseController
