import successResponse from '~/utils/utils'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { keyCookie } from '~/constants/keyCookie'
import { IUser } from '~/types/userType'
import omit from 'lodash/omit'
import User from '~/models/userModel'

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const userKeyCookie = keyCookie.user
    const user: IUser = req.cookies[userKeyCookie]
    const userDocument = await User.findOne(user._id)
    if (userDocument) {
      res
        .status(httpStatus.OK)
        .json(successResponse('Lấy người dùng thành công', omit(userDocument.toObject(), ['password'])))
    }
  })
}

export default userController
