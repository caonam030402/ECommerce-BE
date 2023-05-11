import express from 'express'
const app = express()
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import dbConnect from './configs/dbConnect'
import errorHandlers from './middlewares/errorHandlers'
dotenv.config()
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})

dbConnect()

// Config
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())
app.use(morgan('common'))

// Error Response
app.use(errorHandlers.errorHandler)
app.use(errorHandlers.notFound)
