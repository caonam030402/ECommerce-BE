import { createAndUpdateTimeSlots } from 'src/configs/createAndUpdateTimeSlots'
import { IPromotion, ITimeSlotPromotion } from '../types/promotionType'
import mongoose from 'mongoose'

const promotionScheme = new mongoose.Schema<IPromotion>(
  {
    price: {
      type: Number
    },
    sold: {
      type: Number
    },
    quanlity: {
      type: Number
    },
    time_slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PromotionTimeSlots'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true }
)

const promotionTimeSlotSchema = new mongoose.Schema<ITimeSlotPromotion>({
  time_start: {
    type: Date
  },
  time_end: {
    type: Date
  }
})

export const Promotion = mongoose.model('Promotion', promotionScheme)
export const PromotionTimeSlots = mongoose.model('PromotionTimeSlots', promotionTimeSlotSchema)
