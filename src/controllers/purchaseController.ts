import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
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
    const user = req.user
    const purchase = await Purchase.find({ user: user?._id }).populate('product')
    res.status(httpStatus.OK).json(successResponse('Lấy đơn hàng thành công', purchase))
  }),
  buyProduct: asyncHandler(async (req: IRequest, res) => {
    const user = req.user
    const { product_id, buy_count } = req.body
    const product = (await Product.findOne(product_id)) as IProduct

    const newPurchase: IPurchase = await Purchase.create({
      buy_count: buy_count,
      price: product.price,
      price_before_discount: product.price_before_discount,
      status: 0,
      user: user?._id,
      product: product
    })

    res.status(httpStatus.OK).json(successResponse('Mua thành công', newPurchase))
  })
}

export default purchaseController
