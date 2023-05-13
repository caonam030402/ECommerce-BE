import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { CategoryProduct } from '~/models/productModel'
import successResponse from '~/utils/utils'

const categoryController = {
  addCategory: asyncHandler(async (req, res) => {
    const category = await CategoryProduct.create(req.body)
    res.status(httpStatus.CREATED).json(successResponse('Thêm categories thành công', category))
  }),
  getCaregory: asyncHandler(async (req, res) => {
    const categories = await CategoryProduct.find()
    res.status(httpStatus.OK).json(successResponse('Lấy categories thành công', categories))
  })
}

export default categoryController
