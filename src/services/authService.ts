import { IUser } from '../types/userType'
import userService from './userService'
import { ApiError } from '../middlewares/errorHandlers'
import httpStatus from 'http-status'

type TUserBody = Pick<IUser, 'email' | 'password'>

const authService = {
  /**
   * Login with username and password
   * @param {string} email
   * @param {string} password
   * @returns User
   */

  loginWithEmail: async ({ email, password }: TUserBody) => {
    const user = await userService.getUserByEmail(email)
    if (await (await user).isPasswordMatch(password)) {
      return user
    } else {
      throw new ApiError('Password không chính xác', httpStatus.UNPROCESSABLE_ENTITY, 'password')
    }
  }
}

export default authService
