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

    const refrectToken = `Bearer ${tokenService.generateRefreshToken(user._id)}`
    const accessToken = `Bearer ${tokenService.generateToken(user._id)}`
    const refrestTokenKeyCookie = keyCookie.refrest_token

    res.cookie(refrestTokenKeyCookie, refrectToken)

    res.status(httpStatus.OK).json(
      successResponse('Đăng nhập thành công', {
        access_token: accessToken,
        expires: process.env.ACCESS_TOKEN_EXPIRES_IN,
        user: user
      })
    )
  }),

  logout: asyncHandler(async (req, res) => {
    const cookies = [keyCookie.user, keyCookie.refrest_token]

    cookies.forEach((cookie) => {
      res.clearCookie(cookie)
    })

    res.status(httpStatus.OK).json({ message: 'Đăng xuất thành công' })
  }),

  refrestToken: asyncHandler(async (req, res) => {
    const refrestToken = req.cookies[keyCookie.refrest_token]
    if (!refrestToken) throw new Error('Người dùng chưa đăng nhập')

    const user = tokenService.verifiToken(refrestToken)
    const newRefrestToken = `Bearer ${tokenService.generateRefreshToken((await user)._id)}`
    const newAccessToken = `Bearer ${tokenService.generateToken((await user)._id)}`

    res.cookie(keyCookie.refrest_token, newRefrestToken)
    res.status(httpStatus.OK).json(successResponse('Refrest thành công token', newAccessToken))
  })
}

export default authController
