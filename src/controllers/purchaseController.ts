import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { purchasesStatus } from '~/constants/purchase'
import { Product } from '~/models/productModel'
import { Purchase } from '~/models/purchaseModel'
import purchaseService from '~/services/purchaseService'
import { IProduct } from '~/types/productType'
import { IPurchase } from '~/types/purchaseType'
import { IUser } from '~/types/userType'
import successResponse from '~/utils/utils'
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

  getPurchase: asyncHandler(async (req: IRequest, res) => {
    const status = req.query.status
    const user = req.user
    const purchaseList = await purchaseService.getPurchasesWithStatus(user?._id, Number(status))
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
    await Purchase.updateMany({ _id: { $in: purchase_ids } }, { $set: { status: 1 } }, { returnOriginal: false })
    const purchases = await Purchase.find({ _id: { $in: purchase_ids } }).populate('product')
    res.status(httpStatus.OK).json(successResponse('Mua thành công', purchases))
  })
}

export default purchaseController
