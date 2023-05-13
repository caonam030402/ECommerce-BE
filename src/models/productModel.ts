import mongoose from 'mongoose'
import { IProduct } from '~/types/productType'

const productScheme = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String
    },
    image: {
      type: String
    },
    images: {
      type: [String]
    },
    category: {},
    description: {
      type: String
    },
    rating: {
      type: Number
    },
    sold: {
      type: Number
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    price_before_discount: {
      type: Number
    },
    view: {
      type: Number
    }
  },
  { timestamps: true }
)

const categoryProductScheme = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String
    },
    image: {
      type: String
    },
    images: {
      type: [String]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    description: {
      type: String
    },
    rating: {
      type: Number
    },
    sold: {
      type: Number
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number
    },
    price_before_discount: {
      type: Number
    },
    view: {
      type: Number
    }
  },
  { timestamps: true }
)

export const Product = mongoose.model('Product', productScheme)
export const CategoryProduct = mongoose.model('Category', categoryProductScheme)
