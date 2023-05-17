import successResponse from '~/utils/utils'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import omit from 'lodash/omit'
import userService from '~/services/userService'
import { IUser } from '~/types/userType'
import { Request } from 'express'

interface IRequest extends Request {
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
    const { password, new_password } = req.body

    const isPasswordMatch = await req.user?.isPasswordMatch(password)

    if (!isPasswordMatch) {
      throw new Error('Mật khẩu sai')
    }

    if (req.user) {
      req.user.password = new_password
      const updateUser = await userService.updateUserById(user?._id, req.user)
      const responseUser = omit(updateUser.toObject(), 'password')
      res.status(httpStatus.OK).json(successResponse('Cập nhập người dùng thành công', responseUser))
    }
  })
}

export default userController
