import mongoose from 'mongoose'
import { IProduct } from './productType'

export type TPurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export interface IPurchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: TPurchaseStatus
  user: mongoose.Schema.Types.ObjectId
  product: mongoose.Schema.Types.ObjectId | IProduct
  createdAt: string
  updatedAt: string
}
