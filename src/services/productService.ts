import { Request } from 'express'
import { Product } from '../models/productModel'
import { IProduct } from '../types/productType'

interface IQuery {
  rating?: { $gte: number }
  price?: { $gt?: number; $lte?: number }
  category?: string
  createdAt?: string
  sold?: number
  view?: number
  order?: string
  sort?: Record<string, number>
  $and?: Array<Record<string, any>>
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

  /**
   * Update product
   * @param {IProduct} productBody
   * @param {string[]} Image
   * @returns <Product>
   */
  updateProduct: async (productBody: IProduct, Image: string[]) => {
    productBody.images = Image
    const objetProductBody = {
      ...productBody,
      image: Image[0],
      rating: 0,
      view: 0,
      sold: 0
    }
    const product = await Product.create(objetProductBody)
    return product
  },

  /**
   * Get product with Id
   * @param {string} _id
   * @returns <Product>
   */
  getProductById: async (_id: string) => {
    const product = await Product.findById(_id).populate([
      'category',
      {
        path: 'promotion',
        populate: {
          path: 'time_slot'
        }
      }
    ])
    return product
  },

  /**
   * Delete product by Id
   * @param {string} _id
   * @returns <product>
   */
  deleteProductById: async (_id: string) => {
    const product = await Product.findByIdAndDelete(_id)
    return product
  },

  /**
   * Paginate and query Product
   * @param {Request} req
   * @returns <paginate>
   */
  paginateAndQueryProduct: async (req: Request) => {
    const {
      sort_by: sortBy = 'createdAt',
      order,
      page = 1,
      limit = 20,
      rating_filter,
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
      populate: 'category',
      page: Number(page),
      limit: Number(limit),
      sort: sortQuery
    }

    const query: IQuery = {
      ...(category && { category: category.toString() }),
      ...(rating_filter && { rating: { $gte: Number(rating_filter) } }),
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
  },

  /**
   * Update A Product
   * @param {string} _id
   * @returns <product>
   */
  updateAProduct: async (_id: string, bodyUpdate: IProduct) => {
    const product = await Product.findOne({ _id })
    if (!product) {
      throw Error('Người dùng không tồn tại')
    }
    Object.assign(product, bodyUpdate)
    await product.save()
    return product
  }
}

export default productService
