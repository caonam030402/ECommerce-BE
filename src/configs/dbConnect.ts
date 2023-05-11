import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    const env = process.env.URL_MONGOOSE as string
    await mongoose.connect(env)
    console.log('DB connected!!!')
  } catch (error) {
    console.log('DB not connect!!!')
  }
}

export default dbConnect
