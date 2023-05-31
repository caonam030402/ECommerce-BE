import { Product } from '~/models/productModel'
import { Purchase } from '~/models/purchaseModel'
import User from '~/models/userModel'

const dashboardService = {
  totalProduct: async () => {
    const totalProduct = await Product.aggregate([{ $group: { _id: null, total: { $sum: '$sold' } } }])
    return totalProduct
  },
  totalAmoutSold: async () => {
    const totalAmoutSold = await Purchase.aggregate([
      { $project: { total: { $multiply: [{ $sum: '$buy_count' }, { $sum: '$price' }] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
    return totalAmoutSold
  },
  totalProductSold: async () => {
    const totalProductSold = await Purchase.aggregate([{ $group: { _id: null, total: { $sum: '$buy_count' } } }])
    return totalProductSold
  },

  totalUser: async () => {
    const totalUser = await User.aggregate([{ $group: { _id: null, total: { $sum: 1 } } }])
    return totalUser
  }
}

export default dashboardService
