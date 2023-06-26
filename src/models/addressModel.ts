import mongoose from 'mongoose'
import { Address as AddressType } from '../types/addressType'

const addressSchema = new mongoose.Schema<AddressType>({
  Id: {
    type: String
  },
  Name: {
    type: String
  },
  Districts: [
    {
      Id: {
        type: String
      },
      Name: {
        type: String
      },
      ward: [
        {
          Id: {
            Type: String
          },
          Name: {
            type: String
          }
        }
      ]
    }
  ]
})

export const Address = mongoose.model('address', addressSchema)
