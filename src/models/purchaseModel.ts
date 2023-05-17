import mongoose from 'mongoose'
import { IPurchase } from '~/types/purchaseType'

const purchaseSchema = new mongoose.Schema<IPurchase>(
  {
    buy_count: {
      type: Number
    },
    price: {
      type: Number
    },
    price_before_discount: {
      type: Number
    },
    status: {
      type: Number,
      enum: [0, -1, 1, 2, 3, 4, 5]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true }
)

export const Purchase = mongoose.model('Purchase', purchaseSchema)
