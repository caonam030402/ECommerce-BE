import jwt from 'jsonwebtoken'
import { ObjectId, Types } from 'mongoose'
import User from '~/models/userModel'

/**
 * @param {ObjectId} _id
 * @returns {Promise<token>}
 */

const tokenService = {
  generateToken: (_id: Types.ObjectId) => {
    return jwt.sign({ _id }, process.env.JSON_WEB_TOKEN as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
  },
  generateRefreshToken: (_id: Types.ObjectId) => {
    return jwt.sign({ _id }, process.env.JSON_WEB_TOKEN as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN })
  },
  verifiToken: async (token: string) => {
    token = token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN as string)
    const user = await User.findById((decoded as jwt.JwtPayload)._id)
    if (!user) {
      throw new Error('Token not found')
    }
    return user
  }
}

export default tokenService
