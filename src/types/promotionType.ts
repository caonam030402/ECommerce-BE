import { Date, ObjectId } from 'mongoose'
import { IProduct } from './productType'

export interface IPromotion {
  _id: ObjectId
  price: number
  sold: number
  quanlity: number
  product: IProduct
  time_slot: ITimeSlotPromotion
}

export interface ITimeSlotPromotion {
  _id: ObjectId
  time_end: Date
  time_start: Date
}
