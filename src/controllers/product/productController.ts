import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import { Product } from '~/models/productModel'
import productService from '~/services/productService'
import successResponse from '~/utils/utils'

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
}

interface ISort {
  view?: string
  sold?: string
  price?: string
  desc?: string
}

const productController = {
  addProduct: asyncHandler(async (req, res) => {
    try {
      const product = await productService.createProduct(req.body)
      res.status(httpStatus.CREATED).json(successResponse('Thêm sản phẩm thành công', product))
    } catch (error) {
      throw new Error('Thêm thất bại')
    }
  }),
  getProductDetail: asyncHandler(async (req, res) => {
    const productDetail = await productService.getProductById(req.params.id)
    res.status(httpStatus.CREATED).json(successResponse('Lấy sản phẩm thành công', productDetail))
  }),

  getProducts: asyncHandler(async (req, res) => {
    const products = await productService.sortProduct(req)
    const paginate = await productService.paginateAndQueryProduct(req)
    res.status(httpStatus.OK).json(
      successResponse('Lấy sản phẩm thành công thành công', {
        products,
        pagination: { page: paginate.page, page_size: paginate.totalPages, limit: paginate.limit }
      })
    )
  })
}
export default productController
