import successResponse from '~/utils/utils'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { keyCookie } from '~/constants/keyCookie'
import { IUser } from '~/types/userType'
import omit from 'lodash/omit'
import User from '~/models/userModel'
import userService from '~/services/userService'

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const userKeyCookie = keyCookie.user
    const user: IUser = req.cookies[userKeyCookie]
    res.status(httpStatus.OK).json(successResponse('Lấy người dùng thành công', user))
  }),

  updateUser: asyncHandler(async (req, res) => {
    const userKeyCookie = keyCookie.user
    const user = req.cookies[userKeyCookie]
    const userDocument = await userService.updateUserById(user.user._id, req.body)
    res.cookie(keyCookie.user, { userDocument })
    res.status(httpStatus.OK).json(successResponse('Cập nhập người dùng thành công', userDocument))
  })
}

export default userController
