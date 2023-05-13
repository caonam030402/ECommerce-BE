import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'

import productService from '~/services/productService'
import successResponse from '~/utils/utils'

const productController = {
  addProduct: asyncHandler(async (req, res) => {
    try {
      const product = await productService.createProduct(req.body)
      res.status(httpStatus.CREATED).json(successResponse('Thêm sản phẩm thành công', product))
    } catch (error) {
      throw new Error('Thêm thất bại')
    }
  })
}
export default productController
