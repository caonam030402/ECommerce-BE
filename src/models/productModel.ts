import mongoose, { Model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { IProduct } from '../types/productType'

interface IPaginate extends Model<IProduct> {
  name: string
  location: string
}

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
    },
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Promotion'
    }
  },
  { timestamps: true }
)

productScheme.plugin(paginate)

const categoryProductScheme = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String
    }
  },
  { timestamps: true }
)

export const Product = mongoose.model<IPaginate, mongoose.PaginateModel<IPaginate>>('Product', productScheme)
export const CategoryProduct = mongoose.model('Category', categoryProductScheme)
