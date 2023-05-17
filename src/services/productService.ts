import { Request } from 'express'
import { SortOrder } from 'mongoose'
import { Product } from '~/models/productModel'
import { IProduct } from '~/types/productType'

interface IQuery {
  rating?: { $gt: number }
  category?: string
  price?: { $gt?: number; $lte?: number }
  $and?: Array<Record<string, any>>
  createdAt?: string
  sold?: number
  view?: number
  sort?: Record<string, number>
  order?: string
  name?: { $regex: RegExp }
}

const productService = {
  /**
   * Add product
   * @param {IProduct} productBody
   * @returns Product
   */
  createProduct: async (productBody: IProduct) => {
    const product = await Product.create(productBody)
    return product
  },
  getProductById: async (_id: string) => {
    const product = await Product.findById(_id)
    return product
  },

  paginateAndQueryProduct: async (req: Request) => {
    const {
      sort_by: sortBy = 'createdAt',
      order,
      page = 1,
      limit = 20,
      rating,
      category,
      price_max: priceMax,
      price_min: priceMin
    } = req.query

    const name = req.query.name as string

    const sortQuery: { [key: string]: string | number | undefined } = {}
    switch (sortBy) {
      case 'view':
      case 'sold':
      case 'price':
        sortQuery[sortBy] = order === 'desc' ? 1 : -1
        break
      default:
        sortQuery['createdAt'] = order === 'desc' ? 1 : -1
    }

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sortQuery
    }

    const query: IQuery = {
      ...(category && { category: category.toString() }),
      ...(rating && { rating: { $gt: Number(rating) } }),
      ...(name && { name: { $regex: new RegExp(name, 'ui') } })
    }

    switch (true) {
      case Boolean(priceMax && priceMin):
        query.$and = [{ price: { $gt: priceMin } }, { price: { $lte: priceMax } }]
        break
      case Boolean(priceMax):
        query.price = { $lte: Number(priceMax) }
        break
      case Boolean(priceMin):
        query.price = { $gt: Number(priceMin) }
        break
      default:
        break
    }

    const paginate = await Product.paginate(query, options)
    return paginate
  }
}

export default productService
