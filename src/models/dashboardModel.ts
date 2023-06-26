import mongoose, { Model } from 'mongoose'
import { IProduct } from '../types/productType'

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
