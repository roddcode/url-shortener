import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`)
  }
}

const closeDB = async () => {
  await mongoose.disconnect()
  console.log('MongoDB disconnected')
}

process.on('SIGINT', closeDB)
process.on('SIGTERM', closeDB)

export const db = mongoose.connection
export default connectDB
