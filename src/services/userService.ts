import User from '~/models/userModel'
import { IUser } from '~/types/userType'
import httpStatus from 'http-status'
import { ApiError } from '~/middlewares/errorHandlers'

type TUserBody = Pick<IUser, 'email' | 'password'>

const userService = {
  /**
   * Create a user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */

  createUser: async ({ email, password }: TUserBody) => {
    if (await User.isEmailTaken(email)) {
      throw new ApiError('Email đã được sử dụng', httpStatus.UNPROCESSABLE_ENTITY, 'email')
    }
    return User.create({ email, password })
  },

  /**
   * Get User By Email
   * @param {string} email
   * @returns {Promise<User>}
   */

  getUserByEmail: async (email: string): Promise<IUser> => {
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError('Email không tồn tại', httpStatus.UNPROCESSABLE_ENTITY, 'email')
    }
    return user
  },

  /**
   * Get User By Email
   * @param {string} _id
   * @param {IUser} bodyUpdate
   * @returns {Promise<User>}
   */

  updateUserById: async (_id: string, bodyUpdate: IUser) => {
    const user = await User.findOne({ _id })
    if (!user) {
      throw Error('Người dùng không tồn tại')
    }
    Object.assign(user, bodyUpdate)
    await user.save()
    return user
  }
}

export default userService
