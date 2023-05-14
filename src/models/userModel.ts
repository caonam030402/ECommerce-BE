import mongoose, { Model, ObjectId } from 'mongoose'
import { IUser } from '~/types/userType'
import bcrypt from 'bcrypt'

export interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: String
    },
    address: {
      type: String
    },
    roles: {
      type: [String]
    }
  },
  { timestamps: true }
)

/**
 * Check if email taken
 * @param {string} email
 * @param {ObjectId} excludeUserId
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: ObjectId): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

/**
 * Check Password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

/**
 * Hash Password
 */
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model<IUser, IUserModel>('User', userSchema)
export default User
