import { model, Schema } from 'mongoose';

const apartmentSchema = new Schema(
  {
    apartmentNumber: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    squareMeters: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',               
      required: false,
      default: null
    },
    status: {
      type: String,
      required: true,
      enum: ['free', 'occupied'],
    },
  },
  { timestamps: true }
);

export const ApartmentCollection = model('Apartment', apartmentSchema);