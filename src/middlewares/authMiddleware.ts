import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import User from '~/models/userModel'
import { IUser } from '~/types/userType'
import { ApiError } from './errorHandlers'

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

const verifyToken = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN as string) as { _id: string }
      const user = await User.findById(decoded._id)
      if (user !== null) {
        req.user = user
        next()
      }
    } catch (error) {
      throw new ApiError('Token không được ủy quyền đã hết hạn, vui lòng đăng nhập lại', httpStatus.UNAUTHORIZED, '')
    }
  } else {
    throw new Error('Token không tồn tại')
  }
})

const verifyTokenAndAdminAuth = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) return null
    if (req.user._id === req.params._id || req.user.roles.includes('Admin')) {
      next()
    } else {
      throw new Error('Bạn không phải là Admin')
    }
  })
})

export default { verifyToken, verifyTokenAndAdminAuth }
