import { ObjectId } from 'mongoose'
import { Product } from '~/models/productModel'
import { Purchase } from '~/models/purchaseModel'
import { IProduct } from '~/types/productType'
import { IPurchase } from '~/types/purchaseType'
import { IUser } from '~/types/userType'

export interface IRequest extends Request {
  user?: IUser
}

const purchaseService = {
  addToCart: async ({ product_id, buy_count }: { product_id: string; buy_count: number }, user: IUser) => {
    const product = (await Product.findById(product_id)) as IProduct
    const purchase = await Purchase.create({ buy_count, product, user })
    return {
      _id: purchase._id,
      buy_count: purchase.buy_count,
      price: product.price,
      price_before_discount: product.price_before_discount,
      status: -1,
      user: user?._id,
      product
    }
  }
}
export default purchaseService
