import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import authService from '../services/authService'
import tokenService from '../services/tokenService'
import userService from '../services/userService'
import successResponse from '../utils/utils'
import { keyCookie } from '../constants/keyCookie'
import { omit } from 'lodash'

const authController = {
  register: asyncHandler(async (req, res, next) => {
    const user = req.body

    try {
      const newUser = await userService.createUser(user)
      const refrectToken = `Bearer ${tokenService.generateRefreshToken(newUser._id)}`
      const accessToken = `Bearer ${tokenService.generateToken(newUser._id)}`
      const refrestTokenKeyCookie = keyCookie.refrest_token

      res.cookie(refrestTokenKeyCookie, accessToken)
      res.status(httpStatus.CREATED).json(
        successResponse('Đăng kí thành công', {
          user: omit(newUser.toObject(), 'password'),
          access_token: accessToken,
          refresh_token: refrectToken,
          expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
          expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN
        })
      )
    } catch (error) {
      next(error)
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginWithEmail({ email, password })

    const refrectToken = `Bearer ${tokenService.generateRefreshToken(user._id)}`
    const accessToken = `Bearer ${tokenService.generateToken(user._id)}`
    const refrestTokenKeyCookie = keyCookie.refrest_token

    res.cookie(refrestTokenKeyCookie, accessToken)

    res.status(httpStatus.OK).json(
      successResponse('Đăng nhập thành công', {
        access_token: accessToken,
        expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refresh_token: refrectToken,
        expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN,
        user: omit(user.toObject(), 'password')
      })
    )
  }),

  logout: asyncHandler(async (req, res) => {
    res.clearCookie(keyCookie.refrest_token)

    res.status(httpStatus.OK).json({ message: 'Đăng xuất thành công' })
  }),

  refrestToken: asyncHandler(async (req, res) => {
    const refreshToken = req.body.refresh_token

    const user = await tokenService.verifiToken(refreshToken, 'refresh_token')

    if (!user) throw new Error('Người dùng chưa đăng nhập')

    // const newRefrestToken = `Bearer ${tokenService.generateRefreshToken((await user)._id)}`
    const newAccessToken = `Bearer ${tokenService.generateToken((await user)._id)}`

    res.status(httpStatus.OK).json(successResponse('Refresh thành công token', { access_token: newAccessToken }))
  })
}

export default authController
