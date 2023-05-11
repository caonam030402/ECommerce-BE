import { NextFunction, Response, Request } from 'express'
import httpStatus from 'http-status'

const errorHandlers = {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found : ${req.originalUrl}`)
    res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      message: `The requested resource '${req.originalUrl}' was not found.`
    })
    next(error)
  },
  errorHandler: async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === httpStatus.OK ? httpStatus.INTERNAL_SERVER_ERROR : res.statusCode
    res.status(statusCode).json({
      statusCode: statusCode,
      message: err?.message || 'Internal Server Error',
      data: err?.stack
    })
  }
}

export default errorHandlers
