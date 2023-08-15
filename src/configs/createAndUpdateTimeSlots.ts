import moment, { MomentInput } from 'moment'
import { PromotionTimeSlots } from 'src/models/promotionModel'
import cron from 'node-cron'

export const createAndUpdateTimeSlots = async () => {
  const bulkOperations = []

  // Xóa khung giờ trong quá khứ
  const deletePastTimeSlots = {
    deleteMany: {
      filter: {
        time_end: { $lt: new Date(String(moment().startOf('hour'))) }
      }
    }
  }
  bulkOperations.push(deletePastTimeSlots)

  await PromotionTimeSlots.bulkWrite(bulkOperations as any)

  // Tạo 5 khung giờ
  const findTimeSlots = await PromotionTimeSlots.find({}, 'time_end')
  const limit = 6
  const currentLength = findTimeSlots.length
  const startAndEndTimeGap = 3
  let currentTime =
    currentLength === 0
      ? moment().startOf('hour')
      : moment(findTimeSlots[currentLength - 1].time_end as MomentInput).startOf('hour')
  const numSlotsToAdd = currentLength < limit ? (currentLength === 0 ? limit : limit - currentLength) : 0

  for (let i = 0; i < numSlotsToAdd; i++) {
    const timeStart = currentTime
    const timeEnd = moment(currentTime).add(startAndEndTimeGap, 'hours')

    bulkOperations.push({
      insertOne: {
        document: {
          time_start: timeStart.format(),
          time_end: timeEnd.format()
        }
      }
    })

    currentTime = moment(currentTime).add(startAndEndTimeGap, 'hour')
  }

  await PromotionTimeSlots.bulkWrite(bulkOperations as any)
}

cron.schedule('*/5 * * * *', createAndUpdateTimeSlots)
