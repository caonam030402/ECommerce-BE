import httpStatus from 'http-status'
import { purchasesStatus } from '~/constants/purchase'
import { ApiError } from '~/middlewares/errorHandlers'
import { Product } from '~/models/productModel'
import { Purchase } from '~/models/purchaseModel'
import { IProduct } from '~/types/productType'
import { IPurchase } from '~/types/purchaseType'
import { IUser } from '~/types/userType'
import { io } from '..'

export interface IRequest extends Request {
  user?: IUser
}

const purchaseService = {
  /**
   * Add to card
   * @param {string} product_id
   * @param {number} buy_count
   * @returns {Promise<Purchases>}
   */
  addToCart: async ({ product_id, buy_count }: { product_id: string; buy_count: number }, user: IUser) => {
    const product = (await Product.findById(product_id)) as IProduct
    const purchase = await Purchase.findOne({ user: user?._id, product: product._id, status: -1 })

    const purchaseArray: IPurchase[] = []
    if (purchase) {
      purchase.buy_count += buy_count
      const purchaseSave = await purchase.save()
      purchaseArray.push(purchaseSave)
    } else {
      const newPurchase: IPurchase = await Purchase.create({
        buy_count: buy_count,
        price: product.price,
        price_before_discount: product.price_before_discount,
        status: -1,
        user: user?._id,
        product: product
      })
      purchaseArray.push(newPurchase)
    }

    return purchaseArray[0]
  },

  /**
   * Add to card
   * @param {string} user_id
   * @param {number} status
   * @returns {Promise<Purchases>}
   */
  getPurchasesWithStatus: async (status: number, user_id: string | null) => {
    const purchase =
      status === 0
        ? Purchase.find({ user: user_id }).populate('product').populate('user').sort({ updatedAt: -1 })
        : Purchase.aggregate([
            user_id ? { $match: { status: status, user: user_id } } : { $match: { status: status } },
            {
              $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails'
              }
            },
            { $unwind: '$productDetails' },
            {
              $addFields: {
                product: '$productDetails'
              }
            },
            {
              $project: {
                productDetails: 0
              }
            },
            status !== -1 ? { $sort: { updatedAt: -1 } } : { $sort: { createdAt: -1 } }
          ])
    return purchase
  },

  /**
   * Add to card
   * @param {string} purchase_ids
   * @returns {Promise<Purchases>}
   */

  buyProduct: async (purchase_ids: string) => {
    await Purchase.updateMany({ _id: { $in: purchase_ids } }, { $set: { status: 1 } }, { returnOriginal: false })
    const purchases = await Purchase.find({ _id: { $in: purchase_ids } }).populate('product')
    if (!purchases) {
      throw new ApiError('Không tìm thấy sản phẩm', httpStatus.INTERNAL_SERVER_ERROR, 'message')
    }

    io.emit('purchases')
    io.emit('count', 3)
    return purchases
  },

  /**
   * Add to card
   * @param {string} product_id
   * @param {IPurchase} bodyUpdate
   * @returns {Promise<Purchase>}
   */

  updatePurchase: async (product_id: string, bodyUpdate: IPurchase, purchase_id: string) => {
    let query = {}

    if (product_id) {
      query = { product: product_id }
    } else if (purchase_id) {
      query = { _id: purchase_id }
    }
    const purchase = await Purchase.updateMany(query, bodyUpdate)

    return purchase
  }
}
export default purchaseService
