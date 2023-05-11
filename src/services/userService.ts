import User from '~/models/userModel'
import { IUser } from '~/types/userType'

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
      throw new Error('email is taken')
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
      throw new Error('Không tìm thấy tài khoản')
    }
    return user
  }
}

export default userService
