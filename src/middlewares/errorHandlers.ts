import { NextFunction, Response, Request } from 'express'
import httpStatus from 'http-status'

export class ApiError extends Error {
  statusCode: number
  key: string

  constructor(message: string, statusCode: number, key: string) {
    super(message)
    this.statusCode = statusCode
    this.key = key
  }
}

const errorHandlers = {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found : ${req.originalUrl}`)
    res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: `The requested resource '${req.originalUrl}' was not found.`
    })
    next(error)
  },
  errorHandler: async (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    if (statusCode === httpStatus.UNPROCESSABLE_ENTITY) {
      const data: any = {}
      if (err.key) {
        data[err.key] = err.message
      }
      res.status(statusCode).json({
        statusCode,
        message: err?.message || 'Unprocessable Entity',
        data
      })
    } else {
      res.status(statusCode).json({
        statusCode,
        message: err?.message || 'Internal Server Error'
      })
    }
  }
}

export default errorHandlers
