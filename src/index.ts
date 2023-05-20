import express, { Request } from 'express'
const app = express()
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import routers from 'src/routes'
import dbConnect from './configs/dbConnect'
import errorHandlers from './middlewares/errorHandlers'
import cookieParser from 'cookie-parser'

dotenv.config()
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})

dbConnect()

// Config
app.use(bodyParser.json({ limit: '50mb' }))
app.use('/v1/images', express.static('uploads'))
app.use(cors())
app.use(morgan('common'))
app.use(cookieParser())

// Route
app.use('/v1', routers)

// Error Response
app.use(errorHandlers.errorHandler)
app.use(errorHandlers.notFound)
