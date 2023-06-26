import { Request } from 'express'
import multer, { Multer } from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (
    req: Request<any, any, any>,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, './src/uploads')
  },
  filename: function (
    req: Request<any, any, any>,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) || path.extname(file.mimetype)
    const filename = file.fieldname + '-' + uniqueSuffix + ext
    cb(null, filename)
  }
})

export const upload: Multer = multer({ storage: storage })
