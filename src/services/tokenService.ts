import jwt from 'jsonwebtoken'
import { ObjectId, Types } from 'mongoose'

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
  }
}

export default tokenService
