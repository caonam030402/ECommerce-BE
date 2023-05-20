import { Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  roles: string[]
  name?: string
  phone?: string
  date_of_birth?: string
  address?: string
  new_password?: string
  avatar?: string
  isPasswordMatch(password: string): Promise<boolean>
}
