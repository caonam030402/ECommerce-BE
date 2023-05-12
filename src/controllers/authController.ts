import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import authService from '~/services/authService'
import tokenService from '~/services/tokenService'
import userService from '~/services/userService'
import successResponse from '~/utils/utils'
import { keyCookie } from '~/constants/keyCookie'

const authController = {
  register: asyncHandler(async (req, res, next) => {
    const user = req.body
    try {
      const newUser = await userService.createUser(user)
      res.status(httpStatus.CREATED).json(
        successResponse('Đăng kí thành công', {
          access_token: `Bearer ${tokenService.generateToken(newUser._id)}`,
          refresh_token: `Bearer ${tokenService.generateRefreshToken(newUser._id)}`,
          expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
          user: newUser
        })
      )
    } catch (error) {
      next(error)
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginWithEmail({ email, password })

    if (user) {
      res.cookie(keyCookie.user, { user })
    }

    res.status(httpStatus.OK).json(
      successResponse('Đăng nhập thành công', {
        access_token: `Bearer ${tokenService.generateToken(user._id)}`,
        refresh_token: `Bearer ${tokenService.generateRefreshToken(user._id)}`,
        expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
        user: user
      })
    )
  })
}

export default authController
