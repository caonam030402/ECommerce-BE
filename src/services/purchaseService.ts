import httpStatus from 'http-status'
import { purchasesStatus } from '../constants/purchase'
import { ApiError } from '../middlewares/errorHandlers'
import { Product } from '../models/productModel'
import { Purchase } from '../models/purchaseModel'
import { IProduct } from '../types/productType'
import { IPurchase } from '../types/purchaseType'
import { IUser } from '../types/userType'
import { io } from '..'
import { Promotion } from 'src/models/promotionModel'

export interface IRequest extends Request {
  user?: IUser
}

const purchaseService = {
  /**
   * Add to card
   * @param {string} product_id
   * @param {number} buy_count
   * @returns <Purchases>
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
   * @returns Purchases
   */
  getPurchasesWithStatus: async (status: number, user_id: string | null) => {
    const purchase =
      status === 0
        ? Purchase.find().populate('product').populate('user').sort({ updatedAt: -1 })
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
   * Buy Product
   * @param {string} purchase_ids
   * @returns Purchases
   */

  buyProduct: async (purchase_ids: string) => {
    await Purchase.updateMany({ _id: { $in: purchase_ids } }, { $set: { status: 1 } }, { returnOriginal: false })
    const purchases = await Purchase.find({ _id: { $in: purchase_ids } }).populate('product')

    if (!purchases) {
      throw new ApiError('Không tìm thấy sản phẩm', httpStatus.INTERNAL_SERVER_ERROR, 'message')
    }
    const productIds = purchases.map((product) => product._id)
    const buy_counts = purchases.map((product) => product.buy_count)

    const promotionsToUpdate = await Promotion.find({ product: { $in: productIds } })
    if (promotionsToUpdate) {
      promotionsToUpdate.forEach((promotion, index) => {
        const newSoldCount = promotion.sold + buy_counts[index]
        const newQuantity = promotion.quanlity - buy_counts[index]

        promotion.sold = newSoldCount
        promotion.quanlity = newQuantity
      })

      // Perform bulk update for promotions
      await Promotion.bulkWrite(
        promotionsToUpdate.map((promotion) => ({
          updateOne: {
            filter: { _id: promotion._id },
            update: { $set: { sold: promotion.sold, quanlity: promotion.quanlity } }
          }
        }))
      )
    }

    // Perform bulk update for promotions
    await Promotion.bulkWrite(
      promotionsToUpdate.map((promotion) => ({
        updateOne: {
          filter: { _id: promotion._id },
          update: { $set: { sold: promotion.sold, quanlity: promotion.quanlity } }
        }
      }))
    )

    return purchases
  },

  /**
   * Update purchase
   * @param {string} product_id
   * @param {IPurchase} bodyUpdate
   * @returns Purchase
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
