import mongoose, { Model } from 'mongoose'
import { IProduct } from '~/types/productType'

interface IPaginate extends Model<IProduct> {
  name: string
  location: string
}

const dashboardScheme = new mongoose.Schema(
  {
    sellingTarget: {
      type: Number,
      default: 300
    }
  },
  { timestamps: true }
)

export const Product = mongoose.model('Product', dashboardScheme)
