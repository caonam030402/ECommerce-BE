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
      { $match: { status: 4 } },
      { $project: { total: { $multiply: [{ $sum: '$buy_count' }, { $sum: '$price' }] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
    return totalAmoutSold
  },
  totalProductSold: async () => {
    const totalProductSold = await Purchase.aggregate([
      { $match: { status: 4 } },
      { $group: { _id: null, total: { $sum: '$buy_count' } } }
    ])

    return totalProductSold
  },

  totalUser: async () => {
    const totalUser = await User.aggregate([{ $group: { _id: null, total: { $sum: 1 } } }])
    return totalUser
  },
  quantitySoldOverTime: async () => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const purchase = await Purchase.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: currentDate,
            $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      },
      { $match: { status: 4 } },
      {
        $group: {
          _id: null,
          total: { $sum: '$buy_count' }
        }
      },
      {
        $addFields: {
          currentDateTime: new Date()
        }
      }
    ])

    return purchase[0]
  }
}

export default dashboardService
