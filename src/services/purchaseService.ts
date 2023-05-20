import { purchasesStatus } from '~/constants/purchase'
import { Product } from '~/models/productModel'
import { Purchase } from '~/models/purchaseModel'
import { IProduct } from '~/types/productType'
import { IPurchase } from '~/types/purchaseType'
import { IUser } from '~/types/userType'

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
    const purchase = await Purchase.findOne({ user: user?._id, product: product._id })

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
  getPurchasesWithStatus: async (user_id: string, status: number) => {
    let purchaseList: IPurchase[] = []
    switch (Number(status)) {
      case purchasesStatus.inCart:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.inCart }).populate('product')
        break
      case purchasesStatus.waitForConfirmation:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.waitForConfirmation }).populate(
          'product'
        )
        break
      case purchasesStatus.delivered:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.delivered }).populate('product')
        break
      case purchasesStatus.cancelled:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.cancelled }).populate('product')
        break
      case purchasesStatus.waitForGetting:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.waitForGetting }).populate(
          'product'
        )
        break
      case purchasesStatus.inProgress:
        purchaseList = await Purchase.find({ user: user_id, status: purchasesStatus.inProgress }).populate('product')
        break
      case purchasesStatus.all:
        purchaseList = await Purchase.find({ user: user_id, status: { $ne: purchasesStatus.inCart } }).populate(
          'product'
        )
        break
      default:
        purchaseList = []
    }
    return purchaseList
  },

  /**
   * Add to card
   * @param {string} purchase_ids
   * @returns {Promise<Purchases>}
   */

  buyProduct: async (purchase_ids: string) => {
    await Purchase.updateMany({ _id: { $in: purchase_ids } }, { $set: { status: 1 } }, { returnOriginal: false })
    const purchases = await Purchase.find({ _id: { $in: purchase_ids } }).populate('product')
    return purchases
  }
}
export default purchaseService
