import dotenv from 'dotenv'
dotenv.config()
import asyncHandler from 'express-async-handler'
import moment from 'moment'
import querystring from 'qs'
import crypto from 'crypto'
import { Socket } from 'net'
import { vnpPaymentService } from '../services/vnpPaymentService'
import httpStatus from 'http-status'
import successResponse from '../utils/utils'

interface VnpParams {
  [key: string]: string | number
}

const vnp_TmnCode = process.env.vnp_TmnCode as string
const vnp_HashSecret = process.env.VNP_HASHSECRET as string
const vnp_Url = process.env.vnp_Url as string
const vnp_ReturnUrl = process.env.vnp_ReturnUrl as string

export const vnpPaymentController = {
  createPaymentUrl: asyncHandler(async (req, res, next) => {
    console.log(process.env.VNP_HASHSECRET)
    const date = new Date()
    const createDate = moment(date).format('YYYYMMDDHHmmss')

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.socket as Socket).remoteAddress

    const tmnCode = vnp_TmnCode
    const secretKey = vnp_HashSecret
    let vnpUrl = vnp_Url
    const returnUrl = vnp_ReturnUrl
    const orderId = moment(date).format('DDHHmmss')
    const amount = req.body.amount
    const bankCode = req.body.bankCode

    let locale = req.body.language
    if (locale === null || locale === '') {
      locale = 'vn'
    }
    const currCode = 'VND'
    let vnp_Params: VnpParams = {}

    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    if (tmnCode && returnUrl) {
      vnp_Params['vnp_TmnCode'] = tmnCode
      vnp_Params['vnp_ReturnUrl'] = returnUrl
    }
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_IpAddr'] = String(ipAddr)
    vnp_Params['vnp_CreateDate'] = createDate
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = vnpPaymentService.sortObject(vnp_Params)

    const signData = querystring.stringify(vnp_Params, { encode: false })

    if (!secretKey) {
      throw new Error('Secret key is undefined')
    }

    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

    vnpUrl && res.status(httpStatus.OK).json(successResponse('Lấy URL thành công', vnpUrl))
  }),

  vnpReturn: asyncHandler(async (req, res) => {
    let vnp_Params = req.query as VnpParams

    const secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = vnpPaymentService.sortObject(vnp_Params as VnpParams)

    const tmnCode = vnp_TmnCode
    const secretKey = vnp_HashSecret

    const signData = querystring.stringify(vnp_Params, { encode: false })

    const hmac = crypto.createHmac('sha512', secretKey)
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

    if (secureHash === signed) {
      res.json(successResponse('Thanh toán thành công', vnp_Params['vnp_ResponseCode']))
    } else {
      res.json(successResponse('Thanh toán thành công', '88'))
    }
  })
}
