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
import { Server } from 'socket.io'
import http from 'http'
const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST']
  }
})

dotenv.config()
const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`)
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
