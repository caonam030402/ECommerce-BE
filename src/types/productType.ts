import { Document, ObjectId } from 'mongoose'
import { IPromotion } from './promotionType'

export interface IProduct extends Document {
  _id: ObjectId
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: ICategotyProduct
  image: string
  createdAt: string
  updatedAt: string
  promotion: IPromotion
}

export interface ICategotyProduct {
  _id: ObjectId
  name: string
}
