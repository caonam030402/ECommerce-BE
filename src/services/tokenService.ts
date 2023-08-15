import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import User from '../models/userModel'

/**
 * @param {ObjectId} _id
 * @returns token
 */

const tokenService = {
  generateToken: (_id: Types.ObjectId) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    })
  },
  generateRefreshToken: (_id: Types.ObjectId) => {
    return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    })
  },
  verifiToken: async (token: string, type: 'access_token' | 'refresh_token') => {
    token = token.split(' ')[1]
    let decoded
    if (type === 'access_token') {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
    } else if (type === 'refresh_token') {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
    }

    const user = await User.findById((decoded as jwt.JwtPayload)._id)
    if (!user) {
      throw new Error('Token not found')
    }
    return user
  }
}

export default tokenService
