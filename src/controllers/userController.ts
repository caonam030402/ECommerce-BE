import successResponse from '../utils/utils'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import omit from 'lodash/omit'
import userService from '../services/userService'
import { IUser } from '../types/userType'
import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { ApiError } from '../middlewares/errorHandlers'

export interface IRequest extends Request {
  user?: IUser
}

const userController = {
  getUser: asyncHandler(async (req: IRequest, res) => {
    const user = omit(req.user, 'password')
    const responseUser = omit(user.toObject(), 'password')
    res.status(httpStatus.OK).json(successResponse('Lấy người dùng thành công', responseUser))
  }),

  updateUser: asyncHandler(async (req: IRequest, res) => {
    const user = omit(req.user, 'password')
    const { password, new_password, ...body } = req.body
    let updateUser
    if (password && new_password) {
      const isPasswordMatch = await req.user?.isPasswordMatch(req.body.password)
      if (!isPasswordMatch) {
        res.status(httpStatus.BAD_REQUEST).json({
          data: {
            message: 'Password không khớp'
          }
        })
      }
      req.user?.password === new_password
      if (req.user) {
        updateUser = await userService.updateUserById(user?._id, req.user)
      }
    } else {
      updateUser = await userService.updateUserById(user?._id, body)
    }

    const responseUser = omit(updateUser?.toObject(), 'password')
    res.status(httpStatus.OK).json(successResponse('Cập nhập người dùng thành công', responseUser))
  }),

  uploadAvatar: asyncHandler(async (req, res) => {
    const file = Array.isArray(req.files) ? req.files[0] : req.files
    if (!file) {
      throw new ApiError('Tệp tin không tồn tại', httpStatus.UNPROCESSABLE_ENTITY, 'data')
    }
    res.status(httpStatus.OK).json(successResponse('Upload ảnh đại diện thành công', file.filename))
  }),

  getAvatar: asyncHandler(async (req, res) => {
    const filename = req.params.filename
    const uploadsPath = path.join(__dirname, '..', 'uploads')
    const imagePath = path.join(uploadsPath, filename)
    if (!fs.existsSync(imagePath)) {
      throw new ApiError('Tệp tin không tồn tại', httpStatus.NOT_FOUND, 'data')
    }
    res.sendFile(imagePath)
  }),

  getAddress: asyncHandler(async (req, res) => {
    const address = await userService.getAllAddress()
    res.status(httpStatus.OK).json(successResponse('Lấy địa chỉ thành công', address))
  })
}

export default userController
