import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import path from 'path'
import { ApiError } from '~/middlewares/errorHandlers'
import productService from '~/services/productService'
import successResponse from '~/utils/utils'
import fs from 'fs'
import { Product } from '~/models/productModel'

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
      const productBody = req.body
      const imageUrls = (req.files as Array<Express.Multer.File>).map((file: Express.Multer.File) => {
        const fileUrl = req.protocol + '://' + req.get('host') + '/v1/images/' + file.filename
        return fileUrl
      })

      const product = await productService.createProduct(productBody, imageUrls)
      res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: product })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Thêm thất bại' })
    }
  }),

  deleteProducts: asyncHandler(async (req, res) => {
    await productService.deleteProductById(req.params.id)
    res.status(201).json({ success: true, message: 'Xóa sản phẩm thành công' })
  }),

  getProductDetail: asyncHandler(async (req, res) => {
    const productDetail = await productService.getProductById(req.params.id)
    res.status(httpStatus.CREATED).json(successResponse('Lấy sản phẩm thành công', productDetail))
  }),

  getProducts: asyncHandler(async (req, res) => {
    const paginate = await productService.paginateAndQueryProduct(req)
    res.status(httpStatus.OK).json(
      successResponse('Lấy sản phẩm thành công thành công', {
        products: paginate.docs,
        pagination: { page: paginate.page, page_size: paginate.totalPages, limit: paginate.limit }
      })
    )
  }),
  getAProduct: asyncHandler(async (req, res) => {
    const findProduct = await productService.getProductById(req.params.id)
    if (!findProduct) throw new ApiError('Không tìm thấy sản phẩm', httpStatus.UNPROCESSABLE_ENTITY, 'message')
  })
}
export default productController
