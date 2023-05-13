import successResponse from '~/utils/utils'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { keyCookie } from '~/constants/keyCookie'
import omit from 'lodash/omit'
import userService from '~/services/userService'

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const userKeyCookie = keyCookie.user
    const userInCookie = req.cookies[userKeyCookie]
    res.status(httpStatus.OK).json(successResponse('Lấy người dùng thành công', omit(userInCookie.user, 'password')))
  }),

  updateUser: asyncHandler(async (req, res) => {
    const userKeyCookie = keyCookie.user
    const userInCookie = req.cookies[userKeyCookie]
    const user = await userService.updateUserById(userInCookie.user._id, req.body)
    res.cookie(keyCookie.user, { user })
    res.status(httpStatus.OK).json(successResponse('Cập nhập người dùng thành công', user))
  })
}

export default userController
