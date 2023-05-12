import { IUser } from '~/types/userType'
import userService from './userService'

type TUserBody = Pick<IUser, 'email' | 'password'>

const authService = {
  /**
   * Login with username and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */

  loginWithEmail: async ({ email, password }: TUserBody) => {
    const user = await userService.getUserByEmail(email)
    if (await (await user).isPasswordMatch(password)) {
      return user
    } else {
      throw new Error('Password không đúng')
    }
  }
}

export default authService
