import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { ApiError } from 'src/middlewares/errorHandlers'
import { Product } from 'src/models/productModel'
import { Promotion, PromotionTimeSlots } from 'src/models/promotionModel'
import { IPromotion } from 'src/types/promotionType'
import { generalPricePromotion } from 'src/utils/utils'

export const promotionService = {
  /**
   * get promotions with id
   * @param {string} promotionId
   * @returns onPromotion
   */
  getPromotionWithId: async (promotionId: string) => {
    const currentTime = new Date()
    const onPromotion = await Promotion.aggregate([
      {
        $lookup: {
          from: 'promotiontimeslots',
          localField: 'time_slot',
          foreignField: '_id',
          as: 'timeSlot'
        }
      },
      {
        $unwind: '$timeSlot'
      },
      {
        $match: {
          $or: [
            { 'timeSlot.time_start': { $gte: currentTime } },
            {
              $and: [{ 'timeSlot.time_start': { $lte: currentTime } }, { 'timeSlot.time_end': { $gte: currentTime } }]
            }
          ],
          'timeSlot._id': new mongoose.Types.ObjectId(promotionId as string)
        }
      },
      {
        $addFields: {
          price: {
            $cond: {
              if: {
                $and: [{ $gte: [currentTime, '$timeSlot.time_start'] }, { $lte: [currentTime, '$timeSlot.time_end'] }]
              },
              then: '$price',
              else: {
                $function: {
                  body: generalPricePromotion.toString(),
                  args: ['$price'],
                  lang: 'js'
                }
              }
            }
          }
        }
      },

      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          time_slot: 0
        }
      }
    ])
    return onPromotion
  },

  /**
   * get all promotions
   * @returns AllPromotions
   */
  getAllPromotion: async () => {
    const AllPromotions = await Promotion.find().populate('product')
    return AllPromotions
  },

  /**
   * Get timeslots
   * @returns timeSlots
   */
  getAllTimeSlots: async () => {
    const timeSlots = await PromotionTimeSlots.find().sort({ time_end: 1 }).limit(5)
    return timeSlots
  },

  /**
   * Create Promotion
   * @param {IPromotion} promotionBody
   * @returns NewPromotion
   */

  createPromotions: async (promotionArray: Array<IPromotion>) => {
    const newPromotions = []

    for (const promotionBody of promotionArray) {
      const promotion = await Promotion.findOne({
        $and: [{ time_slot: promotionBody.time_slot }, { product: promotionBody.product }]
      })

      if (promotion) {
        throw new ApiError('Sản phẩm trong khung giờ bị trùng', httpStatus.UNPROCESSABLE_ENTITY, '')
      }

      const newPromotion = await Promotion.create(promotionBody)
      newPromotions.push(newPromotion)

      await Product.findByIdAndUpdate(promotionBody.product, { promotion: newPromotion._id }, { new: true })
    }

    return newPromotions
  }
}
