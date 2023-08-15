import moment from 'moment'
import mongoose from 'mongoose'
import { createAndUpdateTimeSlots } from './createAndUpdateTimeSlots'

const dbConnect = async () => {
  try {
    const env = process.env.URL_MONGOOSE as string
    await mongoose.connect(env)
    console.log('DB connected!!!')
    createAndUpdateTimeSlots()
  } catch (error) {
    console.log('DB not connect!!!')
  }
}

export default dbConnect
